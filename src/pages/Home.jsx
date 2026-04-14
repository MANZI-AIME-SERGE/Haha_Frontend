import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService, supermarketService } from '../services';
import { ProductCard, ProductGridSkeleton } from '../components/ui';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, supermarketsRes] = await Promise.all([
        productService.getProducts(),
        supermarketService.getSupermarkets(),
      ]);
      setProducts(productsRes.products?.slice(0, 8) || []);
      setSupermarkets(supermarketsRes.supermarkets?.slice(0, 4) || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const categories = [
    { name: 'Drinks', icon: '🧃', color: 'bg-blue-100 text-blue-600' },
    { name: 'Foods', icon: '🍎', color: 'bg-green-100 text-green-600' },
    { name: 'Hygiene', icon: '🧴', color: 'bg-pink-100 text-pink-600' },
    { name: 'Vegetables', icon: '🥬', color: 'bg-emerald-100 text-emerald-600' },
  ];

  return (
    <div className="animate-fade-in">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Now serving 20+ supermarkets</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Shop from the Best
                <span className="block text-yellow-400">Supermarkets in Rwanda</span>
              </h1>
              
              <p className="text-lg text-blue-100 max-w-lg">
                Compare prices, browse products, and order from multiple stores in one place. 
                Save time, save money, and enjoy convenient delivery across Rwanda.
              </p>
              
              <form onSubmit={handleSearch} className="flex gap-3 max-w-lg">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full px-5 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  Search
                </button>
              </form>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-sm text-blue-200">Products</p>
                </div>
                <div className="w-px h-12 bg-blue-400/30" />
                <div className="text-center">
                  <p className="text-3xl font-bold">20+</p>
                  <p className="text-sm text-blue-200">Supermarkets</p>
                </div>
                <div className="w-px h-12 bg-blue-400/30" />
                <div className="text-center">
                  <p className="text-3xl font-bold">1000+</p>
                  <p className="text-sm text-blue-200">Customers</p>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-blue-500/20 rounded-3xl" />
              <img
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=500&fit=crop"
                alt="Supermarket"
                className="relative rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
              <p className="text-gray-600 mt-1">Find what you need quickly</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className={`p-6 rounded-xl ${category.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-lg group-hover:scale-105 transition-transform">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600 mt-1">Handpicked items just for you</p>
            </div>
            <Link
              to="/products"
              className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <ProductGridSkeleton count={4} />
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No products available yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Partner Supermarkets</h2>
            <p className="text-gray-600 mt-2">Quality stores you can trust</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supermarkets.map((supermarket, index) => (
              <div
                key={supermarket._id}
                className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`http://localhost:5000${supermarket.logo}`}
                    alt={supermarket.name}
                    className="w-14 h-14 rounded-full object-cover bg-gray-100"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/56?text=Store';
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{supermarket.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {supermarket.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{supermarket.description}</p>
                <Link
                  to={`/products?supermarket=${supermarket._id}`}
                  className="mt-4 inline-flex items-center text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
                >
                  View Products
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Are you a supermarket owner?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join our platform and reach more customers across Rwanda. Manage your products, 
            track orders, and grow your business with HAHA.
          </p>
          <Link
            to="/register?role=vendor"
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg cursor-pointer"
          >
            Register as Vendor
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
