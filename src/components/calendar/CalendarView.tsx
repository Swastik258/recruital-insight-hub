
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, MapPin, Users, Plus } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { format, isSameDay, parseISO } from 'date-fns';

interface CalendarViewProps {
  onCreateEvent: () => void;
  onEditEvent: (eventId: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onCreateEvent, onEditEvent }) => {
  const { events, loading } = useCalendar();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(parseISO(event.start_time), date)
    );
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-green-100 text-green-800';
      case 'deadline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Loading calendar events...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5" />
              <span>Calendar</span>
            </CardTitle>
            <Button onClick={onCreateEvent} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            Events for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </CardTitle>
          <CardDescription>
            {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''} scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedDateEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CalendarDays className="h-12 w-12 mx-auto mb-4" />
                <p>No events scheduled for this day</p>
                <Button onClick={onCreateEvent} className="mt-4">
                  Create Event
                </Button>
              </div>
            ) : (
              selectedDateEvents.map((event) => (
                <Card key={event.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onEditEvent(event.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        {event.description && (
                          <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                        )}
                        
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {format(parseISO(event.start_time), 'h:mm a')} - {format(parseISO(event.end_time), 'h:mm a')}
                            </span>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          
                          {event.attendees && event.attendees.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{event.attendees.length} attendee{event.attendees.length !== 1 ? 's' : ''}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-3">
                          <Badge className={getEventTypeColor(event.event_type)}>
                            {event.event_type}
                          </Badge>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
