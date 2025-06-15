const GEMINI_API_KEY = 'AIzaSyCHKp7O2KzlRUqFkqB8DobMdksXybdov2A';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// Enhanced error handling and retry logic
export const callGeminiAPI = async (prompt: string, retries: number = 3): Promise<string> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Gemini API call attempt ${attempt}`);
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        console.log('Gemini API call successful');
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('No response from Gemini API');
      }
    } catch (error) {
      console.error(`Gemini API attempt ${attempt} failed:`, error);
      
      if (attempt === retries) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  
  throw new Error('All Gemini API attempts failed');
};

// Enhanced Resume Screening with comprehensive analysis
export const analyzeResume = async (resumeText: string, jobRequirements: string): Promise<string> => {
  const prompt = `
    You are an expert HR professional and ATS system. Analyze the provided resume against the job requirements and provide a comprehensive screening report.

    **Job Requirements:**
    ${jobRequirements}

    **Resume Content:**
    ${resumeText}

    **Analysis Framework:**
    1. **Match Score (0-100):** Overall compatibility percentage
    2. **Key Qualifications Match:**
       - Required skills found: [List with evidence]
       - Missing critical skills: [List gaps]
       - Experience level alignment: [Junior/Mid/Senior match]

    3. **Strengths Analysis:**
       - Top 3 strongest qualifications
       - Standout achievements or experiences
       - Unique value propositions

    4. **Red Flags & Concerns:**
       - Employment gaps (if significant)
       - Skill mismatches
       - Over/under qualification issues

    5. **Interview Recommendation:**
       - RECOMMEND/MAYBE/REJECT with reasoning
       - Specific areas to explore in interview
       - Questions to ask based on resume gaps

    6. **ATS Optimization Score:**
       - Keyword density analysis
       - Format compatibility rating
       - Suggestions for improvement

    **Output Format:** Provide a structured analysis with all sections clearly defined and actionable insights.
  `;

  return callGeminiAPI(prompt);
};

// Bulk resume ranking
export const rankResumes = async (resumes: string[], jobDescription: string, jobTitle: string): Promise<string> => {
  const prompt = `
    You are an AI recruitment assistant. Rank these ${resumes.length} resumes for the position of ${jobTitle}.

    **Job Description:**
    ${jobDescription}

    **Resumes to Rank:**
    ${resumes.map((resume, index) => `Resume ${index + 1}:\n${resume}`).join('\n\n---\n\n')}

    **Ranking Criteria (in order of importance):**
    1. Required skills match (40%)
    2. Experience relevance (30%)
    3. Education/Certifications (15%)
    4. Cultural fit indicators (10%)
    5. Career progression (5%)

    **Output:**
    For each resume, provide:
    - Rank (1-${resumes.length})
    - Score (0-100)
    - Top 2 strengths
    - Main concern/weakness
    - One-line recommendation

    **Format:** Ranked list with detailed reasoning for top 5 candidates.
  `;

  return callGeminiAPI(prompt);
};

// Enhanced Interview Question Generation
export const generateBehavioralQuestions = async (
  jobTitle: string, 
  industry: string, 
  experienceLevel: string,
  companySize: string,
  companyCulture: string
): Promise<string> => {
  const prompt = `
    Generate comprehensive behavioral interview questions for a ${jobTitle} position.

    **Company Context:**
    - Industry: ${industry}
    - Company size: ${companySize}
    - Company culture: ${companyCulture}

    **Candidate Profile:**
    - Experience level: ${experienceLevel}
    - Department: ${jobTitle}

    **Question Categories (Generate 3-5 questions each):**

    1. **Leadership & Management** (if applicable)
       - Focus: Team management, conflict resolution, decision-making
       - Format: "Tell me about a time when..."

    2. **Problem-Solving & Analytics**
       - Focus: Complex challenges, creative solutions, data-driven decisions
       - Include situational scenarios specific to ${industry}

    3. **Communication & Collaboration**
       - Focus: Cross-functional work, difficult conversations, presentation skills
       - Tailor to ${companyCulture}

    4. **Adaptability & Change Management**
       - Focus: Learning new skills, handling change, flexibility
       - Include recent industry changes or tech adoption

    5. **Results & Achievement Orientation**
       - Focus: Goal achievement, metrics, impact measurement
       - Specific to ${jobTitle} success metrics

    6. **Cultural Fit Questions**
       - Work style preferences
       - Career motivation alignment

    **For Each Question, Include:**
    - The question itself
    - What you're assessing
    - Good answer indicators
    - Red flag responses
    - Follow-up questions

    **Additional Requirements:**
    - Ensure questions are legally compliant
    - Include diversity and inclusion considerations
    - Provide difficulty levels (Junior/Mid/Senior)
  `;

  return callGeminiAPI(prompt);
};

export const generateTechnicalQuestions = async (
  technicalRole: string,
  technicalSkills: string[],
  experienceLevel: string,
  companyTechStack?: string
): Promise<string> => {
  const prompt = `
    Create technical interview questions for a ${technicalRole} position.

    **Technical Requirements:**
    ${technicalSkills.join(', ')}

    **Experience Level:** ${experienceLevel}

    **Question Types Needed:**

    1. **Core Technical Concepts (30% of interview)**
       - Fundamental knowledge in primary technologies
       - Best practices and standards
       - Architecture and design principles

    2. **Practical Problem-Solving (40% of interview)**
       - Coding challenges (if applicable)
       - System design questions
       - Debugging scenarios
       - Real-world problem simulations

    3. **Experience-Based Questions (20% of interview)**
       - Past project discussions
       - Technology choices and trade-offs
       - Challenges overcome
       - Learning experiences

    4. **Scenario-Based Questions (10% of interview)**
       - Hypothetical workplace situations
       - Priority management
       - Team collaboration in technical context

    **For Each Question:**
    - Difficulty level (1-5 scale)
    - Expected answer components
    - Evaluation criteria
    - Time allocation
    - Follow-up possibilities

    **Special Requirements:**
    ${companyTechStack ? `- Include questions about ${companyTechStack}` : ''}
    - Consider remote work scenarios (if applicable)
    - Add questions about mentoring (for senior roles)
  `;

  return callGeminiAPI(prompt);
};

// Enhanced Job Description Optimization
export const optimizeJobDescriptionAdvanced = async (
  jobDescription: string,
  jobTitle: string,
  industry: string,
  companySize: string,
  location: string,
  targetLevel: string
): Promise<string> => {
  const prompt = `
    You are an expert HR copywriter and recruitment specialist. Optimize this job description to attract top talent and improve application rates.

    **Current Job Description:**
    ${jobDescription}

    **Optimization Requirements:**

    1. **SEO & Discoverability:**
       - Identify and integrate high-search keywords for ${jobTitle}
       - Optimize for job board algorithms
       - Include location-based keywords for ${location}

    2. **Compelling Content Structure:**
       - Write an engaging opening hook
       - Clearly articulate the value proposition
       - Highlight growth opportunities and impact

    3. **Inclusive Language Audit:**
       - Remove biased or exclusionary language
       - Use gender-neutral terms
       - Ensure accessibility compliance
       - Check for age, background, or education bias

    4. **Requirements Optimization:**
       - Distinguish between "must-have" vs "nice-to-have"
       - Remove unnecessary barriers
       - Focus on outcomes rather than years of experience
       - Add skill-based alternatives to degree requirements

    5. **Attraction Factors:**
       - Highlight unique company benefits
       - Mention career development opportunities
       - Include company culture indicators
       - Add diversity and inclusion commitments

    6. **Call-to-Action Enhancement:**
       - Create compelling application instructions
       - Remove application friction
       - Include what happens next in the process

    **Company Context:**
    - Industry: ${industry}
    - Company size: ${companySize}
    - Location: ${location}
    - Target candidate experience level: ${targetLevel}

    **Output Format:**
    - Optimized job description
    - Before/after comparison highlights
    - Keyword integration report
    - Bias removal summary
    - Expected improvement metrics
  `;

  return callGeminiAPI(prompt);
};

export const predictJobPostingPerformance = async (jobPosting: string): Promise<string> => {
  const prompt = `
    Analyze this job posting and predict its performance across different job boards.

    **Job Posting:**
    ${jobPosting}

    **Analysis Framework:**

    1. **Attractiveness Score (0-100):**
       - Title effectiveness
       - Description engagement level
       - Benefits/compensation clarity
       - Application ease

    2. **SEO Performance Prediction:**
       - Keyword density analysis
       - Search visibility forecast
       - Recommended keyword additions
       - Title optimization suggestions

    3. **Diversity & Inclusion Score:**
       - Language inclusivity rating
       - Barrier identification
       - Accessibility compliance
       - Suggestions for improvement

    4. **Platform-Specific Optimization:**
       - LinkedIn optimization score
       - Indeed compatibility rating
       - Glassdoor optimization tips
       - Industry-specific job board recommendations

    5. **Predicted Metrics:**
       - Expected application volume
       - Quality candidate ratio
       - Time-to-fill estimate
       - Cost-per-hire projection

    6. **Improvement Recommendations:**
       - Top 3 priority changes
       - A/B testing suggestions
       - Industry benchmarking
       - Competitive analysis
  `;

  return callGeminiAPI(prompt);
};

// Enhanced Performance Evaluation
export const generatePerformanceReview = async (
  employeeName: string,
  jobTitle: string,
  department: string,
  reviewPeriod: string,
  performanceData: string,
  managerName: string
): Promise<string> => {
  const prompt = `
    Generate a comprehensive performance evaluation for an employee based on the provided data.

    **Employee Information:**
    - Name: ${employeeName}
    - Role: ${jobTitle}
    - Department: ${department}
    - Review period: ${reviewPeriod}
    - Manager: ${managerName}

    **Performance Data:**
    ${performanceData}

    **Evaluation Framework:**

    1. **Goal Achievement Analysis (25%):**
       - Quantitative goals met/missed
       - Qualitative objective assessment
       - Impact on team/company objectives
       - Goal-setting effectiveness for next period

    2. **Core Competencies Assessment (25%):**
       - Technical skills evaluation
       - Soft skills demonstration
       - Leadership capabilities (if applicable)
       - Communication effectiveness

    3. **Behavioral Indicators (20%):**
       - Collaboration and teamwork
       - Initiative and proactivity
       - Adaptability and learning agility
       - Cultural fit and values alignment

    4. **Growth & Development (15%):**
       - Skill development progress
       - Learning initiatives undertaken
       - Mentoring given/received
       - Career trajectory alignment

    5. **Impact & Value Creation (15%):**
       - Business impact quantification
       - Innovation and improvement contributions
       - Customer/stakeholder feedback
       - Process optimization efforts

    **Output Requirements:**
    - Overall performance rating (1-5 scale)
    - Detailed narrative assessment
    - Strengths and achievements highlights
    - Areas for improvement with specific examples
    - Development recommendations
    - Career pathing suggestions
    - Goal setting for next review period

    **Tone:** Professional, constructive, balanced, and development-focused.
  `;

  return callGeminiAPI(prompt);
};

export const synthesize360Feedback = async (
  managerFeedback: string,
  peerFeedback: string,
  reportFeedback: string,
  crossFunctionalFeedback: string,
  selfAssessment: string
): Promise<string> => {
  const prompt = `
    Synthesize 360-degree feedback into a comprehensive performance summary.

    **Feedback Sources:**
    - Direct manager feedback: ${managerFeedback}
    - Peer feedback: ${peerFeedback}
    - Direct report feedback: ${reportFeedback}
    - Cross-functional feedback: ${crossFunctionalFeedback}
    - Self-assessment: ${selfAssessment}

    **Analysis Framework:**

    1. **Consistency Analysis:**
       - Areas of agreement across all sources
       - Significant discrepancies and potential reasons
       - Self-perception vs. others' perception gaps
       - Blind spots identification

    2. **Thematic Categorization:**
       - Leadership effectiveness
       - Communication skills
       - Technical competence
       - Collaboration ability
       - Innovation and creativity
       - Reliability and accountability

    3. **Strengths Consolidation:**
       - Top 5 consistent strengths across sources
       - Unique strengths noted by specific groups
       - Underutilized strengths with development potential

    4. **Development Opportunities:**
       - Critical areas needing improvement
       - Skills gaps impacting performance
       - Behavioral patterns limiting effectiveness
       - Quick wins vs. long-term development needs

    5. **Actionable Recommendations:**
       - Specific development activities
       - Mentoring or coaching suggestions
       - Training program recommendations
       - Stretch assignment opportunities

    **Delivery Format:**
    - Executive summary (2-3 paragraphs)
    - Detailed findings by category
    - Development priority matrix
    - Action plan template
    - Progress tracking recommendations
  `;

  return callGeminiAPI(prompt);
};

// Advanced Candidate Matching
export const matchCandidatesAdvanced = async (
  jobDescription: string,
  competencyFramework: string,
  candidateProfiles: string[]
): Promise<string> => {
  const prompt = `
    You are an AI recruitment matching system. Analyze and score candidates against job requirements using multi-dimensional matching.

    **Job Profile:**
    ${jobDescription}

    **Required Competencies:**
    ${competencyFramework}

    **Candidate Pool:**
    ${candidateProfiles.map((profile, index) => `Candidate ${index + 1}:\n${profile}`).join('\n\n---\n\n')}

    **Matching Dimensions:**

    1. **Technical Skills Match (30%):**
       - Hard skills alignment
       - Tool/technology proficiency
       - Certification relevance
       - Experience depth in required areas

    2. **Experience Relevance (25%):**
       - Industry experience match
       - Role responsibility similarity
       - Company size/type experience
       - Project complexity alignment

    3. **Cultural Fit Prediction (20%):**
       - Work style compatibility
       - Value system alignment
       - Communication style match
       - Team dynamics fit

    4. **Growth Potential (15%):**
       - Learning trajectory analysis
       - Skill development pattern
       - Career progression logic
       - Adaptability indicators

    5. **Availability & Logistics (10%):**
       - Location compatibility
       - Availability timeline
       - Compensation alignment
       - Work arrangement preferences

    **Matching Algorithm:**
    For each candidate, calculate:
    - Overall match score (0-100)
    - Dimension-specific scores
    - Confidence level in prediction
    - Risk factors identification
    - Interview recommendation priority

    **Output Format:**
    - Ranked candidate list
    - Match reasoning for top candidates
    - Potential concerns for each
    - Interview focus recommendations
    - Alternative role suggestions (if applicable)

    **Special Considerations:**
    - Diversity and inclusion factors
    - Remote work capabilities
    - Growth trajectory potential
    - Team composition balance
  `;

  return callGeminiAPI(prompt);
};

export const generateSourcingStrategy = async (
  jobTitle: string,
  industry: string,
  locationRequirements: string,
  experienceLevel: string,
  idealCandidateProfile: string
): Promise<string> => {
  const prompt = `
    Generate targeted candidate sourcing strategies and search strings for finding ideal candidates.

    **Position Details:**
    - Job title: ${jobTitle}
    - Industry: ${industry}
    - Location: ${locationRequirements}
    - Experience level: ${experienceLevel}

    **Ideal Candidate Profile:**
    ${idealCandidateProfile}

    **Sourcing Strategy:**

    1. **LinkedIn Search Strings:**
       - Boolean search combinations
       - Industry-specific keywords
       - Company targeting strategies
       - Skill combination searches
       - Location and availability filters

    2. **Platform-Specific Approaches:**
       - GitHub search strategies (for technical roles)
       - Industry forums and communities
       - Professional association databases
       - Alumni network targeting
       - Conference and event attendee lists

    3. **Passive Candidate Engagement:**
       - Compelling outreach message templates
       - Value proposition customization
       - Multi-touch communication sequences
       - Referral program activation
       - Content marketing for attraction

    4. **Diversity Sourcing:**
       - Underrepresented group targeting
       - Inclusive sourcing channels
       - Partnership organization outreach
       - Bias-free search string development
       - Diverse talent community engagement

    5. **Market Intelligence:**
       - Competitor talent mapping
       - Salary benchmarking data
       - Market availability assessment
       - Talent pipeline development
       - Succession planning integration

    **Expected Outputs:**
    - Ready-to-use search strings
    - Outreach message templates
    - Sourcing channel prioritization
    - Timeline and activity planning
    - Success metrics definition
  `;

  return callGeminiAPI(prompt);
};

// Legacy functions for backward compatibility
export const generateInterviewQuestions = async (jobRole: string, experience: string): Promise<string> => {
  return generateBehavioralQuestions(jobRole, 'Technology', experience, 'Medium', 'Collaborative and innovative');
};

export const optimizeJobDescription = async (jobDescription: string): Promise<string> => {
  return optimizeJobDescriptionAdvanced(jobDescription, 'Various', 'Technology', 'Medium', 'Remote/Hybrid', 'Mid-level');
};

export const evaluatePerformance = async (employeeData: string, criteria: string[]): Promise<string> => {
  return generatePerformanceReview('Employee', 'Various', 'General', 'Annual', employeeData, 'Manager');
};

export const matchCandidates = async (jobDescription: string, candidates: string[]): Promise<string> => {
  return matchCandidatesAdvanced(jobDescription, 'Standard competency framework', candidates);
};
