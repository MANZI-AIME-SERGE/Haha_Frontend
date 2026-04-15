import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Footer from './layout/Footer';
import { Toast } from './ui/index';
import { useAuth } from '../context';

const LandingLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/supermarkets', label: 'Supermarkets' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-white border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-white font-bold text-xl lg:text-2xl">H</span>
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                HAHA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(link.to)
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Cart Icon */}
                  <Link
                    to="/cart"
                    className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-md">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {showProfileMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 animate-scale-in z-50">
                          <div className="p-4 border-b border-gray-100">
                            <p className="font-medium text-gray-900">{user?.name}</p>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                          </div>
                          <div className="p-2">
                            {user?.role === 'vendor' && (
                              <Link
                                to="/vendor/dashboard"
                                className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Dashboard
                              </Link>
                            )}
                            {user?.role === 'admin' && (
                              <Link
                                to="/admin/dashboard"
                                className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Admin Panel
                              </Link>
                            )}
                            {user?.role === 'customer' && (
                              <Link
                                to="/customer"
                                className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                My Account
                              </Link>
                            )}
                            <button
                              onClick={() => {
                                logout();
                                setShowProfileMenu(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Logout
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-slide-down">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive(link.to)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-center text-gray-700 bg-gray-50 rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-16 lg:pt-20">
        <Outlet />
      </main>
      
      <Footer />
      <Toast />
    </div>
  );
};

export default LandingLayout;
