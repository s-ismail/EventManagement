import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <Nav className="flex-column">
      <Nav.Link as={Link} to="/admin/events">Manage Events</Nav.Link>
      <Nav.Link as={Link} to="/admin/categories">Manage Categories</Nav.Link>
      <Nav.Link as={Link} to="/admin/venues">Manage Venues</Nav.Link>
      <Nav.Link as={Link} to="/admin/vendors">Manage Vendors</Nav.Link>
      <Nav.Link as={Link} to="/admin/users">Manage Users</Nav.Link>
    </Nav>
  );
};

export default AdminSidebar;

