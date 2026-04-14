import { Outlet } from 'react-router-dom';
import LandingNavbar from './layout/LandingNavbar';
import Footer from './layout/Footer';
import { Toast } from './ui/index';

const LandingLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <LandingNavbar />
      <main className="flex-grow pt-[88px]">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default LandingLayout;
