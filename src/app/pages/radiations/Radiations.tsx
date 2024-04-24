import { Outlet, Route, Routes } from 'react-router-dom'
import { t } from 'i18next';
import { PageTitle } from '../../../_metronic/layout/core';
import RadiationsTable from './components/TablePage';
import EditRadiationPage from './components/EditPage';
import AddRadiationPage from './components/AddPage';

export default function RadiationsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Radiations' component={<RadiationsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Radiation' component={<AddRadiationPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Radiation' component={<EditRadiationPage />} />} />
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
