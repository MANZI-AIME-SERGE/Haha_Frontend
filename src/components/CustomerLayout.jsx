import { Outlet } from 'react-router-dom';
import CustomerNavbar from './layout/CustomerNavbar';
import Footer from './layout/Footer';
import { Toast } from './ui/index';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerNavbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default CustomerLayout;
