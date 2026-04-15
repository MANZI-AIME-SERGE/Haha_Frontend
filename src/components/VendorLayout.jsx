import { Outlet } from 'react-router-dom';
import AppLayout from './AppLayout';

const VendorLayout = () => {
  return (
    <AppLayout role="vendor">
      <Outlet />
    </AppLayout>
  );
};

export default VendorLayout;
