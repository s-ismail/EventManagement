import React, { createContext, useState, useEffect } from 'react';
import attendanceService from '../api/attendanceService';

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [attendedEvents, setAttendedEvents] = useState([]);

  useEffect(() => {
    fetchAttendedEvents();
  }, []);

  const fetchAttendedEvents = async () => {
    try {
      const response = await attendanceService.getAttendedEvents();
      setAttendedEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch attended events', error);
    }
  };

  const attendEvent = async (eventId) => {
    try {
      await attendanceService.attendEvent(eventId);
      fetchAttendedEvents(); // Refresh the list after attending
    } catch (error) {
      console.error('Failed to attend event', error);
    }
  };

  const cancelAttendance = async (eventId) => {
    try {
      await attendanceService.cancelAttendance(eventId);
      fetchAttendedEvents(); // Refresh the list after cancelling
    } catch (error) {
      console.error('Failed to cancel attendance', error);
    }
  };

  return (
    <AttendanceContext.Provider value={{ attendedEvents, attendEvent, cancelAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
};

 