import { useState, useEffect } from 'react';
import { DashboardSkeleton } from '../../components/ui';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const systemData = [
    { time: '00:00', cpu: 25, memory: 42, requests: 120 },
    { time: '04:00', cpu: 18, memory: 38, requests: 85 },
    { time: '08:00', cpu: 45, memory: 55, requests: 340 },
    { time: '12:00', cpu: 72, memory: 68, requests: 580 },
    { time: '16:00', cpu: 65, memory: 62, requests: 490 },
    { time: '20:00', cpu: 38, memory: 48, requests: 260 },
    { time: '24:00', cpu: 22, memory: 40, requests: 150 },
  ];

  const apiEndpointsData = [
    { endpoint: '/api/auth/login', requests: 1250, avgTime: '45ms', errors: 12 },
    { endpoint: '/api/products', requests: 2100, avgTime: '78ms', errors: 8 },
    { endpoint: '/api/orders', requests: 890, avgTime: '120ms', errors: 5 },
    { endpoint: '/api/users', requests: 560, avgTime: '55ms', errors: 3 },
    { endpoint: '/api/supermarkets', requests: 720, avgTime: '65ms', errors: 4 },
  ];

  const statusDistribution = [
    { name: 'Success (2xx)', value: 4520, color: '#10b981' },
    { name: 'Redirect (3xx)', value: 320, color: '#3b82f6' },
    { name: 'Client Error (4xx)', value: 245, color: '#f59e0b' },
    { name: 'Server Error (5xx)', value: 45, color: '#ef4444' },
  ];

  const mockLogs = [
    { id: 1, level: 'info', message: 'User authentication successful', endpoint: '/api/auth/login', time: '2 mins ago', user: 'john@example.com' },
    { id: 2, level: 'warning', message: 'High memory usage detected', endpoint: '/system', time: '5 mins ago', user: 'System' },
    { id: 3, level: 'error', message: 'Database connection timeout', endpoint: '/api/orders', time: '8 mins ago', user: 'N/A' },
    { id: 4, level: 'info', message: 'New vendor registration', endpoint: '/api/auth/register', time: '12 mins ago', user: 'vendor@example.com' },
    { id: 5, level: 'info', message: 'Order created successfully', endpoint: '/api/orders', time: '15 mins ago', user: 'customer@example.com' },
    { id: 6, level: 'warning', message: 'Rate limit approaching', endpoint: '/api/products', time: '18 mins ago', user: 'N/A' },
    { id: 7, level: 'error', message: 'Invalid token provided', endpoint: '/api/auth/login', time: '22 mins ago', user: 'unknown' },
    { id: 8, level: 'info', message: 'Product added to catalog', endpoint: '/api/products', time: '25 mins ago', user: 'vendor@example.com' },
    { id: 9, level: 'info', message: 'Password reset requested', endpoint: '/api/auth/forgot-password', time: '30 mins ago', user: 'user@example.com' },
    { id: 10, level: 'warning', message: 'Slow query detected', endpoint: '/api/supermarkets', time: '35 mins ago', user: 'N/A' },
  ];

  const getLogLevelBadge = (level) => {
    const badges = {
      info: 'bg-blue-100 text-blue-700',
      warning: 'bg-yellow-100 text-yellow-700',
      error: 'bg-red-100 text-red-700',
      success: 'bg-green-100 text-green-700',
    };
    return badges[level] || 'bg-gray-100 text-gray-700';
  };

  const getLogLevelIcon = (level) => {
    if (level === 'error') {
      return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
    }
    if (level === 'warning') {
      return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
    return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Analytics</h1>
          <p className="text-gray-600 mt-1">Monitor system performance and API activity</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1h">Last 1 hour</option>
          <option value="6h">Last 6 hours</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">CPU Usage</span>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">45%</p>
          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Normal</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">Memory Usage</span>
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">58%</p>
          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '58%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">2.9 GB / 5 GB</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">Active Users</span>
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">127</p>
          <p className="text-xs text-green-600 mt-2">+12% from last hour</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">API Requests</span>
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">5.2K</p>
          <p className="text-xs text-gray-500 mt-2">Last 24 hours</p>
        </div>
      </div>

      {/* System Performance Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={systemData}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="cpu" name="CPU %" stroke="#3b82f6" fill="url(#colorCpu)" strokeWidth={2} />
              <Area type="monotone" dataKey="memory" name="Memory %" stroke="#10b981" fill="url(#colorMemory)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* API Stats and Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* API Endpoints Performance */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API Endpoints Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase pb-3">Endpoint</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase pb-3">Requests</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase pb-3">Avg Time</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase pb-3">Errors</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpointsData.map((api, index) => (
                  <tr key={index} className="border-b border-gray-50 last:border-0">
                    <td className="py-3">
                      <code className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{api.endpoint}</code>
                    </td>
                    <td className="py-3 text-gray-900 font-medium">{api.requests.toLocaleString()}</td>
                    <td className="py-3 text-gray-600">{api.avgTime}</td>
                    <td className="py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${api.errors > 10 ? 'bg-red-100 text-red-700' : api.errors > 5 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {api.errors}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HTTP Status Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Response Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {statusDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">System Logs</h2>
          <div className="flex items-center gap-2">
            <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Levels</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Download Logs
            </button>
          </div>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {mockLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getLogLevelBadge(log.level)}`}>
                <span className={getLogLevelBadge(log.level).replace('bg-', 'text-').replace('-100', '-600')}>
                  {getLogLevelIcon(log.level)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${getLogLevelBadge(log.level)}`}>
                    {log.level.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{log.time}</span>
                </div>
                <p className="text-sm text-gray-900">{log.message}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <span className="font-mono">{log.endpoint}</span>
                  <span>{log.user !== 'N/A' ? log.user : 'System'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
