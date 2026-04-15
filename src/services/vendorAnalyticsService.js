import api from './api';

export const vendorAnalyticsService = {
  getStats: () => api.get('/vendor/analytics/stats'),
  getSales: (period) => api.get('/vendor/analytics/sales', { params: { period } }),
  getTopProducts: (limit) => api.get('/vendor/analytics/top-products', { params: { limit } }),
  getStockStatus: () => api.get('/vendor/analytics/stock'),
  getOrdersSummary: (period) => api.get('/vendor/analytics/orders-summary', { params: { period } }),
};
