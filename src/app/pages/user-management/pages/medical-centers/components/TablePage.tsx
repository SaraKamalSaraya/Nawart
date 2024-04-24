import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {t} from 'i18next'
import getMethod from '../../../../../../functions/getMethod'
import deleteMethod from '../../../../../../functions/deleteMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import SwalConfirmAlert from '../../../../../../functions/swal/SwalConfirmAlert'
import formatDate from '../../../../../../functions/FormatDate'
import MainCustomTable from '../../../../../modules/MainCustomTable/MainCustomTable'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import TruncatedText from '../../../../../modules/MainCustomTable/TruncatedText'

export interface DataInterface {
  id:                 number;
  name:               string;
  phone:              string;
  email:              string;
  price:              number;
  description:        string;
  created_at:         string;
  updated_at:         string;
}





export default function MedicalCentersTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/medical_centers')
      console.log(res)  
      if (res?.status == '404') {
        return navigate('/no-items?to=user-management/medical-centers')
      }
      setData(res?.data?.medical_centers)
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
            await deleteMethod(`/medical_centers/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
  const headers = ['#','Name', 'Email', 'Phone', 'Description', 'Price',  'Joined At']


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
            title={item.name}
            style={{backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa'}}
          >
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td><TruncatedText text={item.description} /></td>
            <td>{item.price}</td>
            <td>{formatDate(item.created_at)}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}


