import { Outlet, Route, Routes } from 'react-router-dom';
import AddressesTable from './components/TablePage';
import AddAddressesPage from './components/AddPage';
import EditAddressesPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../_metronic/layout/core';

export default function AddressesPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Addresses' component={<AddressesTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Address' component={<AddAddressesPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Address' component={<EditAddressesPage />} />} />
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
