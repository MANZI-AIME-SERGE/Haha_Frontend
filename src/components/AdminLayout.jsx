import { Outlet } from 'react-router-dom';
import AdminNavbar from './layout/AdminNavbar';
import { Toast } from './ui/index';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AdminNavbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Toast />
    </div>
  );
};

export default AdminLayout;
