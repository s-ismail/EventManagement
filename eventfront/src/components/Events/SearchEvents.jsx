import React, { useState } from 'react';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import NavScroll from '../NavScroll';

const SearchEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchKeyword.trim() === '') {
      alert('Please enter a keyword to search.');
      return;
    }
    try {
      const response = await API.get(`/api/Event/search?keyword=${searchKeyword}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error searching events:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await API.delete(`/api/Event/${id}`);
        setEvents(events.filter((event) => event.id !== id)); // Remove deleted event from list
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll />
      <h1 className="mb-4">Search Events</h1>
      <Row className="mb-3">
        <Col md={8}>
          <Form onSubmit={handleSearch}>
            <Form.Group as={Row}>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter keyword to search..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </Col>
              <Col sm={4}>
                <Button type="submit" variant="primary">
                  <FontAwesomeIcon icon={faSearch} /> Search
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
        <Col md={4}>
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
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
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
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No events found for the search keyword.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default SearchEvents;
