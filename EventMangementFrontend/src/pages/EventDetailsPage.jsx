import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import eventService from '../api/eventService';
import ReactLoading from 'react-loading';

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventService.getEvent(id);
        setEvent(response.data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.error('Failed to fetch event details', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleParticipate = async () => {
    try {
      await eventService.attendEvent(id);
      alert('You have successfully registered for this event!');
    } catch (error) {
      console.error('Failed to register for event', error);
      alert('Failed to register for event. Please try again.');
    }
  };

  if (isLoading) {
    return <center><ReactLoading type='spokes' color='blue' height={'8%'} width={'8%'} /></center>;
  }

  if (isError) {
    return <div>Error loading event details. Please try again later.</div>;
  }

  return (
    <>
      <Navbar />
      <Container className="my-4">
        <h1>{event.name}</h1>
        <img src={event.imagePath || '/placeholder.svg'} alt={event.name} className="img-fluid mb-3" />
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Venue:</strong> {event.venue.name}</p>
        <p><strong>Category:</strong> {event.category.name}</p>
        <p>{event.description}</p>
        <Button onClick={handleParticipate}>Participate</Button>
      </Container>
      <Footer />
    </>
  );
};

export default EventDetailsPage;

