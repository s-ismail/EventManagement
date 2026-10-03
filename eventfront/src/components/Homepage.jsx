import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavScroll from './NavScroll';
import EventCard from '../components/client/eventcard';
import API from '../api/axios';

function Homepage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await API.get('/api/Event');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div>
      <NavScroll />
      <Container className="mt-4">
        <h1 className="text-center mb-4">Welcome to the Homepage</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {events.map((event) => (
            <Col key={event.id}>
              <EventCard event={event} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;

