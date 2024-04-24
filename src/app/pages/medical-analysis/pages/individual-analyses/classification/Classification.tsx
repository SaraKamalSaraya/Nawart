import { Outlet, Route, Routes } from 'react-router-dom';
import ClassificationsTable from './components/TablePage';
import AddClassificationsPage from './components/AddPage';
import EditClassificationsPage from './components/EditPage';
import { PageTitle } from '../../../../../../_metronic/layout/core';
import { t } from 'i18next';
import IndividualAnalysesPage from './individual-analyses/IndividualAnalyses';

export default function ClassificationPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Classifications' component={<ClassificationsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Classification' component={<AddClassificationsPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Classification' component={<EditClassificationsPage />} />} />

        {/* Individual Analyses */}
        <Route path='individual-analyses/*' element={<IndividualAnalysesPage/>} />
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
