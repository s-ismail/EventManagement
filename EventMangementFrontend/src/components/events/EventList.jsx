import React from 'react';
import { Row, Col } from 'react-bootstrap';
import EventCard from './EventCard';

const EventList = ({ events, onGoClick }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {events.map(event => (
        <Col key={event.id}>
          <EventCard event={event} onGoClick={onGoClick} />
        </Col>
      ))}
    </Row>
  );
};

export default EventList;

