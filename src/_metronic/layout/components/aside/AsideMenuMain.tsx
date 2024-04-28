/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'
import { t } from 'i18next'
import './style.css'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      {/* لوحة التحكم */}
      <AsideMenuItem to='/dashboard' title={t('Dashboard')} fontIcon='bi-app-indicator' />
      {/* الطلبات */}
      <AsideMenuItem to='/orders/all' title={t('Orders')} fontIcon='bi bi-pin-angle-fill' />
      {/* الفواتير */}
      <AsideMenuItem to='/invoices/invoices' title={t('Invoices')} fontIcon='bi bi-currency-dollar' />

      <br />

      {/* إدارة المستخدمين  */}
      <AsideMenuItemWithSub to='/user-management' title={t('User Management')} fontIcon='bi-people'>
        <AsideMenuItem to='/user-management/admins' title='Admins' hasBullet={true} />
        <AsideMenuItem to='/user-management/users' title='User' hasBullet={true} />
        <AsideMenuItem to='/user-management/deliveryMen' title='Delivery Men' hasBullet={true} />
      </AsideMenuItemWithSub>

      {/* إدارة العروض  */}
      <AsideMenuItemWithSub to='/advertisement' title={t('Advertisement Management')} fontIcon='bi bi-lightning'>
        <AsideMenuItem to='/advertisement/offers' title='Offers' hasBullet={true} />
        <AsideMenuItem to='/advertisement/banners' title='Banners' hasBullet={true} />
      </AsideMenuItemWithSub>

      {/* قائمة الطعام */}
      <AsideMenuItemWithSub to='/menu' title={t('Food Menu')} fontIcon='bi bi-egg-fried'>
        <AsideMenuItem to='/menu/categories' title='Categories' hasBullet={true} />
        <AsideMenuItem to='/menu/foodItems' title='Food Items' hasBullet={true} />
      </AsideMenuItemWithSub>

    </>
  )
}
