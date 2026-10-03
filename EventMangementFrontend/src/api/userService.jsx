import API from './axios';

const userService = {
  register: (userData) => API.post('/users/register', userData),
  login: (credentials) => API.post('/users/login', credentials),
  getProfile: () => API.get('/users/profile'),
  updateProfile: (userData) => API.put('/users/profile', userData),
  getUserEvents: () => API.get('/users/events'),
};

export default userService;

