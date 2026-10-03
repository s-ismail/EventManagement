import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import API from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import NavScroll from '../NavScroll';

const ListEventsByDate = () => {
  const { date } = useParams(); // Get the date from route params
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (date) {
      fetchEventsByDate(date);
    }
  }, [date]);

  const fetchEventsByDate = async (selectedDate) => {
    try {
      const response = await API.get(`/api/Event/date/${selectedDate}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events by date:', error);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await API.delete(`/api/Event/${eventId}`);
        fetchEventsByDate(date); // Refresh the events list
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll />
      <h1 className="mb-4">Events on {new Date(date).toLocaleDateString()}</h1>
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
            <th>Venue</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.venue?.name}</td>
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

export default ListEventsByDate;
