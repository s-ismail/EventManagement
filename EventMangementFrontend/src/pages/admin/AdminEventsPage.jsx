import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import eventService from '../../api/eventService';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await eventService.getAllEvents();
      setEvents(res.data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await eventService.deleteEvent(id);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.log("Error deleting event:", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (isLoading) {
    return <center><ReactLoading type='spokes' color='blue' height={'8%'} width={'8%'} /></center>;
  }

  if (isError) {
    return <div>Network Error. Please try again later.</div>;
  }

  return (
    <div>
      <Link to="/admin/events/add">
        <Button variant="success" size="sm" className="mb-3">
          <i className="fa-solid fa-plus"></i> New Event
        </Button>
      </Link>
      <h1>Events List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td><td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.venue.name}</td>
              <td>{event.category.name}</td>
              <td>
                <Link to={`/admin/events/edit/${event.id}`}>
                  <Button variant="warning" size="sm" className="me-2">
                    <i className="fa-solid fa-pen-to-square"></i> Update
                  </Button>
                </Link>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDelete(event.id)}
                >
                  <i className="fa-solid fa-trash"></i> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminEventsPage;

 