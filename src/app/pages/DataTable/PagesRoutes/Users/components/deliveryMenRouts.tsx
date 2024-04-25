import { Outlet, Route, Routes } from 'react-router-dom';
import { t } from 'i18next';
import { PageLink, PageTitle } from '../../../../../../_metronic/layout/core';
import { DataListWrapper } from '../../../DataList';
import InputsPage from '../../../InputsPage/InputsPage';

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'لوحة المستخدمون',
    path: '/user-management/deliveryMen',
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

export default function DeliveryMenRoutsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={
          <>
            <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Delivery Men')}</PageTitle>
            <DataListWrapper />
          </>
        } />
        <Route
          path='add' element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Add Delivery Man')}</PageTitle>
              <InputsPage />
            </>
          }
        />
        <Route
          path='edit/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Edit Admin')}</PageTitle>
              <InputsPage />
            </>
          }
        />
      </Route>
    </Routes>
  );
}