/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'
import { t } from 'i18next'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem to='/dashboard' title={t('Dashboard')} fontIcon='bi-app-indicator' />

      {/* إدارة المستخدمين */}
      <AsideMenuItemWithSub to='/user-management' title={t('User Management')} fontIcon='bi-people'>
        <AsideMenuItem to='/user-management/admin' title='Admins' hasBullet={true} />
        <AsideMenuItem to='/user-management/patient' title='Patient' hasBullet={true} />
        <AsideMenuItem to='/user-management/doctor' title='Doctor' hasBullet={true} />
        <AsideMenuItem
          to='/user-management/medical-centers'
          title='Medical Centers'
          hasBullet={true}
        />
      </AsideMenuItemWithSub>


      {/* الرعاية الصحية */}
      <AsideMenuItemWithSub
        to='/healthcare-packages'
        title='Healthcare Packages'
        fontIcon='bi bi-box-seam'
      >
        <AsideMenuItem to='/healthcare-packages/' title='Healthcare Packages' hasBullet={true} />
        <AsideMenuItem to='/healthcare-packages/care-durations' title='Care Durations' hasBullet={true} />
      </AsideMenuItemWithSub>


      {/* التحاليل الطبية */}
      <AsideMenuItemWithSub to='/medical-analysis' title='Medical Analysis' fontIcon='bi bi-eyedropper'>
        <AsideMenuItemWithSub
          to='/medical-analysis/individual-analyses'
          title='Individual Analyses'
          hasBullet={true}
        >
          <AsideMenuItemWithSub
            to='/medical-analysis/individual-analyses/classification'
            title='Classification'
            hasBullet={true}
          >
            <AsideMenuItem
              to='/medical-analysis/individual-analyses/classification/'
              title='Classification'
              hasBullet={true}
            />
            <AsideMenuItem
              to='/medical-analysis/individual-analyses/classification/individual-analyses'
              title='Individual Analyses'
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub
          to='/medical-analysis/analysis-packages'
          title='Analysis Packages'
          hasBullet={true}
        >
          <AsideMenuItemWithSub
            to='/medical-analysis/analysis-packages/group-categories'
            title='Group categories'
            hasBullet={true}
          >
            <AsideMenuItem to='/medical-analysis/analysis-packages/group-categories' title='Group categories' hasBullet={true} />
            <AsideMenuItem to='/medical-analysis/analysis-packages/group-categories/analysis-groups' title='Analysis Groups' hasBullet={true} />
          </AsideMenuItemWithSub>
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub

          to='/medical-analysis/analysis-centers'
          title='Analysis Centers'
          hasBullet={true}
        >
          <AsideMenuItem to='/medical-analysis/analysis-centers/analysis' title='Analaysis' hasBullet={true} />
          <AsideMenuItem to='/medical-analysis/analysis-centers/analysis-groups' title='Analaysis Groups' hasBullet={true} />
        </AsideMenuItemWithSub>


        <AsideMenuItem to='/medical-analysis/body-functions' title='Body Functions' hasBullet={true} />
        <AsideMenuItem to='/medical-analysis/reservations' title='Reservations' hasBullet={true} />
        {/*  fontIcon='bi bi-calendar-event' */}
      </AsideMenuItemWithSub>


      {/* التمريض */}
      <AsideMenuItemWithSub
        to='/visit-a-nurse'
        title='Nurse'
        fontIcon='bi bi-file-medical'
      >
        <AsideMenuItem to='/visit-a-nurse/visits' title='Visit A Nurse' hasBullet={true} />
        <AsideMenuItem to='/visit-a-nurse/medical-centers' title='Medical Centers' hasBullet={true} />
        <AsideMenuItem to='/visit-a-nurse/reservations' title='Reservations' hasBullet={true} />
      </AsideMenuItemWithSub>


      {/* الفيتامينات */}
      <AsideMenuItemWithSub
        to='/vitamins'
        title='Vitamins'
        fontIcon='bi bi-capsule-pill'
      >
        <AsideMenuItem to='/vitamins/vitaminsPage' title='Vitamins' hasBullet={true} />
        <AsideMenuItem to='/vitamins/medical-centers' title='Medical Centers' hasBullet={true} />
        <AsideMenuItem to='/vitamins/reservations' title='Reservations' hasBullet={true} />
      </AsideMenuItemWithSub>


      {/* التطعيمات */}
      <AsideMenuItemWithSub
        to='/vaccinations'
        title='Vaccinations'
        fontIcon='bi bi-shield'
      >
        <AsideMenuItem to='/vaccinations/vaccinationsPage' title='Vaccinations' hasBullet={true} />
        <AsideMenuItem to='/vaccinations/medical-centers' title='Medical Centers' hasBullet={true} />
        <AsideMenuItem to='/vaccinations/reservations' title='Reservations' hasBullet={true} />
      </AsideMenuItemWithSub>


      {/* السنارات الصحية */}
      <AsideMenuItemWithSub
        to='/business-snares'
        title='Business Snares'
        fontIcon='bi bi-lightning'
      >
        <AsideMenuItem to='/business-snares/businessSnaresPage' title='Business Snares' hasBullet={true} />
        <AsideMenuItem to='/business-snares/medical-centers' title='Medical Centers' hasBullet={true} />
        <AsideMenuItem to='/business-snares/reservations' title='Reservations' hasBullet={true} />
      </AsideMenuItemWithSub>








      <AsideMenuItem to='/specializations' title='Specializations' fontIcon='bi bi-patch-question' />
      {/* <AsideMenuItem to='/vaccinations' title='Vaccinations' fontIcon='bi bi-shield' /> */}
      <AsideMenuItem to='/radiations' title='Radiations' fontIcon='bi bi-radioactive' />
      {/* <AsideMenuItem to='/business-snares' title='Business Snares' fontIcon='bi bi-lightning' /> */}
      <AsideMenuItem to='/services' title='Services' fontIcon='bi bi-building' />
      <AsideMenuItem to='/medical-services' title='Medical Services' fontIcon='bi bi-clipboard-data' />
      {/* <AsideMenuItem to='/vitamins' title='Vitamins' fontIcon='bi bi-capsule-pill' /> */}
      {/* <AsideMenuItem to='/reservations' title='Reservations' fontIcon='bi bi-calendar-event' /> */}
      <AsideMenuItem to='/addresses' title='Addresses' fontIcon='bi bi-geo-alt' />
      {/* <AsideMenuItem to='/notifications' title='Notifications' fontIcon='bi bi-bell' /> */}






    </>
  )
}
