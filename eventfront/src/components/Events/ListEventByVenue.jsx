import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import API from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import NavScroll from '../NavScroll';

const ListEventsByVenue = () => {
  const { id } = useParams(); // Get venue ID from route params
  const [events, setEvents] = useState([]);
  const [venueName, setVenueName] = useState('');

  useEffect(() => {
    fetchEventsByVenue(id);
  }, [id]);

  const fetchEventsByVenue = async (venueId) => {
    try {
      const response = await API.get(`/api/Event/venue/${venueId}`);
      setEvents(response.data.events);
      setVenueName(response.data.venueName); // Assuming backend returns venue name
    } catch (error) {
      console.error('Error fetching events by venue:', error);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await API.delete(`/api/Event/${eventId}`);
        fetchEventsByVenue(id); // Refresh the events list
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll />
      <h1 className="mb-4">Events at {venueName}</h1>
      <Row className="mb-3">
        <Col md={6}>
          <Link to="/events/add" className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Add New Event
          </Link>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.category?.name}</td>
              <td>{event.status}</td>
              <td>
                <Link to={`/events/edit/${event.id}`} className="btn btn-warning btn-sm me-2">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListEventsByVenue;
