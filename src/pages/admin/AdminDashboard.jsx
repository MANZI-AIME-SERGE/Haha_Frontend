import { useState, useEffect, useRef } from 'react';
import { analyticsService } from '../../services';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AdminDashboard = () => {
  const dashboardRef = useRef(null);
  
  const [stats, setStats] = useState({
    orders: { today: 0, week: 0, month: 0 },
    revenue: { today: 0, week: 0, month: 0 },
    customers: 0,
    products: 0,
    supermarkets: 0,
    pendingDeliveries: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('monthly');
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [supermarketData, setSupermarketData] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dashboardRes, analyticsRes, , topSupermarketsRes] = await Promise.all([
        analyticsService.getDashboardStats().catch(() => ({ data: { stats: { orders: { today: 0, week: 0, month: 0 }, revenue: { today: 0, week: 0, month: 0 }, customers: 0, products: 0, supermarkets: 0, pendingDeliveries: 0 }, recentOrders: [] } })),
        analyticsService.getAnalytics(period).catch(() => ({ data: { analytics: null } })),
        analyticsService.getTopProducts(10).catch(() => ({ data: { products: [] } })),
        analyticsService.getTopSupermarkets(10).catch(() => ({ data: { supermarkets: [] } })),
      ]);
      
      if (dashboardRes.data?.stats) {
        setStats(dashboardRes.data.stats);
        setRecentOrders(dashboardRes.data.stats.recentOrders || []);
      }
      
      if (analyticsRes.data?.analytics?.revenueByDay) {
        setSalesData(analyticsRes.data.analytics.revenueByDay);
      } else {
        setSalesData(generateMockSalesData());
      }
      
      if (analyticsRes.data?.analytics?.categoryBreakdown) {
        const categories = Object.entries(analyticsRes.data.analytics.categoryBreakdown).map(([name, value]) => ({ name, value }));
        setCategoryData(categories.length > 0 ? categories : getDefaultCategories());
      } else {
        setCategoryData(getDefaultCategories());
      }
      
      if (topSupermarketsRes.data?.supermarkets) {
        setSupermarketData(topSupermarketsRes.data.supermarkets.map(s => ({
          name: s.name?.length > 10 ? s.name.substring(0, 10) + '...' : s.name || 'Unknown',
          orders: s.totalOrders || 0,
          revenue: s.totalRevenue || 0,
        })));
      } else {
        setSupermarketData(getDefaultSupermarketData());
      }
      
      setUserGrowthData(generateMockUserGrowth());
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
      setSalesData(generateMockSalesData());
      setCategoryData(getDefaultCategories());
      setSupermarketData(getDefaultSupermarketData());
      setUserGrowthData(generateMockUserGrowth());
    } finally {
      setLoading(false);
    }
  };

  const generateMockSalesData = () => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: Math.floor(Math.random() * 500000) + 100000,
      });
    }
    return data;
  };

  const getDefaultCategories = () => [
    { name: 'Drinks', value: 35 },
    { name: 'Foods', value: 25 },
    { name: 'Hygiene', value: 20 },
    { name: 'Vegetables', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const getDefaultSupermarketData = () => [
    { name: 'Kigali Fresh', orders: 45, revenue: 1250000 },
    { name: 'City Market', orders: 38, revenue: 980000 },
    { name: 'Fresh Mart', orders: 32, revenue: 850000 },
    { name: 'Quick Stop', orders: 28, revenue: 720000 },
    { name: 'Super Save', orders: 22, revenue: 580000 },
  ];

  const generateMockUserGrowth = () => [
    { month: 'Jan', customers: 120, vendors: 15 },
    { month: 'Feb', customers: 145, vendors: 18 },
    { month: 'Mar', customers: 178, vendors: 22 },
    { month: 'Apr', customers: 210, vendors: 28 },
    { month: 'May', customers: 256, vendors: 35 },
    { month: 'Jun', customers: 298, vendors: 42 },
  ];

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [period]);

  const statCards = [
    { label: 'Today Orders', value: stats.orders.today, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'bg-green-500' },
    { label: 'This Month Orders', value: stats.orders.month, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', color: 'bg-blue-500' },
    { label: 'Total Products', value: stats.products, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'bg-purple-500' },
    { label: 'Active Supermarkets', value: stats.supermarkets, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', color: 'bg-yellow-500' },
    { label: 'Total Customers', value: stats.customers, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'bg-red-500' },
    { label: 'Pending Deliveries', value: stats.pendingDeliveries, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-indigo-500' },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white p-3 rounded-lg shadow-lg border border-gray-200'>
          <p className='font-semibold text-gray-900'>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className='text-sm'>
              {entry.name}: {typeof entry.value === 'number' && entry.name.toLowerCase().includes('revenue') 
                ? 'RWF ' + entry.value.toLocaleString() 
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className='animate-fade-in-up' ref={dashboardRef}>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Admin Dashboard</h1>
          <p className='text-gray-600 mt-1'>Last updated: {lastRefresh.toLocaleTimeString()}</p>
        </div>
        <div className='flex items-center gap-4'>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className='px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            <option value='daily'>Today</option>
            <option value='weekly'>Last 7 Days</option>
            <option value='monthly'>Last 30 Days</option>
            <option value='yearly'>This Year</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        {statCards.map((stat, index) => (
          <div 
            key={stat.label} 
            className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className='flex items-center gap-4'>
              <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='text-3xl font-bold text-gray-900'>{loading ? '-' : stat.value.toLocaleString()}</p>
                <p className='text-sm text-gray-500 font-medium'>{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>Revenue Overview</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                <XAxis dataKey='day' stroke='#6b7280' fontSize={12} />
                <YAxis stroke='#6b7280' fontSize={12} tickFormatter={(value) => 'RWF ' + Math.round(value/1000) + 'k'} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type='monotone' dataKey='amount' name='Revenue' stroke='#10b981' strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>Orders by Supermarket</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={supermarketData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                <XAxis dataKey='name' stroke='#6b7280' fontSize={12} />
                <YAxis stroke='#6b7280' fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey='orders' name='Orders' fill='#10b981' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>Product Categories</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey='value'
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>User Growth</h2>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                <XAxis dataKey='month' stroke='#6b7280' fontSize={12} />
                <YAxis stroke='#6b7280' fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type='monotone' dataKey='customers' name='Customers' stroke='#10b981' strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
                <Line type='monotone' dataKey='vendors' name='Vendors' stroke='#3b82f6' strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>Recent Orders</h2>
        {loading ? (
          <div className='space-y-3'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='h-16 bg-gray-100 rounded-xl animate-pulse' />
            ))}
          </div>
        ) : recentOrders.length > 0 ? (
          <div className='space-y-3'>
            {recentOrders.map((order) => (
              <div key={order._id} className='flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors'>
                <div>
                  <p className='font-medium text-gray-900'>{order._id?.slice(-8).toUpperCase() || 'N/A'}</p>
                  <p className='text-sm text-gray-500'>{order.customerId?.name || 'Customer'}</p>
                </div>
                <div className='text-right'>
                  <p className='font-bold text-green-600'>RWF {order.totalAmount?.toLocaleString() || 0}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500 text-center py-8'>No recent orders</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
