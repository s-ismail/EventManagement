// src/hooks/useEventAttendance.js
import { useState, useEffect } from 'react';
import userService from '../api/userService';  // Assuming you have an API service for fetching user data

export const useEventAttendance = () => {
  const [attendedEvents, setAttendedEvents] = useState([]);

  // Fetch attended events
  useEffect(() => {
    const fetchAttendedEvents = async () => {
      try {
        const response = await userService.getUserEvents();  // Fetching events (adjust API method if necessary)
        setAttendedEvents(response.data);  // Assuming response contains events data
      } catch (error) {
        console.error('Failed to fetch attended events', error);
      }
    };
    
    fetchAttendedEvents();
  }, []);

  // Cancel attendance on an event
  const cancelAttendance = async (eventId) => {
    try {
      await userService.cancelEventAttendance(eventId);  // Call API to cancel attendance
      setAttendedEvents(attendedEvents.filter(event => event.id !== eventId));  // Update state after cancellation
    } catch (error) {
      console.error('Failed to cancel attendance', error);
    }
  };

  return { attendedEvents, cancelAttendance };
};
