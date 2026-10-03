import React, { createContext, useState, useEffect } from 'react';
import API from '../api/axios';

export const EventAttendanceContext = createContext();

export const EventAttendanceProvider = ({ children }) => {
  const [attendedEvents, setAttendedEvents] = useState([]);

  useEffect(() => {
    fetchAttendedEvents();
  }, []);

  const fetchAttendedEvents = async () => {
    try {
      const response = await API.get('/events/attended');
      setAttendedEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch attended events', error);
    }
  };

  const attendEvent = async (eventId) => {
    try {
      await API.post(`/events/${eventId}/attend`);
      fetchAttendedEvents();
    } catch (error) {
      console.error('Failed to attend event', error);
    }
  };

  const cancelAttendance = async (eventId) => {
    try {
      await API.delete(`/events/${eventId}/attend`);
      fetchAttendedEvents();
    } catch (error) {
      console.error('Failed to cancel attendance', error);
    }
  };

  return (
    <EventAttendanceContext.Provider value={{ attendedEvents, attendEvent, cancelAttendance }}>
      {children}
    </EventAttendanceContext.Provider>
  );
};

 