import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Reservations from './pages/reservations/Reservations';
import MedicalCentersPage from './pages/medical-centers/MedicalCenters';
import Vaccinations from './pages/vaccinations/Vaccinations';

export default function VaccinationsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<Navigate to='/vaccinations/vaccinationsPage/' />} />
        <Route path='vaccinationsPage/*' element={<Vaccinations />} />
        <Route path='medical-centers/*' element={<MedicalCentersPage />} />
        <Route path='reservations/*' element={<Reservations />} />
      </Route>
    </Routes>
  );
}

// // Helper component to render a page title above the component
// function ComponentTableWithTitle({ title, component }: { title: string; component: JSX.Element }) {
//   return (
//     <>
//       <PageTitle>{t(title)}</PageTitle>
//       {component}
//     </>
//   );
// }
