import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import getMethod from '../../../../../../functions/getMethod'
import deleteMethod from '../../../../../../functions/deleteMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import SwalConfirmAlert from '../../../../../../functions/swal/SwalConfirmAlert'
import formatDate from '../../../../../../functions/FormatDate'
import MainCustomTable from '../../../../../modules/MainCustomTable/MainCustomTable'

export interface DataInterface {
  id: number;
  medical_center_id: number;
  medical_center_name: string;
  vitamis_id: number;
  vitamis_title: string;
  price: string;
}

export default function MedicalCenterTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/medical-center-vitamins')
      // if (res?.status == '404') {
      //   return navigate('/no-items?to=visit-a-nurse/medical-centers/medical-center-nursing-tasks')
      // }
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
            await deleteMethod(`/medical-center-vitamins/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
  const headers = ['#', 'Medical Center', 'Vitamins', 'Price']

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
            title={item.medical_center_name as any}
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa' }}
          >
            <td>{index + 1}</td>
            <td><Link to={`/user-management/medical-centers/edit/${item.medical_center_id}`}>{item.medical_center_name}</Link></td>
            <td><Link to={`/vitamins/vitaminsPage/edit/${item.vitamis_id}`}>{item.vitamis_title}</Link></td>
            <td>{item?.price}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}
