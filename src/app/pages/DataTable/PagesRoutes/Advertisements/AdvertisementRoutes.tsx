import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import OffersRoutsPage from './components/offersRouts'
import BannersRoutsPage from './components/bannersRouts'

const AdvertisementRoutes = () => {
  return (
    <Routes>
      {/* Advertisements */}
      <Route element={<Outlet />}>
        <Route path='offers/*' element={<OffersRoutsPage />} />
        <Route path='banners/*' element={<BannersRoutsPage />} />
      </Route>
      <Route index element={<Navigate to='/advertisement/offers' />} />
    </Routes>
  )
}

export default AdvertisementRoutes
