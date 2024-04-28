import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { t } from 'i18next';
import { PageLink, PageTitle } from '../../../../../../_metronic/layout/core';
import { DataListWrapper } from '../../../DataList';
import InputsPage from '../../../InputsPage/InputsPage';

const usersBreadcrumbs: Array<PageLink> = [
    {
      title: 'لوحة الفواتير',
      path: '/invoices/invoices',
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

const InvoicesRotesPage = () => {
  return (
    <Routes>
        <Route element={<Outlet />}>
        <Route path='/' element={
            <>
            <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Invoices')}</PageTitle>
            <DataListWrapper />
            </>
        } />
        <Route
            path='add' element={
            <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Add Invoice')}</PageTitle>
                <InputsPage />
            </>
            }
        />
        <Route
            path='edit/:id'
            element={
            <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Edit Invoice')}</PageTitle>
                <InputsPage />
            </>
            }
        />
        </Route>
  </Routes>
  )
}

export default InvoicesRotesPage
