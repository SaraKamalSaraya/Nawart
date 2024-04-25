/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'
import { t } from 'i18next'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem to='/dashboard' title={t('Dashboard')} fontIcon='bi-app-indicator' />

      {/* إدارة المستخدمين  */}
      <AsideMenuItemWithSub to='/user-management' title={t('User Management')} fontIcon='bi-people'>
        <AsideMenuItem to='/user-management/admins' title='Admins' hasBullet={true} />
        <AsideMenuItem to='/user-management/users' title='User' hasBullet={true} />
        <AsideMenuItem to='/user-management/deliveryMen' title='Delivery Men' hasBullet={true} />
      </AsideMenuItemWithSub>

    </>
  )
}
