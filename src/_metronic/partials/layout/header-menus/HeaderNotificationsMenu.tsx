/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../helpers'
import {t} from 'i18next'

const NOTIFICATIONS = [
  {
    clientName: 'حامد سيد',
    category: 'تحليل سكر',
    photographerID: 'أسامة أحمد',
    created_at: ' 1 ',
    state: 'new',
  },
  {
    clientName: 'عبدالله محسن',
    category: 'صورة دم شاملة',
    photographerID: 'أسامة أحمد',
    created_at: ' 2 ',
    state: 'new',
  },
  {
    clientName: 'نهى عادل',
    category: 'سونار',
    photographerID: 'يوسف عيد ',
    created_at: ' 3 ',
    state: 'done',
  },
]

const HeaderNotificationsMenu: FC = () => (
  <div
    className='menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px'
    data-kt-menu='true'
  >
    <div
      className='d-flex flex-column bgi-no-repeat rounded-top'
      style={{ backgroundColor:'#1085A4' }}
    >
      <h3 className='text-white fw-bold px-9 mt-5 mb-5'>
        الحجوزات
      </h3>
    </div>

    <div className='tab-content'>
      <div className='tab-pane fade show active' id='kt_topbar_notifications_1' role='tabpanel'>
        <div className='scroll-y mh-325px my-5 px-8'>
          {NOTIFICATIONS.map((notification,index)=>{
            return(
              <div key={index} className='d-flex flex-stack py-4'>
              <div className='d-flex align-items-center'>
              <div className='symbol symbol-35px ms-4'>
                  <span className={clsx('symbol-label')}
                  style={{color: notification.state === 'new'? '#1085A4' : '', fontWeight: 'bold'}}
                  >
                    {notification.state}
                  </span>
                </div>
                <div className='mb-0 me-2'>
                  <a className='fs-4 text-gray-800 text-hover-primary fw-bolder'>
                    {notification.category}
                  </a>
                  <div className='text-gray-400 fs-7'>
                    {t('Patient')}: {" "}
                    {notification.clientName}
                  </div>
                  <div className='text-gray-400 fs-7'>
                    {t('Doctor')}: {" "}
                    {notification.photographerID}
                  </div>
                </div>
              </div>
              <span className='badge badge-light fs-8'>
                {t('Since')} 
                {notification.created_at}
                {t('Hour')}
                </span>
            </div>
            )
          })}

        </div>

        <div className='py-3 text-center border-top'>
          <Link
            to='/reservations'
            className='btn btn-color-gray-600 btn-active-color-primary'
          >
            عرض الكل
            <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-5' />
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export { HeaderNotificationsMenu }