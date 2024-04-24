/* eslint-disable jsx-a11y/anchor-is-valid */
import { t } from 'i18next'
import React, { FC } from 'react'

const MegaMenu: FC = () => (
  <div className='row' data-kt-menu-dismiss='true'>
    {Array.of(1, 2, 3).map((item,index) => (

      <div key={index} className='col-lg-4 border-left-lg-1'>
        <div className='menu-inline menu-column menu-active-bg'>

          {
            Array.of(1, 2, 3).map((item,index) => (
              <div  key={index} className='menu-item'>
                <a href='#' className='menu-link'>
                  <span className='menu-bullet'>
                    <span className='bullet bullet-dot'></span>
                  </span>
                  <span className='menu-title'>{t('Example link')}</span>
                </a>
              </div>
            ))
          }

        </div>
      </div>
    ))}
  </div>
)

export { MegaMenu }
