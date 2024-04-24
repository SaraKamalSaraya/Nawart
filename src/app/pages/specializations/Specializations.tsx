import { Outlet, Route, Routes } from 'react-router-dom';
import SpecializationsTable from './components/TablePage';
import AddSpecializationsPage from './components/AddPage';
import EditSpecializationsPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../_metronic/layout/core';

export default function SpecializationsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Specializations' component={<SpecializationsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Specialization' component={<AddSpecializationsPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Specialization' component={<EditSpecializationsPage />} />} />
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
