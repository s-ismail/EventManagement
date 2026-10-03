import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api/axios';
import NavScroll from '../NavScroll';

const UpdateVenue = () => {
  const [venue, setVenue] = useState({ name: '', location: '', capacity: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchVenue();
  }, []);

  const fetchVenue = async () => {
    try {
      const response = await API.get(`/Venue/${id}`);
      setVenue(response.data);
    } catch (error) {
      console.error('Error fetching venue:', error);
    }
  };

  const handleChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/Venue/${id}`, venue);
      navigate('/venues');
    } catch (error) {
      console.error('Error updating venue:', error);
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll/>
      <h1 className="mb-4">Update Venue</h1>
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
          Update Venue
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateVenue;

