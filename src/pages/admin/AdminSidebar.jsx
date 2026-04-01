import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiPackage, FiShoppingCart, FiUsers, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

const AdminSidebar = () => {
  const { logout } = useAuth()
  const menuItems = [
    { path: '/admin', icon: <FiHome />, label: 'Dashboard' },
    { path: '/admin/products', icon: <FiPackage />, label: 'Products' },
    { path: '/admin/orders', icon: <FiShoppingCart />, label: 'Orders' },
    { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
  ]

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
      <div className="p-6 border-b"><h2 className="text-2xl font-bold text-primary-600">HAHA Admin</h2><p className="text-sm text-gray-600">Supermarket Management</p></div>
      <nav className="flex-1 p-4"><ul className="space-y-2">{menuItems.map(item => (<li key={item.path}><NavLink to={item.path} className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}><span className="text-xl">{item.icon}</span><span>{item.label}</span></NavLink></li>))}</ul></nav>
      <div className="p-4 border-t"><button onClick={logout} className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-red-600 hover:bg-red-50"><FiLogOut /><span>Logout</span></button></div>
    </aside>
  )
}

export default AdminSidebar