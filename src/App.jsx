import { Routes, Route, Navigate } from 'react-router-dom';
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
  CustomerHome,
  CustomerProducts,
  CustomerSupermarkets,
  CustomerCart,
  CustomerOrders,
  CustomerProfile,
} from './pages';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/supermarkets" element={<Supermarkets />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
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
        <Route index element={<CustomerHome />} />
        <Route path="products" element={<CustomerProducts />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="supermarkets" element={<CustomerSupermarkets />} />
        <Route path="cart" element={<CustomerCart />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="profile" element={<CustomerProfile />} />
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
        <Route path="dashboard" element={<VendorDashboard />} />
        <Route path="products" element={<VendorProducts />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<AddProduct />} />
        <Route path="orders" element={<VendorOrders />} />
        <Route path="supermarket" element={<RegisterSupermarket />} />
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
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<div className="p-6"><h1 className="text-2xl font-bold">Users Management</h1></div>} />
        <Route path="supermarkets" element={<div className="p-6"><h1 className="text-2xl font-bold">Supermarkets Management</h1></div>} />
        <Route path="products" element={<div className="p-6"><h1 className="text-2xl font-bold">Products Management</h1></div>} />
        <Route path="orders" element={<div className="p-6"><h1 className="text-2xl font-bold">Orders Management</h1></div>} />
        <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1></div>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
