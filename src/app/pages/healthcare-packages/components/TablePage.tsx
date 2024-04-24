import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {t} from 'i18next'
import getMethod from '../../../../functions/getMethod'
import deleteMethod from '../../../../functions/deleteMethod'
import SwalShowAlert from '../../../../functions/swal/SwalShowAlert'
import SwalConfirmAlert from '../../../../functions/swal/SwalConfirmAlert'
import formatDate from '../../../../functions/FormatDate'
import MainCustomTable from '../../../modules/MainCustomTable/MainCustomTable'
import TruncatedText from '../../../modules/MainCustomTable/TruncatedText'

export interface DataInterface {
  id:                number;
  image:             string;
  title:             string;
  description:       string;
  nationality :      string;
  instructions:      string;
  features:          string[];
  medical_services_id : number;
  created_at:        string;
  updated_at:        string;
}




export default function HealthcarePackagesTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/healthcare_packages')
      if (res?.status == '404') {
        return navigate('/no-items?to=healthcare-packages')
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
            await deleteMethod(`/healthcare_packages/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
  const headers = ['#','Image', 'Title', 'Description', 'Features', 'Nationality', 'Instructions',  'Medical Service', 'Created At', 'Updated At']


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
            title={item.title}
            style={{backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa'}}
          >
          <td>{index + 1}</td>
            <td><img src={item.image} alt="image" width={50} height={50} /></td>
            <td>{item.title}</td>
            <td><TruncatedText text={item.description} /></td>
            <td><TruncatedText text={item.features.join(', ')} /></td>
            <td>{item.nationality}</td>
            <td><TruncatedText text={item.instructions} /></td>
            <td>{item.medical_services_id}</td>
            <td>{formatDate(item.created_at)}</td>
            <td>{formatDate(item.updated_at)}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}
