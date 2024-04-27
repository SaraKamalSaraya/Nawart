import { Outlet, Route, Routes } from 'react-router-dom';
import { t } from 'i18next';
import { PageLink, PageTitle } from '../../../../../../_metronic/layout/core';
import { DataListWrapper } from '../../../DataList';
import InputsPage from '../../../InputsPage/InputsPage';

const usersBreadcrumbs: Array<PageLink> = [
    {
      title: 'قائمة الطعام',
      path: '/menu/categories',
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
  

export default function CategoriesRoutsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='/' element={
          <>
            <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Categories')}</PageTitle>
            <DataListWrapper />
          </>
        } />
        <Route
          path='add' element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Add Category')}</PageTitle>
              <InputsPage />
            </>
          }
        />
        <Route
          path='edit/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>{t('Edit Category')}</PageTitle>
              <InputsPage />
            </>
          }
        />
      </Route>
    </Routes>
  );
}