import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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
} from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="supermarkets" element={<Supermarkets />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="vendor/dashboard" element={<VendorDashboard />} />
        <Route path="vendor/products/add" element={<AddProduct />} />
        <Route path="vendor/register-supermarket" element={<RegisterSupermarket />} />
      </Route>
    </Routes>
  );
}

export default App;
