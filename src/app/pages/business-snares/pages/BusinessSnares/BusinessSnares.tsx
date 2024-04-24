import { Outlet, Route, Routes } from 'react-router-dom';
import BusinessSnaresTable from './components/TablePage';
import AddBusinessSnaresPage from './components/AddPage';
import EditBusinessSnaresPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../../../_metronic/layout/core';

export default function BusinessSnares() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Business Snares' component={<BusinessSnaresTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Business Snare' component={<AddBusinessSnaresPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Business Snare' component={<EditBusinessSnaresPage />} />} />
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
