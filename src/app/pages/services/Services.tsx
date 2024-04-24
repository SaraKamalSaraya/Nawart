import { Outlet, Route, Routes } from 'react-router-dom';
import ServicessTable from './components/TablePage';
import AddServicessPage from './components/AddPage';
import EditServicessPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../_metronic/layout/core';

export default function ServicessPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Services' component={<ServicessTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Service' component={<AddServicessPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Service' component={<EditServicessPage />} />} />
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
