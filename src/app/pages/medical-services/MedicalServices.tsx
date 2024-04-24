import { Outlet, Route, Routes } from 'react-router-dom';
import MedicalServiceTable from './components/TablePage';
import AddMedicalServicePage from './components/AddPage';
import EditMedicalServicePage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../_metronic/layout/core';

export default function MedicalServicePage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Medical Services' component={<MedicalServiceTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Medical Service' component={<AddMedicalServicePage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Medical Service' component={<EditMedicalServicePage />} />} />
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
