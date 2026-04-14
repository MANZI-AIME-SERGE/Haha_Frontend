import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService, productService, supermarketService } from '../../services';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    products: 0,
    supermarkets: 0,
    users: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, productsRes, supermarketsRes] = await Promise.all([
        orderService.getAllOrders(),
        productService.getProducts(),
        supermarketService.getSupermarkets(),
      ]);
      setStats({
        orders: ordersRes.orders?.length || 0,
        products: productsRes.products?.length || 0,
        supermarkets: supermarketsRes.supermarkets?.length || 0,
        users: 0,
      });
      setRecentOrders(ordersRes.orders?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Orders', value: stats.orders, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'bg-blue-500' },
    { label: 'Products', value: stats.products, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'bg-green-500' },
    { label: 'Supermarkets', value: stats.supermarkets, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'bg-purple-500' },
    { label: 'Users', value: stats.users, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'bg-yellow-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{loading ? '-' : stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">RWF {order.totalAmount?.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No orders yet.</p>
        )}
        <Link to="/admin/orders" className="block mt-4 text-center text-blue-600 hover:text-blue-700 font-medium">
          View All Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
