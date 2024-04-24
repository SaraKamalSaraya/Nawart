import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { t } from 'i18next';
import { PageTitle } from '../../../../../_metronic/layout/core';
import Category from './pages/category/Category';
import AnalysisGroups from './pages/category/pages/analysis-groups/AnalysisGroups';

// import /category/analysis-groups

export default function  AnalysisPackagesPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<Navigate to='/medical-analysis/analysis-packages/group-categories' />} />
          <Route path='group-categories/*' element={<Category />} />        
      </Route>
    </Routes>
  );
}
