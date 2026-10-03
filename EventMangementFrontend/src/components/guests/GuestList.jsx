import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import guestService from '../../api/guestService';

const GuestList = ({ eventId }) => {
  const [guests, setGuests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(null);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await guestService.getAllGuests();
      setGuests(response.data.filter(guest => guest.eventId === eventId));
    } catch (error) {
      console.error('Failed to fetch guests', error);
    }
  };

  const handleAddGuest = async (guestData) => {
    try {
      await guestService.createGuest({ ...guestData, eventId });
      fetchGuests();
    } catch (error) {
      console.error('Failed to add guest', error);
    }
  };

  const handleUpdateGuest = async (id, guestData) => {
    try {
      await guestService.updateGuest(id, guestData);
      fetchGuests();
    } catch (error) {
      console.error('Failed to update guest', error);
    }
  };

  const handleDeleteGuest = async (id) => {
    try {
      await guestService.deleteGuest(id);
      fetchGuests();
    } catch (error) {
      console.error('Failed to delete guest', error);
    }
  };

  const openModal = (guest = null) => {
    setCurrentGuest(guest);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentGuest(null);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const guestData = {
      name: formData.get('name'),
      email: formData.get('email'),
      rsvpStatus: formData.get('rsvpStatus'),
    };

    if (currentGuest) {
      handleUpdateGuest(currentGuest.id, guestData);
    } else {
      handleAddGuest(guestData);
    }
    closeModal();
  };

  return (
    <div>
      <h2>Guest List</h2>
      <Button variant="primary" onClick={() => openModal()}>Add Guest</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>RSVP Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(guest => (
            <tr key={guest.id}>
              <td>{guest.name}</td>
              <td>{guest.email}</td>
              <td>{guest.rsvpStatus}</td>
              <td>
                <Button variant="info" onClick={() => openModal(guest)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteGuest(guest.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentGuest ? 'Edit Guest' : 'Add Guest'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" defaultValue={currentGuest?.name} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" defaultValue={currentGuest?.email} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>RSVP Status</Form.Label>
              <Form.Control as="select" name="rsvpStatus" defaultValue={currentGuest?.rsvpStatus}>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Declined">Declined</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit">{currentGuest ? 'Update' : 'Add'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GuestList;

