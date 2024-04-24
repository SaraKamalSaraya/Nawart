import React from 'react'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'
import {useIntl} from 'react-intl'
import {t} from 'i18next'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      {/* <MenuItem to='/store' title={t('Store')} />
      <MenuItem to='/categories' title={t('Categories')} />
      <MenuItem to='/products' title={t('Products')} />
      <MenuItem to='/orders' title={t('Orders')} />
      <MenuInnerWithSub
        title={t('Users')}
        to='/users'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        <MenuItem to='/users/admins' title={t('Admins')} hasBullet={true} />
        <MenuItem to='/users/customers' title={t('Customers')} hasBullet={true} />
        <MenuItem to='/users/sellers' title={t('Sellers')} hasBullet={true} />
      </MenuInnerWithSub> */}
    </>
  )
}
