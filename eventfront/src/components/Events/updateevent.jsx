import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api/axios';
import NavScroll from '../NavScroll';

const UpdateEvent = () => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    venueId: '',
    status: '',
    categoryId: '',
    imagePath: '',
  });
  const [venues, setVenues] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchEvent();
    fetchVenues();
    fetchCategories();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await API.get(`/Event/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await API.get('/Venue');
      setVenues(response.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await API.get('/Category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await API.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setEvent({ ...event, imagePath: response.data.imagePath });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/Event/${id}`, event);
      navigate('/events');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll/>
      <h1 className="mb-4">Update Event</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={event.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={event.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Venue</Form.Label>
          <Form.Select
            name="venueId"
            value={event.venueId}
            onChange={handleChange}
            required
          >
            <option value="">Select a venue</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            name="status"
            value={event.status}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="categoryId"
            value={event.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
          />
          {event.imagePath && (
            <img src={event.imagePath} alt="Event" className="mt-2" style={{ maxWidth: '200px' }} />
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Event
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateEvent;

