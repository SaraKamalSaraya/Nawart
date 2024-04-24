import { Outlet, Route, Routes } from 'react-router-dom'
import { t } from 'i18next';
import { PageTitle } from '../../../../../_metronic/layout/core';
import ReservationsTable from './components/TablePage';
import EditReservationPage from './components/EditPage';
import AddReservationPage from './components/AddPage';

export default function Reservations() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title={t('Reservasions')} component={<ReservationsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title={t('Add Vaccination Reservasion')} component={<AddReservationPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title={t('Edit Vaccination Reservation')} component={<EditReservationPage />} />} />
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
