import React, { createContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) setCartItems(JSON.parse(storedCart))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item._id === product._id)
      if (existing) {
        toast.success(`Updated ${product.name} quantity`)
        return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item)
      }
      toast.success(`Added ${product.name} to cart`)
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    const item = cartItems.find(i => i._id === productId)
    if (item) toast.success(`Removed ${item.name}`)
    setCartItems(prev => prev.filter(item => item._id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId)
    setCartItems(prev => prev.map(item => item._id === productId ? { ...item, quantity } : item))
  }

  const clearCart = () => {
    setCartItems([])
    toast.success('Cart cleared')
  }

  const getCartTotal = () => cartItems.reduce((total, item) => {
    const price = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price
    return total + (price * item.quantity)
  }, 0)

  const getCartCount = () => cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  )
}