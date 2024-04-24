import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PageTitle } from '../../../../../_metronic/layout/core';
import { t } from 'i18next';
import MedicalCenterTable from './components/TablePage';
import AddMedicalCenter from './components/AddPage';
import EditMedicalCenter from './components/EditPage';

export default function MedicalCentersPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
      <Route path='/' element={<ComponentTableWithTitle title='Medical Centers For Business Snares' component={<MedicalCenterTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Medical Center For Business Snares' component={<AddMedicalCenter />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Medical Center For Business Snares' component={<EditMedicalCenter />} />} />   
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
