import React, { useState, useEffect } from 'react';
import UserEventList from '../../components/user/UserEventList';
import eventService from '../../api/eventService';

const UserEventsPage = () => {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await eventService.getUserEvents();
        setUserEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch user events', error);
      }
    };
    fetchUserEvents();
  }, []);

  const handleCancelAttendance = async (eventId) => {
    try {
      await eventService.cancelAttendance(eventId);
      setUserEvents(userEvents.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Failed to cancel attendance', error);
    }
  };

  return (
    <div className="user-events-page container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">My Events</h1>
      <UserEventList events={userEvents} onCancelAttendance={handleCancelAttendance} />
    </div>
  );
};

export default UserEventsPage;

