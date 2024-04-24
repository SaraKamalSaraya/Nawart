import { Outlet, Route, Routes } from 'react-router-dom';
import IndividualAnalysesTable from './components/TablePage';
import AddIndividualAnalysesPage from './components/AddPage';
import EditIndividualAnalysesPage from './components/EditPage';
import { PageTitle } from '../../../../../../../_metronic/layout/core';
import { t } from 'i18next';

export default function IndividualAnalysePage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='IndividualAnalyses' component={<IndividualAnalysesTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add IndividualAnalyse' component={<AddIndividualAnalysesPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit IndividualAnalyse' component={<EditIndividualAnalysesPage />} />} />

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
