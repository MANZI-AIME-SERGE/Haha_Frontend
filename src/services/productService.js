import api from './api'

export const productService = {
  getProducts: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString()
    const response = await api.get(`/products?${params}`)
    return response.data
  },
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },
  createProduct: async (productData) => {
    const formData = new FormData()
    Object.keys(productData).forEach(key => {
      if (key === 'image' && productData[key]) formData.append('image', productData[key])
      else formData.append(key, productData[key])
    })
    const response = await api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return response.data
  },
  updateProduct: async (id, productData) => {
    const formData = new FormData()
    Object.keys(productData).forEach(key => {
      if (key === 'image' && productData[key]) formData.append('image', productData[key])
      else formData.append(key, productData[key])
    })
    const response = await api.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    return response.data
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  }
}