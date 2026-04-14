import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from './layout/index';
import { Toast } from './ui/index';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default Layout;
