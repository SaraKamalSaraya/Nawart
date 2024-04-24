import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {t} from 'i18next'
import getMethod from '../../../../../../functions/getMethod'
import deleteMethod from '../../../../../../functions/deleteMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import SwalConfirmAlert from '../../../../../../functions/swal/SwalConfirmAlert'
import formatDate from '../../../../../../functions/FormatDate'
import MainCustomTable from '../../../../../modules/MainCustomTable/MainCustomTable'

export interface DataInterface {
  id:                number;
  first_name:        string;
  last_name:         string;
  image:             string;
  email:             string;
  email_verified_at: string;
  phone:             string;
  blood_type:        string;
  nationality:       string;
  national_id:       number;
  birth_date:        string;
  age:               string;
  gender:            string;
  created_at:        string;
  updated_at:        string;
}


export default function PatientsTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/user')
      if (res?.status == '404') {
        return navigate('/no-items?to=user-management/patient')
      }
      setData(res?.data?.data)
    }

    fetchData()
  }, [trigger])

  const handleDeleteAll = async (itemsToDelete: number[]) => {
    if (itemsToDelete.length > 0) {
      SwalConfirmAlert(
        ['Are you sure you want to delete'],
        'warning',
        async () => {
          for (const id of itemsToDelete) {
            await deleteMethod(`/user/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
  const headers = ['#','Image', 'Full Name', 'Email', 'Phone','Blood Type', 'Nationality', 'National ID',  'Birth Date', 'Age', 'Gender', 'Verified At', 'Joined At']


  return (
    <>
      <MainCustomTable
        headers={headers}
        showAdd={true}
        showEdit={true}
        showDelete={true}
        showPagination={true}
        showSearch={true}
        onDelete={handleDeleteAll}
        data={data}
      >
        {data?.map((item, index) => (
          <tr
            key={item.id}
            id={item.id as any}
            title={item.first_name}
            style={{backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa'}}
          >
            <td>{index + 1}</td>
            <td>
              <img
                style={{width: '50px', height: '50px', borderRadius: '50%'}}
                src={`${item.image}`}
                alt='image'
              />{' '}
            </td>
            <td>{item.first_name} {item.last_name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.blood_type}</td>
            <td>{item.nationality}</td>
            <td>{item.national_id}</td>
            <td>{formatDate(item.birth_date)}</td>
            <td>{item.age}</td>
            <td>{item.gender}</td>
            <td>
              {item.email_verified_at ? formatDate(item.email_verified_at) : t('Not Verified')}
            </td>
            <td>{formatDate(item.created_at)}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}
