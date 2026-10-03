import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ImageAlbum from '../components/layout/ImageAlbum';

const HomePage = () => {
  const images = [
    '/placeholder.svg?height=400&width=800',
    '/placeholder.svg?height=400&width=800',
    '/placeholder.svg?height=400&width=800',
  ];

  return (
    <>
      <Navbar />
      <Container className="my-4">
        <h1>Welcome to Event Management System</h1>
        <ImageAlbum images={images} />
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;

