import API from './axios';

const venueService = {
  getAllVenues: () => API.get('/venues'),
  getVenue: (id) => API.get(`/venues/${id}`),
  createVenue: (venueData) => API.post('/venues', venueData),
  updateVenue: (id, venueData) => API.put(`/venues/${id}`, venueData),
  deleteVenue: (id) => API.delete(`/venues/${id}`),
};

export default venueService;