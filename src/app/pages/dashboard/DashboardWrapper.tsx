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
  first_name: string;
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
  const [patientsCount, setPatientsCount] = useState<number>(0);
  const [doctorsCount, setDoctorsCount] = useState<number>(0);
  const [medicalCentersCount, setMedicalCentersCount] = useState<number>(0);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);

  // New users card
  const [newPatientsCount, setNewPatientsCount] = useState<number>(0);
  const [remainingNewPatientsCount, setRemainingNewPatientsCount] = useState<number>(0);
  const [newPatients, setNewPatients] = useState<UserData[]>([]);
  const [percentageIncrease, setPercentageIncrease] = useState<number>(0);

  // Reservasions Card
  const [analysisBookings, setAnalysisBookings] = useState<AnalysisBookings[]>([]);
  const [analysisBookingCount, setAnalysisBookingsCount] = useState<number>(0);
  const [totalBookingCount, setTotalBookingCount] = useState<number>(0);


  const navigate = useNavigate()
  useEffect(() => {
    const fetchAdminsCount = async () => {
      const res = await getMethod('/admins')
      if (res?.status == '404') {
        return navigate('/no-items?to=user-management/admin')
      }
      setAdminsCount(res?.data?.admins?.length)
    }
    const fetchPatientsCount = async () => {
      const res = await getMethod('/user')
      if (res?.status == '404') {
        return navigate('/no-items?to=user-management/admin')
      }
      setPatientsCount(res?.data?.data?.length)

      // Get New Users count <last month>
      const filteredData = res?.data?.data?.filter((item: any) => {
        const createdAtDate = new Date(item.created_at);
        const currentDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return createdAtDate >= oneMonthAgo && createdAtDate <= currentDate;
      });
      setNewPatientsCount(filteredData?.length);

      // Set last 4 New Patients data
      const lastFourNewPatients = filteredData?.slice(-5);
      const remainingCount = Math.max(0, filteredData?.length - 5);
      setNewPatients(lastFourNewPatients)
      setRemainingNewPatientsCount(remainingCount)

      // Calculate percentage increase
      if (patientsCount === 0) {
        setPercentageIncrease(0);
      } else {
        const increase = patientsCount - newPatientsCount;
        const percentage = (increase / patientsCount) * 100;
        setPercentageIncrease(Math.max(0, percentage));
      }
    }
    const fetchDoctorsCount = async () => {
      const res = await getMethod('/doctors')
      if (res?.status == '404') {
        return navigate('/no-items?to=user-management/admin')
      }
      setDoctorsCount(res?.data?.Doctors?.length)
    }
    const fetchMedicalCentersCount = async () => {
      const res = await getMethod('/medical_centers')
      if (res?.status == '404') {
        return navigate('/no-items?to=user-management/admin')
      }
      setMedicalCentersCount(res?.data?.medical_centers?.length)
    }

    fetchAdminsCount()
    fetchPatientsCount()
    fetchDoctorsCount()
    fetchMedicalCentersCount()
  }, [patientsCount])

  useEffect(() => {
    const total = medicalCentersCount + doctorsCount + patientsCount + adminsCount
    setTotalUsersCount(total)
  }, [adminsCount, patientsCount, doctorsCount, medicalCentersCount])

  useEffect(() => {
    const fetchAnalysisBookings = async () => {
      const res = await getMethod('/AnalysisBookings')
      if (res?.status == '404') {
        return navigate('/no-items?to=user-management/AnalysisBookings')
      }
      setAnalysisBookingsCount(res?.data?.data?.length)
      setAnalysisBookings(res?.data?.data?.slice(0, 3))
      console.log(res?.data?.data?.slice(0, 3))
    }

    fetchAnalysisBookings()
  }, [])

  useEffect(() => {
    const total = analysisBookingCount
    setTotalBookingCount(total)
  }, [analysisBookingCount])


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
              patient: {
                count: patientsCount,
                title: t('Patients'),
                bulletColor: "primary"
              },
              doctor: {
                count: doctorsCount,
                title: t('Doctors'),
                bulletColor: "warning"
              },
              medicalCenter: {
                count: medicalCentersCount,
                title: t('Medical Centers'),
                bulletColor: "success"
              }
            }}
            totalCount={totalUsersCount}
          />
          <NewUsersCard
            newPatientsCount={newPatientsCount}
            remainingNewPatientsCount={remainingNewPatientsCount}
            newPatients={newPatients}
            percentageIncrease={percentageIncrease}
          />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-10 mb-xl-20">
          <DataCard
            title={t('Reservasion')}
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
