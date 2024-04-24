
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ClassificationPage from './pages/individual-analyses/classification/Classification';
import BodyFunctions from './pages/body-functions/BodyFunctions';
import AnalysisPackages from './pages/analysis-packages/AnalysisPackages';
import AnalysisCentersPage from './pages/analysis-centers/AnalysesCenters';
import Reservations from './pages/reservations/Reservations';

// ANALYSIS CENTERS
export default function MedicalAnalysisPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<Navigate to='/medical-analysis/individual-analyses/classification/' />} />

        <Route path='individual-analyses/classification/*' element={<ClassificationPage/>} />        
        <Route path='body-functions/*' element={<BodyFunctions/>} />
        <Route path='analysis-packages/*' element={<AnalysisPackages/>} />
        <Route path='analysis-centers/*' element={<AnalysisCentersPage/>} />
        <Route path='reservations/*' element={<Reservations/>} />
                
      </Route>
    </Routes>
  );
}
