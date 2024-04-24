import { Outlet, Route, Routes } from 'react-router-dom';
import VaccinationsTable from './components/TablePage';
import AddVaccinationsPage from './components/AddPage';
import EditVaccinationsPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../../../_metronic/layout/core';

export default function Vaccinations() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Vaccinations' component={<VaccinationsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Vaccination' component={<AddVaccinationsPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Vaccination' component={<EditVaccinationsPage />} />} />
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
