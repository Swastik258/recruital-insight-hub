
-- Create teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team_members table to manage team membership
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member', -- 'admin', 'member', 'viewer'
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Add team_id to profiles table to track user's current active team
ALTER TABLE public.profiles 
ADD COLUMN current_team_id UUID REFERENCES public.teams(id);

-- Enable RLS on teams table
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Create policies for teams
CREATE POLICY "Users can view teams they belong to" 
  ON public.teams 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.team_id = teams.id 
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team admins can update their teams" 
  ON public.teams 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.team_id = teams.id 
      AND team_members.user_id = auth.uid()
      AND team_members.role = 'admin'
    )
  );

-- Enable RLS on team_members table
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for team_members
CREATE POLICY "Users can view team members of their teams" 
  ON public.team_members 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = team_members.team_id 
      AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Team admins can manage team members" 
  ON public.team_members 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = team_members.team_id 
      AND tm.user_id = auth.uid()
      AND tm.role = 'admin'
    )
  );

-- Create a default team for existing users
INSERT INTO public.teams (name, description) 
VALUES ('Default Team', 'Default team for existing users');

-- Add existing users to the default team as admins
INSERT INTO public.team_members (team_id, user_id, role)
SELECT 
  (SELECT id FROM public.teams WHERE name = 'Default Team'),
  id,
  'admin'
FROM public.profiles;

-- Update existing users' current_team_id
UPDATE public.profiles 
SET current_team_id = (SELECT id FROM public.teams WHERE name = 'Default Team');
