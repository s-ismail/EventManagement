import API from './axios';

const eventService = {
  getAllEvents: () => API.get('/events'),
  getEvent: (id) => API.get(`/events/${id}`),
  createEvent: (eventData) => API.post('/events', eventData),
  updateEvent: (id, eventData) => API.put(`/events/${id}`, eventData),
  deleteEvent: (id) => API.delete(`/events/${id}`),
  attendEvent: (id) => API.post(`/events/${id}/attend`),
  cancelAttendance: (id) => API.delete(`/events/${id}/attend`),
};

export default eventService;

