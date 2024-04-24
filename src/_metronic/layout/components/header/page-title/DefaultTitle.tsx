import clsx from 'clsx'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useLayout } from '../../../core/LayoutProvider'
import { usePageData } from '../../../core/PageData'
import { t } from 'i18next'

const DefaultTitle: FC = () => {
  const { pageTitle, pageDescription, pageBreadcrumbs } = usePageData()
  const { config, classes } = useLayout()
  return (
    <div
      id='kt_page_title'
      data-kt-swapper='true'
      data-kt-swapper-mode='prepend'
      data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
      className={clsx('page-title d-flex', classes.pageTitle.join(' '))}
    >
      {/* begin::Title */}
      {pageTitle && (
        <h1 className='d-flex align-items-center text-dark fw-bolder my-1 fs-3'>
          {t(pageTitle)}
          {pageDescription && config.pageTitle && config.pageTitle.description && (
            <>
              <span className='h-20px border-gray-200 border-start ms-3 mx-2'></span>
              <small className='text-muted fs-7 fw-bold my-1 ms-1'>{pageDescription}</small>
            </>
          )}
        </h1>
      )}
      {/* end::Title */}

    </div>
  )
}

export { DefaultTitle }
