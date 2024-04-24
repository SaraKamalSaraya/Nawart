import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import MedicalCenterAnalysis from './pages/medical-center-analysis/MedicalCenterAnalysis';
import MedicalCenterAnalysisGroups from './pages/medical-center-analysis-groups/MedicalCenterAnalysisGroups';

export default function  AnalysisCentersPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<Navigate to='/medical-analysis/analaysis-centers' />} />
        <Route path='analysis/*' element={<MedicalCenterAnalysis/>} />
        <Route path='analysis-groups/*' element={<MedicalCenterAnalysisGroups/>} />
        
      </Route>
    </Routes>
  );
}
