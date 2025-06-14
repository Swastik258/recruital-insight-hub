
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { useTeams } from '@/hooks/useTeams';
import { useToast } from '@/hooks/use-toast';

interface EventFormProps {
  eventId?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({ eventId, onClose, onSuccess }) => {
  const { events, createEvent, updateEvent, deleteEvent } = useCalendar();
  const { teamMembers } = useTeams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    event_type: 'meeting',
    location: '',
    attendees: [] as string[]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const existingEvent = eventId ? events.find(e => e.id === eventId) : null;

  useEffect(() => {
    if (existingEvent) {
      setFormData({
        title: existingEvent.title,
        description: existingEvent.description || '',
        start_time: existingEvent.start_time.slice(0, 16), // Format for datetime-local input
        end_time: existingEvent.end_time.slice(0, 16),
        event_type: existingEvent.event_type,
        location: existingEvent.location || '',
        attendees: existingEvent.attendees || []
      });
    }
  }, [existingEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const eventData = {
        ...formData,
        start_time: new Date(formData.start_time).toISOString(),
        end_time: new Date(formData.end_time).toISOString()
      };

      let success = false;
      if (eventId) {
        success = await updateEvent(eventId, eventData);
      } else {
        success = await createEvent(eventData);
      }

      if (success) {
        toast({
          title: eventId ? "Event Updated" : "Event Created",
          description: `Event "${formData.title}" has been ${eventId ? 'updated' : 'created'} successfully.`,
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Error",
        description: "Failed to save event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!eventId) return;
    
    setIsDeleting(true);
    try {
      const success = await deleteEvent(eventId);
      if (success) {
        toast({
          title: "Event Deleted",
          description: "Event has been deleted successfully.",
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CalendarDays className="h-5 w-5" />
          <span>{eventId ? 'Edit Event' : 'Create New Event'}</span>
        </CardTitle>
        <CardDescription>
          {eventId ? 'Update event details' : 'Schedule a new event for your team'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Event description (optional)"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time" className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Start Date & Time</span>
              </Label>
              <Input
                id="start_time"
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_time" className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>End Date & Time</span>
              </Label>
              <Input
                id="end_time"
                type="datetime-local"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event_type">Event Type</Label>
              <Select value={formData.event_type} onValueChange={(value) => setFormData({ ...formData, event_type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Location</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Meeting location (optional)"
              />
            </div>
          </div>

          <div className="flex justify-between space-x-4">
            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {eventId && (
                <Button 
                  type="button" 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (eventId ? 'Update Event' : 'Create Event')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
