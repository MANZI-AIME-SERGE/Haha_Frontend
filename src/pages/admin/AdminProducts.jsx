import { useState, useEffect } from 'react';
import { productService } from '../../services';
import { DashboardSkeleton } from '../../components/ui';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAdminProducts();
      setProducts(res.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const pollInterval = setInterval(fetchProducts, 15000);
    return () => clearInterval(pollInterval);
  }, []);

  const categories = ['Drinks', 'Foods', 'Hygiene', 'Vegetables', 'Other'];

  const getCategoryCount = (category) => {
    return products.filter(p => p.category === category).length;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Drinks': { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'bg-blue-500' },
      'Foods': { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'bg-orange-500' },
      'Hygiene': { bg: 'bg-green-100', text: 'text-green-700', icon: 'bg-green-500' },
      'Vegetables': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: 'bg-emerald-500' },
      'Other': { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'bg-gray-500' },
    };
    return colors[category] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'bg-gray-500' };
  };

  const inStockCount = products.filter(p => p.stock > 0).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;

  const getCategoryIcon = (category) => {
    const icons = {
      'Drinks': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      'Foods': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      'Hygiene': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      'Vegetables': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      'Other': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    };
    return icons[category] || icons['Other'];
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Overview</h1>
          <p className="text-gray-600 mt-1">Monitor all products across supermarkets</p>
        </div>
        <button
          onClick={fetchProducts}
          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Available Products</p>
              <p className="text-4xl font-bold mt-2">{inStockCount}</p>
              <p className="text-green-100 text-xs mt-1">In stock</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Low Stock</p>
              <p className="text-4xl font-bold mt-2">{lowStockCount}</p>
              <p className="text-yellow-100 text-xs mt-1">Need restock soon</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Out of Stock</p>
              <p className="text-4xl font-bold mt-2">{outOfStockCount}</p>
              <p className="text-red-100 text-xs mt-1">Needs attention</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Total Products */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Products on Platform</p>
            <p className="text-6xl font-bold text-gray-900 mt-2">{products.length}</p>
            <p className="text-gray-400 text-sm mt-1">across all categories</p>
          </div>
        </div>
      </div>

      {/* Category Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Products by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const color = getCategoryColor(category);
            const count = getCategoryCount(category);
            return (
              <div
                key={category}
                className={`p-6 rounded-xl border-2 ${color.bg} border-transparent`}
              >
                <div className={`w-12 h-12 ${color.icon} rounded-xl flex items-center justify-center mb-4 text-white`}>
                  {getCategoryIcon(category)}
                </div>
                <p className="text-3xl font-bold text-gray-900">{count}</p>
                <p className={`text-sm font-medium ${color.text} mt-1`}>{category}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-700">View Only Mode</p>
            <p className="text-sm text-gray-500 mt-1">Product management (adding, editing, deleting) is handled by vendors in their own dashboard. This overview shows real-time statistics from all products across supermarkets.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
