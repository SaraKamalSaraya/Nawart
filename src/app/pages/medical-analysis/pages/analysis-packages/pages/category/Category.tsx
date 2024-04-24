import { Outlet, Route, Routes } from 'react-router-dom';
import  GroupCategoriesTable from './components/TablePage';
import AddGroupCategoriesPage from './components/AddPage';
import EditGroupCategoriesPage from './components/EditPage';
import { t } from 'i18next';
import { PageTitle } from '../../../../../../../_metronic/layout/core';
import AnalysisGroupsPage from './pages/analysis-groups/AnalysisGroups';

// import /category/analysis-groups

export default function GroupCategoriesPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={<ComponentTableWithTitle title='Group Categories' component={<GroupCategoriesTable />} />} />
        <Route path='add' element={<ComponentTableWithTitle title='Add Group Category' component={<AddGroupCategoriesPage />} />} />
        <Route path='edit/:id' element={<ComponentTableWithTitle title='Edit Group Category' component={<EditGroupCategoriesPage />} />} />     

        <Route path='analysis-groups/*' element={<AnalysisGroupsPage />} />
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
