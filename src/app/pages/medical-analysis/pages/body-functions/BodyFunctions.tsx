import { Outlet, Route, Routes } from 'react-router-dom';
import BodyFunctionsTable from './components/TablePage';
import AddBodyFunctionsPage from './components/AddPage';
import EditBodyFunctionsPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../../../_metronic/layout/core';
export default function BodyFunctionsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='BodyFunctions' component={<BodyFunctionsTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add BodyFunction' component={<AddBodyFunctionsPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit BodyFunction' component={<EditBodyFunctionsPage />} />} />
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
