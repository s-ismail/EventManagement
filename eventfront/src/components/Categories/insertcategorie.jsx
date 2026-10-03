import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import NavScroll from '../NavScroll';

const InsertCategory = () => {
  const [category, setCategory] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/Category', category);
      navigate('/categories');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <Container className="mt-4">
      <NavScroll/>
      <h1 className="mb-4">Add New Category</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={category.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </Container>
  );
};

export default InsertCategory;

