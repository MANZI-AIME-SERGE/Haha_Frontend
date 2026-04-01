import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import { useTheme } from '../../hooks/useTheme'
import { FiShoppingCart, FiUser, FiLogOut, FiSun, FiMoon, FiMenu, FiX, FiSearch } from 'react-icons/fi'
import { MdAdminPanelSettings } from 'react-icons/md'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { user, logout } = useAuth()
  const { getCartCount } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`)
      setSearchTerm('')
      setIsMenuOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const cartCount = getCartCount()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">HAHA</span>
              <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">Supermarket</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 px-3 py-2 text-sm font-medium">Home</Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 px-3 py-2 text-sm font-medium">Products</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 px-3 py-2 text-sm font-medium">About</Link>
            
            <form onSubmit={handleSearch} className="relative">
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600" />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400"><FiSearch /></button>
            </form>

            <Link to="/cart" className="relative">
              <FiShoppingCart className="text-2xl text-gray-700 dark:text-gray-300 hover:text-primary-600" />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}
            </Link>

            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              {isDark ? <FiSun /> : <FiMoon />}
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                  <FiUser /><span>{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">My Orders</Link>
                  {user.role === 'admin' && <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"><MdAdminPanelSettings className="inline mr-2" />Admin</Link>}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="btn-secondary text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-sm">Sign Up</Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <Link to="/cart" className="relative"><FiShoppingCart className="text-2xl" />{cartCount > 0 && <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}</Link>
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">{isDark ? <FiSun /> : <FiMoon />}</button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">{isMenuOpen ? <FiX /> : <FiMenu />}</button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link to="/about" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>About</Link>
            {user ? (
              <>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                {user.role === 'admin' && <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">Admin</Link>}
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar