import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {DataListWrapper} from '../DataList'
import { t } from 'i18next'

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

const UsersRoutes = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='users'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Users')}</PageTitle>
              <DataListWrapper />
            </>
          }
        />
        <Route
          path='admins'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Admins')}</PageTitle>
              <DataListWrapper />
            </>
          }
        />
        <Route
          path='pilots'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Pilots')}</PageTitle>
              <DataListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/user-management/users' />} />
    </Routes>
  )
}

export default UsersRoutes
