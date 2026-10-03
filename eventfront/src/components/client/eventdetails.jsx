import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarkerAlt, faTag, faUsers } from '@fortawesome/free-solid-svg-icons';
import API from '../../api/axios';
import NavScroll from '../NavScroll';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await API.get(`/Event/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
      setError('Failed to load event details. Please try again later.');
    }
  };

  const handleParticipate = async () => {
    try {
      await API.post(`/Event/${id}/participate`);
      alert('You have successfully registered for this event!');
      navigate('/events');
    } catch (error) {
      console.error('Error participating in event:', error);
      setError('Failed to register for the event. Please try again later.');
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5">
      <NavScroll/>
      <Row>
        <Col md={6}>
          <Image src={event.imagePath || '/placeholder.jpg'} fluid rounded />
        </Col>
        <Col md={6}>
          <h1 className="mb-4">{event.name}</h1>
          <p className="lead mb-4">{event.description}</p>
          <p className="mb-3">
            <FontAwesomeIcon icon={faCalendar} className="me-2" />
            {new Date(event.date).toLocaleString()}
          </p>
          <p className="mb-3">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
            {event.venue?.name || 'Venue TBA'}
          </p>
          <p className="mb-3">
            <FontAwesomeIcon icon={faTag} className="me-2" />
            {event.category?.name || 'Uncategorized'}
          </p>
          <p className="mb-4">
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            {event.currentGuestCount} / {event.venue?.capacity || 'Unlimited'} participants
          </p>
          <Button variant="primary" size="lg" onClick={handleParticipate}>
            Participate
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EventDetails;

