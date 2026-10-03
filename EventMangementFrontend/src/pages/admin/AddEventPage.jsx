import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../../components/events/EventForm';
import eventService from '../../api/eventService';

const AddEventPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (eventData) => {
    try {
      await eventService.createEvent(eventData);
      navigate('/admin/events');
    } catch (error) {
      console.error('Failed to create event', error);
    }
  };

  return (
    <div className="add-event-page container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Add New Event</h1>
      <EventForm onSubmit={handleSubmit} buttonText="Create Event" />
    </div>
  );
};

export default AddEventPage;

