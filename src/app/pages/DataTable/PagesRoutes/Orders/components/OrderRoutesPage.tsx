import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { t } from 'i18next';
import { PageLink, PageTitle } from '../../../../../../_metronic/layout/core';
import { DataListWrapper } from '../../../DataList';
import InputsPage from '../../../InputsPage/InputsPage';

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'لوحة الطلبات',
    path: '/orders/all',
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

export default function OrdersRoutsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={
          <>
            <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Orders')}</PageTitle>
            <DataListWrapper />
          </>
        } />
        <Route
          path='add' element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Add Order')}</PageTitle>
              <InputsPage />
            </>
          }
        />
        <Route
          path='edit/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Edit Order')}</PageTitle>
              <InputsPage />
            </>
          }
        />
      </Route>
    </Routes>
  );
}