import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../../components/events/EventForm';
import eventService from '../../api/eventService';

const UpdateEventPage = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventService.getEvent(id);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event', error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (eventData) => {
    try {
      await eventService.updateEvent(id, eventData);
      navigate('/admin/events');
    } catch (error) {
      console.error('Failed to update event', error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-event-page container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Update Event</h1>
      <EventForm initialData={event} onSubmit={handleSubmit} buttonText="Update Event" />
    </div>
  );
};

export default UpdateEventPage;

