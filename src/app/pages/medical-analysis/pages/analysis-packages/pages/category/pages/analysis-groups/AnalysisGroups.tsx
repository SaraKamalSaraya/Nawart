import { Outlet, Route, Routes } from 'react-router-dom';
import  AnalysisGroupsTable from './components/TablePage';
import AddAnalysisGroupsPage from './components/AddPage';
import EditAnalysisGroupsPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../../../../../../../_metronic/layout/core';
// import /category/analysis-groups

export default function  AnalysisGroupsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Analysis Groups' component={<AnalysisGroupsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Analysis Group' component={<AddAnalysisGroupsPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Analysis Group' component={<EditAnalysisGroupsPage />} />} />        
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
