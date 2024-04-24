import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AsideDefault } from './components/aside/AsideDefault'
import { Footer } from './components/Footer'
import { HeaderWrapper } from './components/header/HeaderWrapper'
import { Toolbar } from './components/toolbar/Toolbar'
import { RightToolbar } from '../partials/layout/RightToolbar'
import { ScrollTop } from './components/ScrollTop'
import { Content } from './components/Content'
import { PageDataProvider } from './core'
import { useLocation } from 'react-router-dom'
import { DrawerMessenger, ActivityDrawer, Main, InviteUsers, UpgradePlan } from '../partials'
import { MenuComponent } from '../assets/ts/components'

const MasterLayout = () => {
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper />

          <Toolbar />

          {isLoading ?
            <div className="d-flex justify-content-center align-items-center mt-20">
              <span className="loader"></span>
              {/* <br/>
              <img src={process.env.PUBLIC_URL + '/media/logos/logo.png'} width="40%" alt="Logo" /> */}
              </div>
            :
            <div className='p-4'><Outlet /></div>
            }


          <Footer />
        </div>
      </div>

      {/* begin:: Drawers */}
      <ActivityDrawer />
      <RightToolbar />
      <DrawerMessenger />
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <Main />
      <InviteUsers />
      <UpgradePlan />
      {/* end:: Modals */}
      <ScrollTop />
    </PageDataProvider>
  )
}

export { MasterLayout }
