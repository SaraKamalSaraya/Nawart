import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../../_metronic/layout/core'
import { DataListWrapper } from '../../DataList'
import { t } from 'i18next'
import UsersRoutsPage from './components/usersRouts'
import AdminsRoutsPage from './components/adminsRouts'
import DeliveryMenRoutsPage from './components/deliveryMenRouts'

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

      {/* Users */}
      <Route element={<Outlet />}>
        <Route path='users/*' element={<UsersRoutsPage />} />
        <Route path='admins/*' element={<AdminsRoutsPage />} />
        <Route path='deliveryMen/*' element={<DeliveryMenRoutsPage />} />
      </Route>
      <Route index element={<Navigate to='/user-management/users' />} />
    </Routes>
  )
}

export default UsersRoutes
