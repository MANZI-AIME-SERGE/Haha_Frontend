import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './context';
import LandingLayout from './components/LandingLayout';
import CustomerLayout from './components/CustomerLayout';
import VendorLayout from './components/VendorLayout';
import AdminLayout from './components/AdminLayout';
import {
  Home,
  Products,
  ProductDetail,
  Supermarkets,
  Cart,
  Orders,
  Login,
  Register,
  VendorDashboard,
  AddProduct,
  RegisterSupermarket,
  VendorProducts,
  VendorOrders,
  AdminDashboard,
  AdminUsers,
  AdminProducts,
  AdminSupermarkets,
  AdminAnalytics,
  CustomerHome,
  CustomerProducts,
  CustomerSupermarkets,
  CustomerCart,
  CustomerOrders,
  CustomerProfile,
} from './pages';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const PageTransition = ({ children }) => {
  return (
    <div className="animate-fade-in-up">
      {children}
    </div>
  );
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    if (user?.role === 'vendor') return <Navigate to="/vendor/dashboard" replace />;
    if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/customer" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center animate-pulse">
          <span className="text-white font-bold text-xl">H</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    if (user?.role === 'vendor') return <Navigate to="/vendor/dashboard" replace />;
    if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/customer" replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/products/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="/supermarkets" element={<PageTransition><Supermarkets /></PageTransition>} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <PageTransition><Login /></PageTransition>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <PageTransition><Register /></PageTransition>
              </PublicRoute>
            }
          />
        </Route>

        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={['customer', 'user']}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PageTransition><CustomerHome /></PageTransition>} />
          <Route path="products" element={<PageTransition><CustomerProducts /></PageTransition>} />
          <Route path="products/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="supermarkets" element={<PageTransition><CustomerSupermarkets /></PageTransition>} />
          <Route path="cart" element={<PageTransition><CustomerCart /></PageTransition>} />
          <Route path="orders" element={<PageTransition><CustomerOrders /></PageTransition>} />
          <Route path="profile" element={<PageTransition><CustomerProfile /></PageTransition>} />
        </Route>

        <Route
          path="/vendor"
          element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/vendor/dashboard" replace />} />
          <Route path="dashboard" element={<PageTransition><VendorDashboard /></PageTransition>} />
          <Route path="products" element={<PageTransition><VendorProducts /></PageTransition>} />
          <Route path="products/add" element={<PageTransition><AddProduct /></PageTransition>} />
          <Route path="products/edit/:id" element={<PageTransition><AddProduct /></PageTransition>} />
          <Route path="orders" element={<PageTransition><VendorOrders /></PageTransition>} />
          <Route path="supermarket" element={<PageTransition><RegisterSupermarket /></PageTransition>} />
          <Route path="register-supermarket" element={<PageTransition><RegisterSupermarket /></PageTransition>} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="users" element={<PageTransition><AdminUsers /></PageTransition>} />
          <Route path="products" element={<PageTransition><AdminProducts /></PageTransition>} />
          <Route path="orders" element={<PageTransition><div className="bg-white rounded-2xl shadow-soft p-8"><h1 className="text-2xl font-bold text-gray-900">Orders Management</h1></div></PageTransition>} />
          <Route path="supermarkets" element={<PageTransition><AdminSupermarkets /></PageTransition>} />
          <Route path="analytics" element={<PageTransition><AdminAnalytics /></PageTransition>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
