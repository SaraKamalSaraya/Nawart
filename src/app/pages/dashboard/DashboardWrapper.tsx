import React, { FC, useState, useEffect } from 'react';
import { PageTitle } from '../../../_metronic/layout/core';
import {
  MixedWidget10,
} from '../../../_metronic/partials/widgets';
import { t } from 'i18next';
import { DataCard } from './components/dataCard';
import { NewUsersCard } from './components/newUsersCard';
import { RecentOrdersTable } from './components/RecentOrderTable/RecentOrdersTable';
import { useNavigate } from 'react-router-dom'
import getMethod from '../../../functions/getMethod';

interface UserData {
  id: number;
  name: string;
  image: string;
}

interface AnalysisBookings {
  id: number;
  user: { id: number; first_name: string; last_name: string; };
  analysis: { id: number; title: string; };
  analysis_group: { id: number; name: string; };
  medical_center: { id: number; name: string; };
  booking_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string
}

const DashboardPage: FC = () => {
  // User Data Card 
  const [adminsCount, setAdminsCount] = useState<number>(0);
  const [usersCount, setusersCount] = useState<number>(0);
  const [deliveryMenCount, setdeliveryMenCount] = useState<number>(0);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);

  // New users card
  const [newusersCount, setNewusersCount] = useState<number>(0);
  const [remainingNewusersCount, setRemainingNewusersCount] = useState<number>(0);
  const [newusers, setNewusers] = useState<UserData[]>([]);
  const [percentageIncrease, setPercentageIncrease] = useState<number>(0);

  // Reservasions Card
  const [analysisBookings, setAnalysisBookings] = useState<AnalysisBookings[]>([]);
  const [analysisBookingCount, setAnalysisBookingsCount] = useState<number>(0);
  const [totalBookingCount, setTotalBookingCount] = useState<number>(0);


  const navigate = useNavigate()
  useEffect(() => {
    const fetchAdminsCount = async () => {
      const res = await getMethod('/admin')
      setAdminsCount(res?.data?.data?.length)
    }
    const fetchusersCount = async () => {
      const res = await getMethod('/user')
      setusersCount(res?.data?.data?.length)

      // Get New Users count <last month>
      const filteredData = res?.data?.data?.filter((item: any) => {
        const createdAtDate = new Date(item.created_at);
        const currentDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return createdAtDate >= oneMonthAgo && createdAtDate <= currentDate;
      });
      setNewusersCount(filteredData?.length);

      // Set last 4 New users data
      console.log('filteredData',filteredData)
      const lastFiveNewusers = filteredData?.slice(-5);
      const remainingCount = Math.max(0, filteredData?.length - 5);
      setNewusers(lastFiveNewusers)
      setRemainingNewusersCount(remainingCount)

      // Calculate percentage increase
      if (usersCount === 0) {
        setPercentageIncrease(0);
      } else {
        const increase = usersCount - newusersCount;
        const percentage = (increase / usersCount) * 100;
        setPercentageIncrease(Math.max(0, percentage));
      }
    }
    // const fetchdeliveryMenCount = async () => {
    //   const res = await getMethod('/deliveryMen')
    //   setdeliveryMenCount(res?.data?.deliveryMen?.length)
    // }

    fetchAdminsCount()
    fetchusersCount()
    // fetchdeliveryMenCount()
  }, [usersCount])

  useEffect(() => {
    const total = deliveryMenCount + usersCount + adminsCount
    setTotalUsersCount(total)
  }, [adminsCount, usersCount, deliveryMenCount])

  // useEffect(() => {
  //   const fetchAnalysisBookings = async () => {
  //     const res = await getMethod('/AnalysisBookings')
  //     if (res?.status == '404') {
  //       return navigate('/no-items?to=user-management/AnalysisBookings')
  //     }
  //     setAnalysisBookingsCount(res?.data?.data?.length)
  //     setAnalysisBookings(res?.data?.data?.slice(0, 3))
  //     console.log(res?.data?.data?.slice(0, 3))
  //   }

  //   fetchAnalysisBookings()
  // }, [])

  // useEffect(() => {
  //   const total = analysisBookingCount
  //   setTotalBookingCount(total)
  // }, [analysisBookingCount])


  return (
    <div id="kt_app_content_container" className="app-container  container-xxl ">
      <div className="row g-5 g-xl-10 mb-xl-10">
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-10 mb-xl-20">
          <DataCard
            title={t('Users Count')}
            cardData={{
              admin: {
                count: adminsCount,
                title: t('Admins'),
                bulletColor: "danger"
              },
              user: {
                count: usersCount,
                title: t('Users'),
                bulletColor: "primary"
              },
              doctor: {
                count: deliveryMenCount,
                title: t('Delivery Men'),
                bulletColor: "warning"
              }
            }}
            totalCount={totalUsersCount}
          />
          <NewUsersCard
            newusersCount={newusersCount}
            remainingNewusersCount={remainingNewusersCount}
            newusers={newusers}
            percentageIncrease={percentageIncrease}
          />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-10 mb-xl-20">
          <DataCard
            title={t('Orders')}
            cardData={{
              analysisBookings: {
                count: analysisBookingCount,
                title: t('The Individual Analyses'),
                bulletColor: "danger"
              }
            }}
            totalCount={totalBookingCount}
          />
        </div>
        {/* <div className="col-lg-12 col-xl-12 col-xxl-6 mb-0 pb-0">
          <MixedWidget10
            className='card-xl-stretch '
            chartColor='info'
            chartHeight='200px'
          />
        </div> */}
      </div>

      <div className="row gy-5 g-xl-10">
        {/* <RecentOrdersTable analysisBookings={analysisBookings} /> */}
      </div>
      <br /><br /><br />
    </div>

  );
};

const DashboardWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>{t('Dashboard')}</PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
