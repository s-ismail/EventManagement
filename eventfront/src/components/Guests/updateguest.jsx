import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api/axios';
import NavScroll from '../NavScroll';

const UpdateGuest = () => {
  const [guest, setGuest] = useState({
    name: '',
    email: '',
    eventId: '',
  });
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchGuest();
    fetchEvents();
  }, []);

  const fetchGuest = async () => {
    try {
      const response = await API.get(`/Guest/${id}`);
      setGuest(response.data);
    } catch (error) {
      console.error('Error fetching guest:', error);
    }
  };

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
      await API.put(`/Guest/${id}`, guest);
      navigate('/guests');
    } catch (error) {
      console.error('Error updating guest:', error);
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll/>
      <h1 className="mb-4">Update Guest</h1>
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
          Update Guest
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateGuest;

