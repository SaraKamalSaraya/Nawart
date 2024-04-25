import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../../_metronic/layout/core'
import { DataListWrapper } from '../../DataList'
import { t } from 'i18next'
import OffersRoutsPage from './components/offersRouts'
import BannersRoutsPage from './components/bannersRouts'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'لوحة العروض',
    path: '/advertisement/offers',
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

const AdvertisementRoutes = () => {
  return (
    <Routes>
      {/* Users */}
      <Route element={<Outlet />}>
        <Route path='offers/*' element={<OffersRoutsPage />} />
        <Route path='banners/*' element={<BannersRoutsPage />} />
      </Route>
      
      <Route index element={<Navigate to='/advertisement/offers' />} />
    </Routes>
  )
}

export default AdvertisementRoutes
