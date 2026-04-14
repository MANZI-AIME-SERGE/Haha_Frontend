import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService, supermarketService } from '../../services';
import { ProductCard, ProductGridSkeleton } from '../../components/ui';

const CustomerHome = () => {
  const [products, setProducts] = useState([]);
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const categories = [
    { name: 'Drinks', icon: '🧃', color: 'bg-blue-100 text-blue-600' },
    { name: 'Foods', icon: '🍎', color: 'bg-green-100 text-green-600' },
    { name: 'Hygiene', icon: '🧴', color: 'bg-pink-100 text-pink-600' },
    { name: 'Vegetables', icon: '🥬', color: 'bg-emerald-100 text-emerald-600' },
  ];

  return (
    <div className="animate-fade-in">
      <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome to HAHA
            </h1>
            <p className="text-blue-100">Shop from the best supermarkets in Rwanda</p>
          </div>

          <div className="flex items-center justify-center gap-8">
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
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/customer/products?category=${category.name}`}
                className={`p-6 rounded-xl ${category.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
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

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link
              to="/customer/products"
              className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
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
                <p className="text-gray-500">No products available yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Partner Supermarkets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supermarkets.map((supermarket) => (
              <div
                key={supermarket._id}
                className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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
                    <p className="text-sm text-gray-500">{supermarket.location}</p>
                  </div>
                </div>
                <Link
                  to={`/customer/products?supermarket=${supermarket._id}`}
                  className="mt-4 inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
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
    </div>
  );
};

export default CustomerHome;
