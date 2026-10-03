import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventList from '../components/events/EventList';
import { useEventAttendance } from '../hooks/useEventAttendance ';
const AttendedEventsPage = () => {
  const { attendedEvents, cancelAttendance } = useEventAttendance();

  return (
    <Container className="mt-4">
      <h1 className="mb-4">My Attended Events</h1>
      <Row>
        <Col>
          <EventList 
            events={attendedEvents} 
            onAttendClick={cancelAttendance} 
            attendedEvents={attendedEvents}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AttendedEventsPage;

