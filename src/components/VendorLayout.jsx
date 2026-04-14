import { Outlet } from 'react-router-dom';
import VendorNavbar from './layout/VendorNavbar';
import { Toast } from './ui/index';

const VendorLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <VendorNavbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Toast />
    </div>
  );
};

export default VendorLayout;
