
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting job fetch process...');

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Job search parameters
    const searchQueries = [
      'software developer',
      'frontend developer', 
      'backend developer',
      'full stack developer',
      'product manager',
      'ui designer',
      'ux designer',
      'data scientist',
      'devops engineer',
      'marketing manager'
    ];

    const countries = ['us', 'gb', 'ca']; // US, UK, Canada
    let totalJobsAdded = 0;

    for (const country of countries) {
      for (const query of searchQueries) {
        try {
          console.log(`Fetching jobs for: ${query} in ${country}`);
          
          // Using Adzuna API (free tier)
          const adzunaUrl = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=test&app_key=test&results_per_page=20&what=${encodeURIComponent(query)}&content-type=application/json`;
          
          const response = await fetch(adzunaUrl);
          
          if (!response.ok) {
            console.log(`Failed to fetch from Adzuna for ${query}: ${response.status}`);
            continue;
          }

          const data = await response.json();
          const jobs = data.results || [];

          console.log(`Found ${jobs.length} jobs for ${query}`);

          for (const job of jobs) {
            try {
              // Extract skills from job description
              const description = job.description?.replace(/<[^>]*>/g, '') || '';
              const skills = extractSkillsFromDescription(description);
              
              // Map salary data
              let salaryRange = null;
              if (job.salary_min && job.salary_max) {
                salaryRange = `$${job.salary_min} - $${job.salary_max}`;
              } else if (job.salary_min) {
                salaryRange = `From $${job.salary_min}`;
              }

              // Prepare job data
              const jobData = {
                title: job.title?.substring(0, 255) || 'Untitled Position',
                company: job.company?.display_name?.substring(0, 255) || 'Unknown Company',
                location: `${job.location?.display_name || 'Remote'}`,
                description: description.substring(0, 2000),
                required_skills: skills,
                experience_level: inferExperienceLevel(job.title, description),
                salary_range: salaryRange,
                job_type: inferJobType(description),
                department: inferDepartment(job.title, job.category?.label),
                posted_date: job.created ? new Date(job.created).toISOString() : new Date().toISOString(),
                external_job_id: `adzuna_${job.id}`,
                source: 'Adzuna',
                is_active: true
              };

              // Insert job into database (upsert to avoid duplicates)
              const { data: insertedJob, error } = await supabase
                .from('job_openings')
                .upsert(jobData, { 
                  onConflict: 'external_job_id',
                  ignoreDuplicates: false 
                })
                .select();

              if (error) {
                console.error('Error inserting job:', error);
              } else {
                totalJobsAdded++;
                console.log(`Added job: ${jobData.title} at ${jobData.company}`);
              }

            } catch (jobError) {
              console.error('Error processing individual job:', jobError);
            }
          }

          // Rate limiting - wait between requests
          await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (queryError) {
          console.error(`Error fetching jobs for ${query}:`, queryError);
        }
      }
    }

    // Clean up old jobs (older than 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { error: cleanupError } = await supabase
      .from('job_openings')
      .update({ is_active: false })
      .lt('posted_date', thirtyDaysAgo.toISOString());

    if (cleanupError) {
      console.error('Error cleaning up old jobs:', cleanupError);
    }

    console.log(`Job fetch completed. Total jobs added/updated: ${totalJobsAdded}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        jobsAdded: totalJobsAdded,
        message: 'Jobs fetched successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fetch-jobs function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper functions
function extractSkillsFromDescription(description: string): string[] {
  const commonSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'C#',
    'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Vue.js', 'Angular',
    'Express', 'Django', 'Flask', 'Spring', 'Laravel', 'Ruby on Rails',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch',
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins',
    'Git', 'GitHub', 'GitLab', 'Jira', 'Confluence',
    'HTML', 'CSS', 'SASS', 'LESS', 'Tailwind', 'Bootstrap',
    'REST API', 'GraphQL', 'Microservices', 'Agile', 'Scrum',
    'Machine Learning', 'AI', 'Data Science', 'Analytics',
    'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator'
  ];

  const foundSkills: string[] = [];
  const lowerDescription = description.toLowerCase();

  for (const skill of commonSkills) {
    if (lowerDescription.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  }

  return foundSkills;
}

function inferExperienceLevel(title: string, description: string): string {
  const content = `${title} ${description}`.toLowerCase();
  
  if (content.includes('senior') || content.includes('lead') || content.includes('principal')) {
    return 'Senior (5+ years)';
  } else if (content.includes('mid') || content.includes('intermediate')) {
    return 'Mid-level (3-5 years)';
  } else if (content.includes('junior') || content.includes('entry') || content.includes('graduate')) {
    return 'Junior (1-3 years)';
  }
  
  return 'Not specified';
}

function inferJobType(description: string): string {
  const lowerDescription = description.toLowerCase();
  
  if (lowerDescription.includes('contract') || lowerDescription.includes('freelance')) {
    return 'Contract';
  } else if (lowerDescription.includes('part-time') || lowerDescription.includes('part time')) {
    return 'Part-time';
  } else if (lowerDescription.includes('internship') || lowerDescription.includes('intern')) {
    return 'Internship';
  }
  
  return 'Full-time';
}

function inferDepartment(title: string, category?: string): string {
  const content = `${title} ${category || ''}`.toLowerCase();
  
  if (content.includes('engineer') || content.includes('developer') || content.includes('programmer')) {
    return 'Engineering';
  } else if (content.includes('design') || content.includes('ui') || content.includes('ux')) {
    return 'Design';
  } else if (content.includes('product') || content.includes('pm')) {
    return 'Product';
  } else if (content.includes('marketing') || content.includes('growth')) {
    return 'Marketing';
  } else if (content.includes('sales') || content.includes('business development')) {
    return 'Sales';
  } else if (content.includes('data') || content.includes('analytics')) {
    return 'Data';
  }
  
  return 'Other';
}
