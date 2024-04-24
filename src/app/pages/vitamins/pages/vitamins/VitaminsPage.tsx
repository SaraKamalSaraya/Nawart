import { Outlet, Route, Routes } from 'react-router-dom';
import VitaminsTable from './components/TablePage';
import AddVitaminsPage from './components/AddPage';
import EditVitaminsPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../../../_metronic/layout/core';

export default function VitaminsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Vitamins' component={<VitaminsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Vitamin' component={<AddVitaminsPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Vitamin' component={<EditVitaminsPage />} />} />
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
