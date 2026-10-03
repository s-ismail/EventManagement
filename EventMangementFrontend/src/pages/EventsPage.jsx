import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import EventCard from '../components/events/EventCard';
import eventService from '../api/eventService';
import ReactLoading from 'react-loading';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getAllEvents();
        setEvents(response.data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.error('Failed to fetch events', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return <center><ReactLoading type='spokes' color='blue' height={'8%'} width={'8%'} /></center>;
  }

  if (isError) {
    return <div>Error loading events. Please try again later.</div>;
  }

  return (
    <>
      <Navbar />
      <Container className="my-4">
        <h1>Upcoming Events</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {events.map(event => (
            <Col key={event.id}>
              <EventCard event={event} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default EventsPage;

