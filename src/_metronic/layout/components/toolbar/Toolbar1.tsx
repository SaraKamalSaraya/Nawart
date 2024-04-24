/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { FC } from 'react'
import { KTSVG } from '../../../helpers'
import { useLayout } from '../../core'
import { DefaultTitle } from '../header/page-title/DefaultTitle'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom';

const Toolbar1: FC = () => {
  const { classes } = useLayout()
  const navigate = useNavigate()

  const navigateBack = () => {
    navigate(-1)    
  }

  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />
        <div onClick={navigateBack} className='fs-3  p-1 rounded-1 d-flex align-items-center justify-content-center cursor-pointer' style={{backgroundColor:"#0b81b9"}}><i className="bi bi-arrow-return-left text-white fs-2 bold"></i></div>


      </div>
      {/* end::Container */}
    </div>
  )
}

export { Toolbar1 }
