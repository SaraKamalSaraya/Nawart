import { Outlet, Route, Routes } from 'react-router-dom';
import CareDurationsTable from './components/TablePage';
import AddCareDurationsPage from './components/AddPage';
import EditCareDurationsPage from './components/EditPage';
import { PageTitle } from '../../../../../_metronic/layout/core';
import { t } from 'i18next';

export default function CareDurationsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Care Durations' component={<CareDurationsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Care Duration' component={<AddCareDurationsPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Care Duration' component={<EditCareDurationsPage />} />} />
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
