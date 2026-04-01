import api from './api'

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  },
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  updateProfile: async (userData) => {
    const response = await api.put(`/users/${userData.id}`, userData)
    if (response.data) {
      const currentUser = JSON.parse(localStorage.getItem('user'))
      const updatedUser = { ...currentUser, ...response.data }
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
    return response.data
  }
}