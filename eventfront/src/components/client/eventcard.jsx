import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarkerAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={event.imagePath || '/placeholder.jpg'} 
        alt={event.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-3">{event.name}</Card.Title>
        <Card.Text className="text-muted mb-2">
          <FontAwesomeIcon icon={faCalendar} className="me-2" />
          {new Date(event.date).toLocaleDateString()}
        </Card.Text>
        <Card.Text className="text-muted mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
          {event.venue?.name || 'Venue TBA'}
        </Card.Text>
        <Card.Text className="text-muted mb-3">
          <FontAwesomeIcon icon={faTag} className="me-2" />
          {event.category?.name || 'Uncategorized'}
        </Card.Text>
        <Button 
          as={Link} 
          to={`/events/${event.id}`} 
          variant="outline-primary" 
          className="mt-auto"
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;

