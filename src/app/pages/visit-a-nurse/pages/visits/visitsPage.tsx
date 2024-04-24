import { Outlet, Route, Routes } from 'react-router-dom';
import ClassificationsTable from './components/TablePage';
import AddClassificationsPage from './components/AddPage';
import EditClassificationsPage from './components/EditPage';
import { PageTitle } from '../../../../../_metronic/layout/core';
import { t } from 'i18next';
import VisitANursesTable from './components/TablePage';
import AddVisitANursePage from './components/AddPage';
import EditVisitANursePage from './components/EditPage';

export default function VisitsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Visit A Nurse' component={<VisitANursesTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Visit A Nurse' component={<AddVisitANursePage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Visit A Nurse' component={<EditVisitANursePage />} />} />
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
