
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTeams } from '@/hooks/useTeams';

interface CalendarEvent {
  id: string;
  team_id: string;
  created_by: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  event_type: string;
  location: string | null;
  attendees: string[] | null;
  is_recurring: boolean | null;
  recurrence_pattern: string | null;
  recurrence_end_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string | null;
    email: string | null;
  };
}

interface EventAttendee {
  id: string;
  event_id: string;
  user_id: string;
  status: string;
  response_at: string | null;
  created_at: string;
  profiles: {
    full_name: string | null;
    email: string | null;
  };
}

export const useCalendar = () => {
  const { user } = useAuth();
  const { currentTeam } = useTeams();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [attendees, setAttendees] = useState<EventAttendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    if (!user || !currentTeam) return;

    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .select(`
          *,
          profiles(full_name, email)
        `)
        .eq('team_id', currentTeam.id)
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
      } else {
        const transformedEvents: CalendarEvent[] = (data || []).map(event => ({
          ...event,
          attendees: Array.isArray(event.attendees) 
            ? event.attendees.filter((item): item is string => typeof item === 'string')
            : null
        }));
        setEvents(transformedEvents);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch events');
    }
  };

  const createEvent = async (eventData: {
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    event_type?: string;
    location?: string;
    attendees?: string[];
  }) => {
    if (!user || !currentTeam) return false;

    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .insert({
          team_id: currentTeam.id,
          created_by: user.id,
          title: eventData.title,
          description: eventData.description,
          start_time: eventData.start_time,
          end_time: eventData.end_time,
          event_type: eventData.event_type || 'meeting',
          location: eventData.location,
          attendees: eventData.attendees || []
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating event:', error);
        setError(error.message);
        return false;
      }

      if (eventData.attendees && eventData.attendees.length > 0) {
        const attendeeInserts = eventData.attendees.map(userId => ({
          event_id: data.id,
          user_id: userId,
          status: 'pending'
        }));

        await supabase
          .from('calendar_event_attendees')
          .insert(attendeeInserts);
      }

      await fetchEvents();
      return true;
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event');
      return false;
    }
  };

  const updateEvent = async (eventId: string, updates: Partial<CalendarEvent>) => {
    try {
      const { error } = await supabase
        .from('calendar_events')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', eventId);

      if (error) {
        console.error('Error updating event:', error);
        setError(error.message);
        return false;
      }

      await fetchEvents();
      return true;
    } catch (err) {
      console.error('Error updating event:', err);
      setError('Failed to update event');
      return false;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', eventId);

      if (error) {
        console.error('Error deleting event:', error);
        setError(error.message);
        return false;
      }

      await fetchEvents();
      return true;
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Failed to delete event');
      return false;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchEvents();
      setLoading(false);
    };

    if (user && currentTeam) {
      loadData();
    }
  }, [user, currentTeam]);

  return {
    events,
    attendees,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refetchEvents: fetchEvents
  };
};
