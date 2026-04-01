import api from './api'

export const userService = {
  getUsers: async () => {
    const response = await api.get('/users')
    return response.data
  },
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },
  uploadProfileImage: async (formData) => {
    try {
      const response = await api.post('/users/upload-profile-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Upload failed' }
    }
  },
  getDashboardStats: async () => {
    const response = await api.get('/users/dashboard/stats')
    return response.data
  }
}