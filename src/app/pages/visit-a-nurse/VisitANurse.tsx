import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import VisitsPage from './pages/visits/visitsPage';
import Reservations from './pages/reservations/Reservations';
import MedicalCentersPage from './pages/medical-centers/MedicalCenters';

export default function VisitANursePage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<Navigate to='/visit-a-nurse/visits/' />} />
        <Route path='visits/*' element={<VisitsPage />} />
        <Route path='medical-centers/*' element={<MedicalCentersPage />} />
        <Route path='reservations/*' element={<Reservations />} />
      </Route>
    </Routes>
  );
}