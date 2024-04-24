import { Outlet, Route, Routes } from 'react-router-dom';
import MedicalCentersTable from './components/TablePage';
import AddMedicalCentersPage from './components/AddPage';
import EditMedicalCentersPage from './components/EditPage';
import { PageTitle } from '../../../../../_metronic/layout/core';
import { t } from 'i18next';

export default function MedicalCentersPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='MedicalCenters' component={<MedicalCentersTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add MedicalCenter' component={<AddMedicalCentersPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit MedicalCenter' component={<EditMedicalCentersPage />} />} />
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
