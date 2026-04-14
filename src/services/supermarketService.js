import api from './api';

export const supermarketService = {
  getSupermarkets: async () => {
    const response = await api.get('/supermarkets');
    return response.data;
  },

  getSupermarketById: async (id) => {
    const response = await api.get(`/supermarkets/${id}`);
    return response.data;
  },

  getMySupermarket: async () => {
    const response = await api.get('/supermarkets/my-supermarket/me');
    return response.data;
  },

  registerSupermarket: async (formData) => {
    const response = await api.post('/supermarkets/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
