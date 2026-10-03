import API from './axios';

const vendorService = {
  getAllVendors: () => API.get('/vendors'),
  getVendor: (id) => API.get(`/vendors/${id}`),
  createVendor: (vendorData) => API.post('/vendors', vendorData),
  updateVendor: (id, vendorData) => API.put(`/vendors/${id}`, vendorData),
  deleteVendor: (id) => API.delete(`/vendors/${id}`),
};

export default vendorService;