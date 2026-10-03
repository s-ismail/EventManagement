import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import NavScroll from '../NavScroll';

const InsertGuest = () => {
  const [guest, setGuest] = useState({
    name: '',
    email: '',
    eventId: '',
  });
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await API.get('/Event');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleChange = (e) => {
    setGuest({ ...guest, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/Guest', guest);
      navigate('/guests');
    } catch (error) {
      console.error('Error creating guest:', error);
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll/>
      <h1 className="mb-4">Add New Guest</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={guest.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={guest.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event</Form.Label>
          <Form.Select
            name="eventId"
            value={guest.eventId}
            onChange={handleChange}
            required
          >
            <option value="">Select an event</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Guest
        </Button>
      </Form>
    </Container>
  );
};

export default InsertGuest;

