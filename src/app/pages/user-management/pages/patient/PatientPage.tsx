import { Outlet, Route, Routes } from 'react-router-dom';
import PatientsTable from './components/TablePage';
import AddPatientsPage from './components/AddPage';
import EditPatientsPage from './components/EditPage';
import { PageTitle } from '../../../../../_metronic/layout/core';
import { t } from 'i18next';

export default function PatientsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Patients' component={<PatientsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Patient' component={<AddPatientsPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Patient' component={<EditPatientsPage />} />} />
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
