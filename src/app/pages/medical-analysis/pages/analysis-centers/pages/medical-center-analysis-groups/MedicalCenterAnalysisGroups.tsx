import { Outlet, Route, Routes } from 'react-router-dom';
import  MedicalCenterAnalysisGroupsTable from './components/TablePage';
import AddMedicalCenterAnalysisGroupsPage from './components/AddPage';
import EditMedicalCenterAnalysisGroupsPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../../../../../_metronic/layout/core';

// import /category/analysis-groups

export default function MedicalCenterAnalysisGroupsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Medical Center Analyses Groups' component={<MedicalCenterAnalysisGroupsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Medical Center Analysis Group' component={<AddMedicalCenterAnalysisGroupsPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Medical Center Analysis Group' component={<EditMedicalCenterAnalysisGroupsPage />} />} />   
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
