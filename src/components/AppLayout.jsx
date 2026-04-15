import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { Toast } from './ui';

const AppLayout = ({ children, role = 'admin' }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = role === 'admin';

  const menuItems = isAdmin ? [
    { path: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Dashboard' },
    { path: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', label: 'Users' },
    { path: '/admin/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', label: 'Products' },
    { path: '/admin/supermarkets', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Supermarkets' },
    { path: '/admin/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Analytics' },
    { path: '/admin/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Profile' },
  ] : [
    { path: '/vendor/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Dashboard' },
    { path: '/vendor/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', label: 'Products' },
    { path: '/vendor/products/add', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6', label: 'Add Product' },
    { path: '/vendor/orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', label: 'Orders' },
    { path: '/vendor/supermarket', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'My Store' },
  ];

  const isActive = (path) => {
    if (path === `/${role}/dashboard`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast />
      
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M4 6h16M4 12h16M4 18h16" : "M4 6h16M4 12h10M4 18h16"} />
              </svg>
            </button>
            
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md animate-float">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                HAHA
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search products, orders, users..."
                className="w-full pl-12 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm
                  placeholder-gray-400
                  focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                  transition-all duration-300"
              />
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 animate-scale-in z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">New order received</p>
                          <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">New vendor registered</p>
                          <p className="text-xs text-gray-500">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-100">
                    <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-md">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{role}</p>
                </div>
                <svg className="hidden lg:block w-4 h-4 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 animate-scale-in z-50">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <Link
                      to={`/${role}/profile`}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 z-40
        bg-white border-r border-gray-100
        transition-all duration-300 ease-out
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
        hidden lg:block
      `}>
        <div className="flex flex-col h-full py-4">
          <nav className="flex-1 px-3 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200
                  animate-fade-in-up
                  ${isActive(item.path)
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg hover:shadow-xl'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                  ${sidebarCollapsed ? 'justify-center px-2' : ''}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="px-3 mt-auto space-y-2">
            {/* Collapse Toggle */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl
                text-gray-600 hover:bg-gray-50 hover:text-gray-900
                transition-all duration-200 cursor-pointer
                ${sidebarCollapsed ? 'justify-center px-2' : ''}
              `}
            >
              <svg className={`w-6 h-6 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">Collapse</span>}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl
                bg-gradient-to-r from-green-500 to-blue-600 text-white
                hover:from-green-600 hover:to-blue-700
                shadow-md hover:shadow-lg
                transition-all duration-200 cursor-pointer
                ${sidebarCollapsed ? 'justify-center px-2' : ''}
              `}
            >
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {!sidebarCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setMobileMenuOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl animate-slide-in-left">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-xl font-bold text-gray-900">HAHA</span>
              </div>
            </div>
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${isActive(item.path)
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 space-y-2">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
                <span className="font-medium">Collapse</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className={`
        pt-16 min-h-screen
        transition-all duration-300
        ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
      `}>
        <div className="p-4 lg:p-6 animate-fade-in-up">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
