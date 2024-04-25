import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../../_metronic/layout/core'
import { DataListWrapper } from '../../DataList'
import { t } from 'i18next'

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
      <Route element={<Outlet />}>
        {/* Offers */}
        <Route path='offers' element={
          <>
            <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Offers')}</PageTitle>
            <DataListWrapper />
          </>
        } />

        {/* Banners */}
        <Route path='banners' element={
          <>
            <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Banners')}</PageTitle>
            <DataListWrapper />
          </>
        } />
      </Route>
      <Route index element={<Navigate to='/advertisement/offers' />} />
    </Routes>
  )
}

export default AdvertisementRoutes
