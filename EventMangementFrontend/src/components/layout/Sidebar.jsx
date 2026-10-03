import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <Nav className="flex-column sidebar">
      <Nav.Link as={Link} to="/user/dashboard">
        <FontAwesomeIcon icon={faCalendar} /> My Events
      </Nav.Link>
      <Nav.Link as={Link} to="/user/profile">
        <FontAwesomeIcon icon={faUser} /> Profile
      </Nav.Link>
      <Nav.Link as={Link} to="/user/settings">
        <FontAwesomeIcon icon={faCog} /> Settings
      </Nav.Link>
    </Nav>
  );
};

export default Sidebar;

