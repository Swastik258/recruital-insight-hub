
const GEMINI_API_KEY = 'AIzaSyCHKp7O2KzlRUqFkqB8DobMdksXybdov2A';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const callGeminiAPI = async (prompt: string): Promise<string> => {
  try {
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
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No response from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

export const analyzeResume = async (resumeText: string, jobRequirements: string): Promise<string> => {
  const prompt = `
    You are an expert HR professional and ATS system. Analyze the provided resume against the job requirements and provide a comprehensive screening report.

    Job Requirements:
    ${jobRequirements}

    Resume Content:
    ${resumeText}

    Please provide a detailed analysis including:
    1. Match Score (0-100): Overall compatibility percentage
    2. Key Qualifications Match: Required skills found and missing critical skills
    3. Strengths Analysis: Top 3 strongest qualifications
    4. Red Flags & Concerns: Any issues or gaps
    5. Interview Recommendation: RECOMMEND/MAYBE/REJECT with reasoning

    Format the response as a structured report.
  `;

  return callGeminiAPI(prompt);
};

export const generateInterviewQuestions = async (jobRole: string, experience: string): Promise<string> => {
  const prompt = `
    Generate comprehensive interview questions for a ${jobRole} position for a ${experience} level candidate.

    Please provide:
    1. 5 Behavioral questions with "Tell me about a time when..." format
    2. 5 Technical/Role-specific questions
    3. 3 Cultural fit questions
    4. 2 Situational scenario questions

    For each question, briefly indicate what you're assessing.
    Format the response clearly with categories and numbered questions.
  `;

  return callGeminiAPI(prompt);
};

export const optimizeJobDescription = async (jobDescription: string): Promise<string> => {
  const prompt = `
    You are an expert HR copywriter and recruitment specialist. Optimize this job description to attract top talent and improve application rates.

    Current Job Description:
    ${jobDescription}

    Please provide:
    1. An optimized version of the job description
    2. Key improvements made (SEO keywords, inclusive language, clarity)
    3. Suggestions for better candidate attraction
    4. Before/after comparison highlights

    Focus on:
    - SEO optimization for job boards
    - Inclusive and bias-free language
    - Clear value proposition
    - Compelling benefits and growth opportunities
  `;

  return callGeminiAPI(prompt);
};

export const evaluatePerformance = async (employeeData: string, criteria: string[]): Promise<string> => {
  const prompt = `
    Generate a comprehensive performance evaluation based on the provided employee data and criteria.

    Employee Information:
    ${employeeData}

    Evaluation Criteria:
    ${criteria.join(', ')}

    Please provide:
    1. Overall performance rating (1-5 scale)
    2. Detailed assessment for each criterion
    3. Key strengths and achievements
    4. Areas for improvement with specific examples
    5. Development recommendations
    6. Goal suggestions for next review period

    Format as a professional performance review report.
  `;

  return callGeminiAPI(prompt);
};

export const matchCandidates = async (jobDescription: string, candidates: string[]): Promise<string> => {
  const prompt = `
    You are an AI recruitment matching system. Analyze and score candidates against job requirements.

    Job Description:
    ${jobDescription}

    Candidates to evaluate:
    ${candidates.join('\n\n---\n\n')}

    For each candidate, provide:
    1. Match score (0-100)
    2. Key strengths alignment
    3. Potential concerns
    4. Interview focus recommendations
    5. Overall ranking recommendation

    Rank all candidates from best to least suitable match.
  `;

  return callGeminiAPI(prompt);
};
