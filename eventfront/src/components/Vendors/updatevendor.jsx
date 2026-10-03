import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api/axios';
import NavScroll from '../NavScroll';

const UpdateVendor = () => {
  const [vendor, setVendor] = useState({ name: '', serviceType: '', contactInfo: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchVendor();
  }, []);

  const fetchVendor = async () => {
    try {
      const response = await API.get(`/api/Vendor/${id}`);
      setVendor(response.data);
    } catch (error) {
      console.error('Error fetching vendor:', error);
    }
  };

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/Vendor/${id}`, vendor);
      navigate('/vendors');
    } catch (error) {
      console.error('Error updating vendor:', error);
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll/>
      <h1 className="mb-4">Update Vendor</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={vendor.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Service Type</Form.Label>
          <Form.Control
            type="text"
            name="serviceType"
            value={vendor.serviceType}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contact Info</Form.Label>
          <Form.Control
            type="text"
            name="contactInfo"
            value={vendor.contactInfo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Vendor
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateVendor;

