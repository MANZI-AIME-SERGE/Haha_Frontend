import { Outlet } from 'react-router-dom';
import AppLayout from './AppLayout';

const CustomerLayout = () => {
  return (
    <AppLayout role="customer">
      <Outlet />
    </AppLayout>
  );
};

export default CustomerLayout;
