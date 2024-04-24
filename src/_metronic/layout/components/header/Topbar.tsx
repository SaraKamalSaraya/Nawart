import clsx from 'clsx'
import React, { FC } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { HeaderNotificationsMenu, HeaderUserMenu, QuickLinks, Search } from '../../../partials'
import { useLayout } from '../../core'
import { t } from 'i18next'
import { useAuth } from '../../../../app/modules/auth'
const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar: FC = () => {
  const { config } = useLayout()
  const { currentUser } = useAuth()
  const unreadNotifications  = true

  const handleTheme = (theme: string) => {
    if (theme === 'dark') {
      localStorage.setItem('THEME', 'dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      window.location.reload()
    } else if (theme === 'light') {
      localStorage.setItem('THEME', 'light')
      document.documentElement.setAttribute('data-theme', 'light')
      window.location.reload()
    }
  }

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>

      {/* NOTIFICATIONS */}
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <div
          className={clsx(
            'btn btn-icon btn-custom',
            toolbarButtonHeightClass
          )}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          {/* <div className="circle" style={{
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            borderRadius: '50%'
          }}></div> */}
          <i className="bi bi-bell" style={{ fontSize: '25px', color: unreadNotifications ? '#0b81b9': '' }} ></i>
        </div>
        <HeaderNotificationsMenu />
      </div>


      {/* Toggle theme */}
      <div className="d-flex align-items-center" style={{ marginInline: '20px' }}>
        {/*begin::Menu toggle*/}
        <a href="#" className="btn btn-icon btn-icon-muted btn-active-icon-primar ms-1 " data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
          {/* <KTSVG path="/media/icons/duotune/abstract/abs013.svg" className="svg-icon svg-icon-2x" /> */}
          <i className="las la-sun" style={{ fontSize: '25px' }} ></i>
        </a>
        {/*begin::Menu toggle*/}

        {/*begin::Menu*/}
        <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px" data-kt-menu="true" data-kt-element="theme-mode-menu" style={{}}>
          {/*begin::Menu item*/}
          <div className="menu-item  my-0 dropdown-item ">
            <a href="#" className="menu-link px-3 py-2 " onClick={() => handleTheme('light')} data-kt-element="mode" data-kt-value="light">
              <span className="menu-icon" data-kt-element="icon">
                <i className="bi bi-brightness-low-fill" style={{ fontSize: '25px' }} />
              </span>
              {t('Light Theme')}
            </a>
          </div>
          {/*end::Menu item*/}

          {/*begin::Menu item*/}
          <div className="menu-item my-0 dropdown-item" >
            <div className="menu-link px-3 py-2" onClick={() => handleTheme('dark')} data-kt-element="mode" data-kt-value="dark">
              <span className="menu-icon" data-kt-element="icon">
                <i className="bi bi-moon-fill"></i>
              </span>
              <span className="menu-title">
                {t('Dark Theme')}
              </span>
            </div>
          </div>
          {/*end::Menu item*/}
        </div>
        {/*end::Menu*/}
      </div>
      {/* end Toggle theme */}



      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <img src={currentUser?.thumbnail_url ? currentUser?.thumbnail_url : toAbsoluteUrl('/media/avatars/blank.png')} alt='metronic' />
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {/* {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )} */}
    </div>
  )
}

export { Topbar }
