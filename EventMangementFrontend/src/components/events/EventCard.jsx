import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <Card>
      <Card.Img variant="top" src={event.imagePath || '/placeholder.svg'} />
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>
          Date: {new Date(event.date).toLocaleDateString()}
          <br />
          Venue: {event.venue.name}
        </Card.Text>
        <Link to={`/events/${event.id}`}>
          <Button variant="primary">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default EventCard;

