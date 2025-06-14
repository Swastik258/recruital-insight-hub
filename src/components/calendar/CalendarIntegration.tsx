
import React, { useState } from 'react';
import { CalendarView } from './CalendarView';
import { EventForm } from './EventForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const CalendarIntegration: React.FC = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | undefined>();

  const handleCreateEvent = () => {
    setEditingEventId(undefined);
    setShowEventForm(true);
  };

  const handleEditEvent = (eventId: string) => {
    setEditingEventId(eventId);
    setShowEventForm(true);
  };

  const handleCloseForm = () => {
    setShowEventForm(false);
    setEditingEventId(undefined);
  };

  const handleFormSuccess = () => {
    setShowEventForm(false);
    setEditingEventId(undefined);
  };

  return (
    <div className="space-y-6">
      <CalendarView 
        onCreateEvent={handleCreateEvent}
        onEditEvent={handleEditEvent}
      />

      <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingEventId ? 'Edit Event' : 'Create New Event'}
            </DialogTitle>
          </DialogHeader>
          <EventForm
            eventId={editingEventId}
            onClose={handleCloseForm}
            onSuccess={handleFormSuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
