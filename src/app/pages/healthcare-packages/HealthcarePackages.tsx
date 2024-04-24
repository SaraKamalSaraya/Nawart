import { Outlet, Route, Routes } from 'react-router-dom';
import HealthcarePackagesTable from './components/TablePage';
import AddHealthcarePackagesPage from './components/AddPage';
import EditHealthcarePackagesPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../_metronic/layout/core';
import CareDurations from './pages/CareDurations/CareDurations';

export default function HealthcarePackagesPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Healthcare Packages' component={<HealthcarePackagesTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Healthcare Package' component={<AddHealthcarePackagesPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Healthcare Package' component={<EditHealthcarePackagesPage />} />} />

        <Route path='care-durations/*' element={<CareDurations />} />
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
