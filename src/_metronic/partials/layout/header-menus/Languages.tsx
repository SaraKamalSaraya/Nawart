/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../helpers'
import { setLanguage} from '../../../i18n/Metronici18n'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: toAbsoluteUrl('/media/flags/united-states.svg'),
  },
  {
    lang:"ar",
    name: 'Arabic',
    flag: toAbsoluteUrl('/media/flags/egypt.svg'),
  },
]

const Languages: FC = () => {
  const lang = i18next.language
  const currentLanguage = languages.find((x) => x.lang === lang)


  
  
  const { i18n } = useTranslation();

    const handleChangeLanguage = () => {
      const language = localStorage.getItem('LANGUAGE')

      if (language === 'en') {
        localStorage.setItem('LANGUAGE', 'ar')
        document.body.dir = 'rtl'
        i18n.changeLanguage('ar')
      }else{
        localStorage.setItem('LANGUAGE', 'en')
        document.body.dir = 'ltr'
        i18n.changeLanguage('en')
      }
      
      window.location.reload()
    }
  return (
    <div
      className='menu-item px-5'
      data-kt-menu-trigger='hover'
      data-kt-menu-placement='left-start'
      data-kt-menu-flip='bottom'
    >
      <a href='#' className='menu-link px-5'>
        <span className='menu-title position-relative'>
          Language
          <span className='lang fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0'>
            {currentLanguage?.name}{' '}
            <img
              className='w-15px h-15px rounded-1 ms-2'
              src={currentLanguage?.flag}
              alt='metronic'
            />
          </span>
        </span>
      </a>

      <div className='menu-sub menu-sub-dropdown w-175px py-4'>
        {languages?.map((l) => (
          <div
            className='menu-item px-3'
            key={l.lang}
            onClick={() => {
              setLanguage(l.lang)
              handleChangeLanguage()
            }}
          >
            <a
              href='#'
              className={clsx('menu-link d-flex px-5', {active: l.lang === currentLanguage?.lang})}
            >
              <span className='symbol symbol-20px me-4'>
                <img className='rounded-1' src={l.flag} alt='metronic' />
              </span>
              {l.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export {Languages}
