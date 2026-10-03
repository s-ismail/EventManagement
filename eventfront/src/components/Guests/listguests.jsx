import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import NavScroll from '../NavScroll';

const ListGuests = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await API.get('/Guest');
      setGuests(response.data);
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this guest?')) {
      try {
        await API.delete(`/Guest/${id}`);
        fetchGuests();
      } catch (error) {
        console.error('Error deleting guest:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll/>
      <h1 className="mb-4">Guests</h1>
      <Link to="/guests/add" className="btn btn-primary mb-3">
        <FontAwesomeIcon icon={faPlus} /> Add New Guest
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.name}</td>
              <td>{guest.email}</td>
              <td>{guest.event?.name}</td>
              <td>
                <Link to={`/guests/edit/${guest.id}`} className="btn btn-warning btn-sm me-2">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(guest.id)}>
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

export default ListGuests;

