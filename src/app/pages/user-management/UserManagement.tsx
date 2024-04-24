
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import PatientPage from './pages/patient/PatientPage';
import DoctorPage from './pages/doctor/DoctorPage';
import MedicalCentersPage from './pages/medical-centers/MedicalCentersPage';
import AdminsPage from './pages/admins/AdminsPage';


export default function UsersPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<Navigate to='/user-management/patient' />} />
        <Route path='admin/*' element={<AdminsPage />} />
        <Route path='patient/*' element={<PatientPage />} />
        <Route path='doctor/*' element={<DoctorPage />} />
        <Route path='medical-centers/*' element={<MedicalCentersPage />} />        
      </Route>
    </Routes>
  );
}
