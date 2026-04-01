import api from './api'

export const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to create order' }
    }
  },
  getMyOrders: async () => {
    const response = await api.get('/orders/myorders')
    return response.data
  },
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`)
    return response.data
  },
  getAllOrders: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString()
    const response = await api.get(`/orders?${params}`)
    return response.data
  },
  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status })
    return response.data
  }
}