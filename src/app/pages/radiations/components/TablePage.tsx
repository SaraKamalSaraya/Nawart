import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import getMethod from '../../../../functions/getMethod'
import deleteMethod from '../../../../functions/deleteMethod'
import SwalShowAlert from '../../../../functions/swal/SwalShowAlert'
import SwalConfirmAlert from '../../../../functions/swal/SwalConfirmAlert'
import formatDate from '../../../../functions/FormatDate'
import MainCustomTable from '../../../modules/MainCustomTable/MainCustomTable'
import TruncatedText from '../../../modules/MainCustomTable/TruncatedText'
import GetMethod from '../../../../functions/getMethod'

export interface DataInterface {
  id: number;
  title: string;
  image: string;
  description: string;
  features: string[];
  medical_services_id: number;
}


export default function RadiationsTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [medicalServiceList, setMedicalServiceList] = useState<any[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMedicalServiceList = async () => {
      const res = await GetMethod(`/medical_services`)
      setMedicalServiceList(res?.data?.data)
    }
    fetchMedicalServiceList()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/radiations')
      if (res?.status == '404') {
        return navigate('/no-items?to=radiations')
      }
      setData(res?.data?.data)
    }

    fetchData()
  }, [trigger])

  function getMedicalServiceTitle(userId: number) {
    const item = medicalServiceList.find(user => user.id === userId);
    if (item) {
      return `${item.title}`;
    } else {
      return ' ';
    }
  }

  const handleDeleteAll = async (itemsToDelete: number[]) => {
    if (itemsToDelete.length > 0) {
      SwalConfirmAlert(
        ['Are you sure you want to delete'],
        'warning',
        async () => {
          for (const id of itemsToDelete) {
            await deleteMethod(`/radiations/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
  const headers = ['#', 'Image', 'Title', 'Description', 'Features', 'Medical Services']


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
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa' }}
          >
            <td>{index + 1}</td>
            <td><img src={item.image} alt={item.title} style={{ width: '50px', height: '50px' }} /></td>
            <td>{item.title}</td>
            <td><TruncatedText text={item.description} /></td>
            {/* <td><TruncatedText text={item.features?.join(', ')} /></td> */}
            <td>
              {/* {item.medical_services_id} */}
              <Link to={`/medical-services/edit/${item.medical_services_id}`}>
                {getMedicalServiceTitle(item.medical_services_id)}
              </Link>
            </td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}
