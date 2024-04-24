import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import VitaminsPage from './vitamins/VitaminsPage';
import MedicalCentersPage from './medical-centers/MedicalCenters';
import Reservations from './reservations/Reservations';

export default function Vitamins() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<Navigate to='/vitamins/vitaminsPage/' />} />
        <Route path='vitaminsPage/*' element={<VitaminsPage />} />
        <Route path='medical-centers/*' element={<MedicalCentersPage />} />
        <Route path='reservations/*' element={<Reservations />} />
      </Route>
    </Routes>
  );
}