import { Outlet, Route, Routes } from 'react-router-dom';
import  MedicalCenterAnalysisTable from './components/TablePage';
import AddMedicalCenterAnalysisPage from './components/AddPage';
import EditMedicalCenterAnalysisPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../../../../../_metronic/layout/core';

// import /category/analysis-groups

export default function MedicalCenterAnalysisPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Medical Center Analyses' component={<MedicalCenterAnalysisTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Medical Center Analysis' component={<AddMedicalCenterAnalysisPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Medical Center Analysis' component={<EditMedicalCenterAnalysisPage />} />} />   
      </Route>
    </Routes>
  );
}

// Helper component to render a page title above the component
function ComponentTableWithTitle({ title, component }: { title: string; component: JSX.Element }) {
  return (
    <>
      <PageTitle>{t(title)}</PageTitle>
      {component}
    </>
  );
}
