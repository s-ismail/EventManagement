import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import API from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import NavScroll from '../NavScroll';

const ListEventsByCategory = () => {
  const { id } = useParams(); // Get category ID from route params
  const [events, setEvents] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetchEventsByCategory(id);
  }, [id]);

  const fetchEventsByCategory = async (categoryId) => {
    try {
      const response = await API.get(`/api/Event/category/${categoryId}`);
      setEvents(response.data.events);
      setCategoryName(response.data.categoryName); // Assuming backend returns category name
    } catch (error) {
      console.error('Error fetching events by category:', error);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await API.delete(`/api/Event/${eventId}`);
        fetchEventsByCategory(id); // Refresh the events list
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll />
      <h1 className="mb-4">Events in {categoryName}</h1>
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
            <th>Venue</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.venue?.name}</td>
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

export default ListEventsByCategory;
