import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import getMethod from '../../../../functions/getMethod';

interface UserData {
  id: number;
  first_name: string;
  image: string;
}

interface UsersCardProps {
  newPatientsCount: number;
  remainingNewPatientsCount: number;
  newPatients: UserData[];
  percentageIncrease: number;
}

const NewUsersCard: React.FC<UsersCardProps> = ({
  newPatientsCount,
  remainingNewPatientsCount,
  newPatients,
  percentageIncrease
}) => {
  const navigate = useNavigate()
  return (
    <div className="card card-flush h-md-50 mb-xl-10">
      <div className="card-header pt-5">
        <div className="card-title d-flex flex-column">
          <div className="d-flex align-items-center">
            <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">{newPatientsCount} </span>
            <span className="badge badge-light-danger fs-base">
              <i className="ki-duotone ki-arrow-down fs-5 text-danger ms-n1"><span className="path1" /><span className="path2" /></i>
              {percentageIncrease}%
            </span>
          </div>



          <span className="text-gray-500 pt-1 fw-semibold fs-6">{t('New Patients This Month')} </span>
        </div>
      </div>
      <div className="card-body d-flex flex-column justify-content-end mx-35 w-100">
        <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">{t('New Patients')} </span>
        {/*begin::Users group*/}
        <div className="symbol-group symbol-hover flex-nowrap">
          {newPatients?.map((item, index) => {
            return (
              <div className="symbol symbol-55px symbol-circle" key={index}>
                <span
                  className="symbol-label text-inverse-warning text-dark"
                  style={{
                    backgroundColor: '#8DCED4', // if no image
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    fontWeight: '900'
                  }}
                >
                  {item.first_name.slice(0, 7)}
                </span>
              </div>
            )
          })}
          {
            remainingNewPatientsCount > 0 &&
            <div className="symbol symbol-55px symbol-circle" onClick={() => navigate('/user-management/patient')}>
              <span className="symbol-label bg-light text-gray-400 fs-8 fw-bold">+ {remainingNewPatientsCount} </span>
            </div>
          }

        </div>
        {/*end::Users group*/}
      </div >
      {/*end::Card body*/}
    </div >
  );
};


export { NewUsersCard };
