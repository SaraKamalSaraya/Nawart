import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import TopBarProgress from 'react-topbar-progress-indicator';
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils';
import { useAuth } from '../modules/auth';

import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import UserManagement from '../pages/user-management/UserManagement'
import MedicalAnalysis from '../pages/medical-analysis/MedicalAnalysis'
import NoItems from '../pages/no-items/NoItems';
import MedicalServices from '../pages/medical-services/MedicalServices';
import VisitANurse from '../pages/visit-a-nurse/VisitANurse';
import HealthcarePackages from '../pages/healthcare-packages/HealthcarePackages';
import Addresses from '../pages/addresses/Addresses';
import Specializations from '../pages/specializations/Specializations';
import Radiations from '../pages/radiations/Radiations';
import Services from '../pages/services/Services';
import ProfilePage from '../pages/profile/ProfilePage';
import VaccinationsPage from '../pages/vaccinations/Vaccinations';
import BusinessSnaresPage from '../pages/business-snares/BusinessSnares';
import Vitamins from '../pages/vitamins/pages/Vitamins';



const PrivateRoutes = () => {
  const { currentLocation } = useAuth();
  let goTo 
  if (currentLocation) {
      currentLocation  == "/auth" ? goTo = "/dashboard" : goTo = currentLocation
  } else {
    goTo = '/dashboard'    
  }

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to={goTo} />} />

        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='user-management/*' element={<UserManagement />} />
        <Route path='medical-analysis/*' element={<MedicalAnalysis />} />
        <Route path='medical-services/*' element={<MedicalServices />} />
        <Route path='visit-a-nurse/*' element={<VisitANurse />} />
        <Route path='vitamins/*' element={<Vitamins />} />
        <Route path='healthcare-packages/*' element={<HealthcarePackages />} />
        <Route path='addresses/*' element={<Addresses />} />
        <Route path='specializations/*' element={<Specializations />} />
        <Route path='vaccinations/*' element={<VaccinationsPage />} />
        <Route path='radiations/*' element={<Radiations />} />
        <Route path='business-snares/*' element={<BusinessSnaresPage />} />
        <Route path='services/*' element={<Services />} />  
        <Route path='profile/*' element={<ProfilePage />} />


       <Route  path='no-items' element={<NoItems />} />
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
