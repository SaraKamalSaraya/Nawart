import { t } from 'i18next'
import {toAbsoluteUrl} from '../../../helpers'

export function FallbackView() {
  return (
    <div className='splash-screen'>
      <img src={toAbsoluteUrl('/media/logos/logo-compact.svg')} alt='Start logo' />
      <span>{t('Loading...')}</span>
    </div>
  )
}
