import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import TopBarProgress from 'react-topbar-progress-indicator';
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils';
import { useAuth } from '../modules/auth';
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import UserManagement from '../pages/user-management/UserManagement'
import NoItems from '../pages/no-items/NoItems';
import ProfilePage from '../pages/profile/ProfilePage';

const PrivateRoutes = () => {
  const { currentLocation } = useAuth();
  let goTo 
  if (currentLocation) {
      currentLocation  == "/auth" ? goTo = "/dashboard" : goTo = currentLocation
  } else {
    goTo = '/dashboard'    
  }

  const UsersRoutes = lazy(() => import('../pages/DataTable/PagesRoutes/Users/UsersRoutes'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to={goTo} />} />

        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='profile/*' element={<ProfilePage />} />
        <Route  path='no-items' element={<NoItems />} />

        {/* <Route path='user-management/*' element={<UserManagement />} /> */}

        {/* Users */}
        <Route
          path='user-management/*'
          element={
            <SuspensedView>
              <UsersRoutes />
            </SuspensedView>
          }
        />

        {/* <Route path='datatable/*' element={<DataTablePage />} /> */}
        {/* <Route path='medical-analysis/*' element={<MedicalAnalysis />} />
        <Route path='medical-services/*' element={<MedicalServices />} />
        <Route path='visit-a-nurse/*' element={<VisitANurse />} />
        <Route path='vitamins/*' element={<Vitamins />} />
        <Route path='healthcare-packages/*' element={<HealthcarePackages />} />
        <Route path='addresses/*' element={<Addresses />} />
        <Route path='specializations/*' element={<Specializations />} />
        <Route path='vaccinations/*' element={<VaccinationsPage />} />
        <Route path='radiations/*' element={<Radiations />} />
        <Route path='business-snares/*' element={<BusinessSnaresPage />} />
        <Route path='services/*' element={<Services />} />   */}


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
