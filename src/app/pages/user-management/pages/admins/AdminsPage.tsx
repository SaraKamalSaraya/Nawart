import { Outlet, Route, Routes } from 'react-router-dom';
import AdminsTable from './components/TablePage';
import AddAdminsPage from './components/AddPage';
import EditAdminsPage from './components/EditPage';
import { PageTitle } from '../../../../../_metronic/layout/core';
import { t } from 'i18next';

export default function AdminsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Admins' component={<AdminsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Admin' component={<AddAdminsPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Admin' component={<EditAdminsPage />} />} />
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
