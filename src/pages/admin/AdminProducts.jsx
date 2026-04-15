import { useState, useEffect } from 'react';
import { productService } from '../../services';
import { DashboardSkeleton } from '../../components/ui';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getProducts().catch(() => ({ data: { products: [] } }));
      setProducts(res.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ['all', 'Drinks', 'Foods', 'Hygiene', 'Vegetables', 'Other'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supermarketId?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category) => {
    const badges = {
      'Drinks': 'bg-blue-100 text-blue-700',
      'Foods': 'bg-orange-100 text-orange-700',
      'Hygiene': 'bg-green-100 text-green-700',
      'Vegetables': 'bg-emerald-100 text-emerald-700',
      'Other': 'bg-gray-100 text-gray-700',
    };
    return badges[category] || 'bg-gray-100 text-gray-700';
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' };
    if (stock <= 5) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  const inStockCount = products.filter(p => p.stock > 5).length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Total products in system: <span className="font-semibold text-green-600">{products.length}</span></p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{inStockCount}</p>
              <p className="text-sm text-gray-500">In Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{lowStockCount}</p>
              <p className="text-sm text-gray-500">Low Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{outOfStockCount}</p>
              <p className="text-sm text-gray-500">Out of Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              <p className="text-sm text-gray-500">Total Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, category, or supermarket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <div 
                key={product._id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative h-40 bg-gray-100">
                  <img
                    src={product.image ? `http://localhost:5000${product.image}` : 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryBadge(product.category)}`}>
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                      {stockStatus.label}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2 truncate">{product.supermarketId?.name || 'Unknown Store'}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">RWF {product.price?.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">{product.stock} units</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-scale-in">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <img
                  src={selectedProduct.image ? `http://localhost:5000${selectedProduct.image}` : 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop';
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryBadge(selectedProduct.category)}`}>
                    {selectedProduct.category}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStockStatus(selectedProduct.stock).color}`}>
                    {getStockStatus(selectedProduct.stock).label}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                <p className="text-3xl font-bold text-blue-600 mb-4">RWF {selectedProduct.price?.toLocaleString()}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Supermarket</p>
                      <p className="text-sm font-medium text-gray-900">{selectedProduct.supermarketId?.name || 'Unknown Store'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Stock Available</p>
                      <p className="text-sm font-medium text-gray-900">{selectedProduct.stock} units</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Product ID</p>
                      <p className="text-sm font-medium text-gray-900 font-mono">{selectedProduct._id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{selectedProduct.description || 'No description available'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
