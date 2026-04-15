import api from './api';

export const analyticsService = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getAnalytics: (type) => api.get(`/analytics?type=${type}`),
  getSalesReport: (params) => api.get('/analytics/sales', { params }),
  getTopProducts: (limit) => api.get('/analytics/top-products', { params: { limit } }),
  getTopSupermarkets: (limit) => api.get('/analytics/top-supermarkets', { params: { limit } }),
};
