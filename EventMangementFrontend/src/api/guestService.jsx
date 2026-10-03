import API from './axios';

const guestService = {
  getAllGuests: () => API.get('/guest'),
  getGuest: (id) => API.get(`/guest/${id}`),
  createGuest: (guestData) => API.post('/guest', guestData),
  updateGuest: (id, guestData) => API.put(`/guest/${id}`, guestData),
  deleteGuest: (id) => API.delete(`/guest/${id}`),
};

export default guestService;