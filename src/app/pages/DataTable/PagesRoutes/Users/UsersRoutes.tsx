import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import UsersRoutsPage from './components/usersRouts'
import AdminsRoutsPage from './components/adminsRouts'
import DeliveryMenRoutsPage from './components/deliveryMenRouts'

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
