import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import TopBarProgress from 'react-topbar-progress-indicator';
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils';
import { useAuth } from '../modules/auth';
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import NoItems from '../pages/no-items/NoItems';
import ProfilePage from '../pages/profile/ProfilePage';
import AdvertisementRoutes from '../pages/DataTable/PagesRoutes/Advertisements/AdvertisementRoutes';
import MenuRoutes from '../pages/DataTable/PagesRoutes/Menu/MenuRoutes';
import OrdersRouts from '../pages/DataTable/PagesRoutes/Orders/OrderRoutes';
import InvoicesRouts from '../pages/DataTable/PagesRoutes/Invoices/InvoicesRouts';

const PrivateRoutes = () => {
  const { currentLocation } = useAuth();
  let goTo
  if (currentLocation) {
    currentLocation == "/auth" ? goTo = "/dashboard" : goTo = currentLocation
  } else {
    goTo = '/dashboard'
  }

  const UsersRoutes = lazy(() => import('../pages/DataTable/PagesRoutes/Users/UsersRoutes'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to={goTo} />} />

        {/* Base Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='profile/*' element={<ProfilePage />} />
        <Route path='no-items' element={<NoItems />} />


        {/* Users */}
        <Route
          path='user-management/*'
          element={
            <SuspensedView>
              <UsersRoutes />
            </SuspensedView>
          }
        />

        {/* Advertisement */}
        <Route
          path='advertisement/*'
          element={
            <SuspensedView>
              <AdvertisementRoutes />
            </SuspensedView>
          }
        />

        {/* Menu */}
        <Route
          path='menu/*'
          element={
            <SuspensedView>
              <MenuRoutes />
            </SuspensedView>
          }
        />

        {/* Orders */}
        <Route
          path='orders/*'
          element={
            <SuspensedView>
              <OrdersRouts />
            </SuspensedView>
          }
        />

          {/* Invoices */}
          <Route
          path='invoices/*'
          element={
            <SuspensedView>
              <InvoicesRouts />
            </SuspensedView>
          }
        />

        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};


const SuspensedView: FC = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
