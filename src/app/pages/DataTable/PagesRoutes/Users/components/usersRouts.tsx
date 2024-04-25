import { Outlet, Route, Routes } from 'react-router-dom';
import { t } from 'i18next';
import { PageLink, PageTitle } from '../../../../../../_metronic/layout/core';
import { DataListWrapper } from '../../../DataList';
import AddPage from '../../../AddPage/AddPage';

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'لوحة المستخدمون',
    path: '/user-management/users',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

export default function UsersRoutsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={
          <>
            <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Users')}</PageTitle>
            <DataListWrapper />
          </>
        } />
        <Route
          path='add' element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Add User')}</PageTitle>
              <AddPage />
            </>
          }
        />
        {/* <Route
          path='users/edit/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Edit User')}</PageTitle>
              <DataListWrapper />
            </>
          }
        /> */}
      </Route>
    </Routes>
  );
}