
-- Create a table for storing job openings
CREATE TABLE public.job_openings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  required_skills TEXT[] DEFAULT '{}',
  experience_level TEXT,
  salary_range TEXT,
  job_type TEXT, -- full-time, part-time, contract, etc.
  department TEXT,
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_date TIMESTAMP WITH TIME ZONE,
  external_job_id TEXT UNIQUE, -- ID from the external job API
  source TEXT, -- which API/source the job came from
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to read job openings
CREATE POLICY "Anyone can view active job openings" 
  ON public.job_openings 
  FOR SELECT 
  USING (is_active = true);

-- Create policy for system to insert/update job openings (service role)
CREATE POLICY "Service role can manage job openings" 
  ON public.job_openings 
  FOR ALL 
  USING (true);

-- Create index for better performance
CREATE INDEX idx_job_openings_active ON public.job_openings(is_active);
CREATE INDEX idx_job_openings_posted_date ON public.job_openings(posted_date);
CREATE INDEX idx_job_openings_external_id ON public.job_openings(external_job_id);

-- Enable realtime for job openings
ALTER TABLE public.job_openings REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.job_openings;
