import { Outlet } from 'react-router-dom';
import AppLayout from './AppLayout';

const AdminLayout = () => {
  return (
    <AppLayout role="admin">
      <Outlet />
    </AppLayout>
  );
};

export default AdminLayout;
