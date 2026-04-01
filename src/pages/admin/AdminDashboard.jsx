import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../../services/userService'
import { productService } from '../../services/productService'
import { orderService } from '../../services/orderService'
import AdminSidebar from './AdminSidebar'
import { FiUsers, FiPackage, FiShoppingCart, FiDollarSign, FiArrowRight } from 'react-icons/fi'

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalCustomers: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await userService.getUsers()
        const products = await productService.getProducts({ limit: 1000 })
        const orders = await orderService.getAllOrders()
        const completed = orders.orders?.filter(o => o.status === 'Completed') || []
        const revenue = completed.reduce((sum, o) => sum + o.totalAmount, 0)
        setStats({ totalUsers: users.length, totalCustomers: users.filter(u => u.role === 'customer').length, totalProducts: products.total || 0, totalOrders: orders.total || 0, totalRevenue: revenue })
        setRecentOrders(orders.orders?.slice(0, 5) || [])
      } catch (error) { console.error(error) } finally { setLoading(false) }
    }
    fetchData()
  }, [])

  const statCards = [
    { title: 'Total Revenue', value: `RWF ${stats.totalRevenue.toLocaleString()}`, icon: <FiDollarSign className="text-3xl text-green-600" />, bg: 'bg-green-100' },
    { title: 'Total Orders', value: stats.totalOrders, icon: <FiShoppingCart className="text-3xl text-blue-600" />, bg: 'bg-blue-100' },
    { title: 'Total Products', value: stats.totalProducts, icon: <FiPackage className="text-3xl text-purple-600" />, bg: 'bg-purple-100' },
    { title: 'Total Customers', value: stats.totalCustomers, icon: <FiUsers className="text-3xl text-orange-600" />, bg: 'bg-orange-100' }
  ]

  if (loading) return <div className="flex h-screen"><AdminSidebar /><div className="flex-1 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div></div>

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid md:grid-cols-4 gap-6 mb-8">{statCards.map((s, i) => (<div key={i} className="bg-white rounded-lg shadow-lg p-6"><div className={`p-3 rounded-lg inline-block ${s.bg} mb-4`}>{s.icon}</div><h3 className="text-gray-600 text-sm">{s.title}</h3><p className="text-2xl font-bold">{s.value}</p></div>))}</div>
        <div className="bg-white rounded-lg shadow-lg"><div className="flex justify-between items-center p-6 border-b"><h2 className="text-xl font-bold">Recent Orders</h2><Link to="/admin/orders" className="text-primary-600 flex items-center">View All <FiArrowRight className="ml-1" /></Link></div><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left">Order ID</th><th className="px-6 py-3 text-left">Customer</th><th className="px-6 py-3 text-left">Date</th><th className="px-6 py-3 text-left">Amount</th><th className="px-6 py-3 text-left">Status</th></tr></thead><tbody>{recentOrders.map(o => (<tr key={o._id} className="border-t"><td className="px-6 py-4">#{o._id.slice(-8)}</td><td className="px-6 py-4">{o.userId?.name || 'Guest'}</td><td className="px-6 py-4">{new Date(o.createdAt).toLocaleDateString()}</td><td className="px-6 py-4">RWF {o.totalAmount?.toLocaleString()}</td><td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${o.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{o.status}</span></td></tr>))}</tbody></table></div></div>
      </div>
    </div>
  )
}

export default AdminDashboard