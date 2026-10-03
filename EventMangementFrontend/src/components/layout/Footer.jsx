import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-4">
      <Container className="text-center">
        <p>&copy; 2023 Event Management System. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;