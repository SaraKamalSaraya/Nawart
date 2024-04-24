import { Outlet, Route, Routes } from 'react-router-dom';
import DoctorsTable from './components/TablePage';
import AddDoctorsPage from './components/AddPage';
import EditDoctorsPage from './components/EditPage';
import { PageTitle } from '../../../../../_metronic/layout/core';
import { t } from 'i18next';

export default function DoctorsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Doctors' component={<DoctorsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Doctor' component={<AddDoctorsPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Doctor' component={<EditDoctorsPage />} />} />
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
