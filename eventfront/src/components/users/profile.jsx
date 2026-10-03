import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import API from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faBirthdayCake, faEdit } from '@fortawesome/free-solid-svg-icons';
import NavScroll from '../NavScroll';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get('/users/profile');
      setUser(response.data);
      setUpdatedUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put('/users/profile', updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again later.');
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <NavScroll/>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-center mb-4">
                <img
                  src={user.profilePictureUrl || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <h2 className="mt-3">{user.fullName}</h2>
                <p className="text-muted">{user.role}</p>
              </div>
              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={updatedUser.fullName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={updatedUser.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={updatedUser.dateOfBirth?.split('T')[0]}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="me-2">
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </Form>
              ) : (
                <>
                  <Row className="mb-3">
                    <Col sm={1}><FontAwesomeIcon icon={faUser} /></Col>
                    <Col sm={11}>{user.username}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={1}><FontAwesomeIcon icon={faEnvelope} /></Col>
                    <Col sm={11}>{user.email}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={1}><FontAwesomeIcon icon={faBirthdayCake} /></Col>
                    <Col sm={11}>{new Date(user.dateOfBirth).toLocaleDateString()}</Col>
                  </Row>
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    <FontAwesomeIcon icon={faEdit} className="me-2" />
                    Edit Profile
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

