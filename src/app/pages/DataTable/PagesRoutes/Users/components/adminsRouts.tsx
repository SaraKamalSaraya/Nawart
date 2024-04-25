import { Outlet, Route, Routes } from 'react-router-dom';
import { t } from 'i18next';
import { PageLink, PageTitle } from '../../../../../../_metronic/layout/core';
import { DataListWrapper } from '../../../DataList';
import AddPage from '../../../AddPage/AddPage';

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'لوحة المستخدمون',
    path: '/user-management/admins',
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

export default function AdminsRoutsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={
          <>
            <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Admins')}</PageTitle>
            <DataListWrapper />
          </>
        } />
        <Route
          path='add' element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Add Admin')}</PageTitle>
              <AddPage />
            </>
          }
        />
        {/* <Route
          path='users/edit/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Edit Admin')}</PageTitle>
              <DataListWrapper />
            </>
          }
        /> */}
      </Route>
    </Routes>
  );
}