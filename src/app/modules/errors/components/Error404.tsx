import { t } from 'i18next'
import {FC} from 'react'

const Error404: FC = () => {
  return (
    <>
  <h1 className='fw-bolder fs-4x text-gray-700 mb-10'>{t('Page Not Found')}</h1>

  <div className='fw-bold fs-3 text-gray-400 mb-15'>
    {t('The page you looked not found!')} 
  </div>
</>

  )
}

export {Error404}
