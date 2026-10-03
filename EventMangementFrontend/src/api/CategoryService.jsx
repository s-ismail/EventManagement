import API from './axios';

const categoryService = {
  getAllCategories: () => API.get('/categories'),
  getCategory: (id) => API.get(`/categories/${id}`),
  createCategory: (categoryData) => API.post('/categories', categoryData),
  updateCategory: (id, categoryData) => API.put(`/categories/${id}`, categoryData),
  deleteCategory: (id) => API.delete(`/categories/${id}`),
};

export default categoryService;