import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import NavScroll from '../NavScroll';

const InsertVenue = () => {
  const [venue, setVenue] = useState({ name: '', location: '', capacity: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/Venue', venue);
      navigate('/venues');
    } catch (error) {
      console.error('Error creating venue:', error);
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll/>
      <h1 className="mb-4">Add New Venue</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={venue.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={venue.location}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Capacity</Form.Label>
          <Form.Control
            type="number"
            name="capacity"
            value={venue.capacity}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Venue
        </Button>
      </Form>
    </Container>
  );
};

export default InsertVenue;

