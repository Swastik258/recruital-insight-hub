
-- Create calendar_events table for storing calendar events
CREATE TABLE public.calendar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'meeting', -- 'meeting', 'interview', 'deadline', 'other'
  location TEXT,
  attendees JSONB DEFAULT '[]'::jsonb,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern TEXT, -- 'daily', 'weekly', 'monthly', 'yearly'
  recurrence_end_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'cancelled', 'completed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create calendar_event_attendees table for managing event attendance
CREATE TABLE public.calendar_event_attendees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.calendar_events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'declined', 'tentative'
  response_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Enable RLS on calendar_events table
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Create policies for calendar_events
CREATE POLICY "Team members can view their team's events" 
  ON public.calendar_events 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.team_id = calendar_events.team_id 
      AND team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can create events for their team" 
  ON public.calendar_events 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.team_id = calendar_events.team_id 
      AND team_members.user_id = auth.uid()
    ) AND created_by = auth.uid()
  );

CREATE POLICY "Event creators and admins can update events" 
  ON public.calendar_events 
  FOR UPDATE 
  USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.team_id = calendar_events.team_id 
      AND team_members.user_id = auth.uid()
      AND team_members.role = 'admin'
    )
  );

CREATE POLICY "Event creators and admins can delete events" 
  ON public.calendar_events 
  FOR DELETE 
  USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_members.team_id = calendar_events.team_id 
      AND team_members.user_id = auth.uid()
      AND team_members.role = 'admin'
    )
  );

-- Enable RLS on calendar_event_attendees table
ALTER TABLE public.calendar_event_attendees ENABLE ROW LEVEL SECURITY;

-- Create policies for calendar_event_attendees
CREATE POLICY "Users can view attendees of events they can see" 
  ON public.calendar_event_attendees 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.calendar_events 
      WHERE calendar_events.id = calendar_event_attendees.event_id
      AND EXISTS (
        SELECT 1 FROM public.team_members 
        WHERE team_members.team_id = calendar_events.team_id 
        AND team_members.user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Event creators can manage attendees" 
  ON public.calendar_event_attendees 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.calendar_events 
      WHERE calendar_events.id = calendar_event_attendees.event_id
      AND calendar_events.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can update their own attendance status" 
  ON public.calendar_event_attendees 
  FOR UPDATE 
  USING (user_id = auth.uid());
