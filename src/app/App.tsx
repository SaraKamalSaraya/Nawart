import {Suspense, useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import { useAuth } from './modules/auth'
// import {AuthInit} from './modules/auth'


const App = () => {
  const {setCurrentLocation} = useAuth()
  const pathname = useLocation().pathname
  
  useEffect(() => {
    setCurrentLocation(pathname)
  },[])

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          {/* <AuthInit> */}
            <Outlet  />
            <MasterInit />
          {/* </AuthInit> */}
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
