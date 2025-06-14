
-- Fix the infinite recursion in team_members policies by updating them
-- Drop the problematic policies first
DROP POLICY IF EXISTS "Users can view team members of their teams" ON public.team_members;
DROP POLICY IF EXISTS "Team admins can manage team members" ON public.team_members;

-- Create new policies that avoid infinite recursion
CREATE POLICY "Users can view team members of their teams" 
  ON public.team_members 
  FOR SELECT 
  USING (
    user_id = auth.uid() OR
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team admins can insert team members" 
  ON public.team_members 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.team_members existing_members
      WHERE existing_members.team_id = team_members.team_id 
      AND existing_members.user_id = auth.uid() 
      AND existing_members.role = 'admin'
    )
  );

CREATE POLICY "Team admins can update team members" 
  ON public.team_members 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members existing_members
      WHERE existing_members.team_id = team_members.team_id 
      AND existing_members.user_id = auth.uid() 
      AND existing_members.role = 'admin'
    )
  );

CREATE POLICY "Team admins can delete team members" 
  ON public.team_members 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members existing_members
      WHERE existing_members.team_id = team_members.team_id 
      AND existing_members.user_id = auth.uid() 
      AND existing_members.role = 'admin'
    )
  );

-- Add missing foreign key constraint for profiles.current_team_id
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_current_team_id_fkey;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_current_team_id_fkey 
FOREIGN KEY (current_team_id) REFERENCES public.teams(id);

-- Add missing foreign key constraints for team_members
ALTER TABLE public.team_members 
DROP CONSTRAINT IF EXISTS team_members_team_id_fkey;

ALTER TABLE public.team_members 
ADD CONSTRAINT team_members_team_id_fkey 
FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;

ALTER TABLE public.team_members 
DROP CONSTRAINT IF EXISTS team_members_user_id_fkey;

ALTER TABLE public.team_members 
ADD CONSTRAINT team_members_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
