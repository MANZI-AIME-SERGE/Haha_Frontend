import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { productService, supermarketService } from '../services';
import { ProductGridSkeleton } from '../components/ui';
import LandingProductCard from '../components/ui/LandingProductCard';
import LoginModal from '../components/ui/LoginModal';
import heroImage from '../assets/hello.png';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  const heroRef = useRef(null);
  const supermarketsRef = useRef(null);
  const productsRef = useRef(null);
  const vendorRef = useRef(null);

  useEffect(() => {
    fetchData();
    const pollInterval = setInterval(fetchProducts, 10000);
    return () => clearInterval(pollInterval);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({ ...prev, [entry.target.dataset.section]: true }));
        }
      });
    }, observerOptions);

    const sections = [heroRef, supermarketsRef, productsRef, vendorRef];
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [supermarketsRes] = await Promise.all([
        supermarketService.getSupermarkets(),
      ]);
      setSupermarkets(supermarketsRes.supermarkets?.slice(0, 4) || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const productsRes = await productService.getProducts();
      setProducts(productsRes.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOrderClick = () => {
    setShowLoginModal(true);
  };

  return (
    <div className="bg-white">
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      <section
        ref={heroRef}
        data-section="hero"
        className={`relative pt-12 -mt-10 bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden transition-all duration-1000 ${
          visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-700">Serving {supermarkets.length > 0 ? supermarkets.length : '20+'}+ supermarkets across Rwanda</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-gray-900">One Platform.</span>
                <br />
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Endless Choices.
                </span>
              </h1>

              <p className="text-base text-gray-600 max-w-lg leading-relaxed">
                Connect with multiple supermarkets in Rwanda. Browse products, compare prices, 
                and order from the comfort of your home. Save time, save money.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Browse Products
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/supermarkets"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-800 font-semibold rounded-full border-2 border-gray-200 hover:border-green-500 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Explore Supermarkets
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{products.length}+</p>
                  <p className="text-sm text-gray-500">Products</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{supermarkets.length > 0 ? supermarkets.length : '20+'}+</p>
                  <p className="text-sm text-gray-500">Supermarkets</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">1000+</p>
                  <p className="text-sm text-gray-500">Customers</p>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-3xl transform rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-green-400/20 rounded-3xl transform -rotate-3" />
              <img
                src={heroImage}
                alt="Online Shopping"
                className="relative rounded-3xl shadow-2xl w-full object-cover h-48 md:h-56 lg:h-72 transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={supermarketsRef}
        data-section="supermarkets"
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
          visibleSections.supermarkets ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-4">
              Our Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted Supermarkets
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Shop from quality supermarkets across Rwanda. Each store offers unique products 
              and competitive prices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>
              ))
            ) : supermarkets.length > 0 ? (
              supermarkets.map((supermarket, index) => (
                <Link
                  key={supermarket._id}
                  to={`/products?supermarket=${supermarket._id}`}
                  className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative mb-4">
                    <img
                      src={`http://localhost:5000${supermarket.logo}`}
                      alt={supermarket.name}
                      className="w-20 h-20 rounded-2xl object-cover mx-auto group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=100&h=100&fit=crop';
                      }}
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 text-center mb-2 group-hover:text-green-600 transition-colors">
                    {supermarket.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {supermarket.location}
                  </div>
                  <p className="text-sm text-gray-600 text-center line-clamp-2">{supermarket.description}</p>
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-1 text-green-600 font-medium text-sm group-hover:gap-2 transition-all">
                      View Products
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No supermarkets available yet.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/supermarkets"
              className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              View all supermarkets
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section
        ref={productsRef}
        data-section="products"
        className={`py-20 bg-white transition-all duration-1000 ${
          visibleSections.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-block px-4 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full mb-4">
                All Products
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Products from All Supermarkets
              </h2>
              <p className="text-gray-500 mt-2">{products.length} products available</p>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <ProductGridSkeleton count={8} />
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <LandingProductCard
                  key={product._id}
                  product={product}
                  index={index}
                  onLoginRequired={handleOrderClick}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No products available yet. Check back soon!</p>
              </div>
            )}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section
        ref={vendorRef}
        data-section="vendor"
        className={`py-20 bg-gradient-to-br from-green-500 to-blue-600 text-white relative overflow-hidden transition-all duration-1000 ${
          visibleSections.vendor ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm font-medium">For Supermarket Owners</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Are you a supermarket owner?
          </h2>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join HAHA and take your supermarket online. Reach thousands of customers across Rwanda, 
            manage your products, and grow your business with our powerful platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              to="/register?role=vendor"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Register as Vendor
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full border-2 border-white/50 hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-4xl font-bold">0%</p>
              <p className="text-white/70 text-sm">Setup Fee</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">24/7</p>
              <p className="text-white/70 text-sm">Support</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">Easy</p>
              <p className="text-white/70 text-sm">Management</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
