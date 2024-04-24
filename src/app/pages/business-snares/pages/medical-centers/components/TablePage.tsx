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
  medical_center: {
    id: number
    name: string
  };
  businessSnares: {
    id: number
    title: string
  };
  price: string;
  created_at: string;
  updated_at: string;
}


export default function MedicalCenterTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/businessSnares-medical-center')
      // if (res?.status == '404') {
      //   return navigate('/no-items?to=medical-businessSnares/businessSnares-centers/businessSnares')
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
            await deleteMethod(`/medical-center-businessSnares/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
  const headers = ['#', 'Medical Center', 'Business Snare', 'Created At', 'Updated At']

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
            title={item.medical_center.name as any}
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa' }}
          >
            <td>{index + 1}</td>
            <td><Link to={`/user-management/medical-centers/edit/${item.medical_center.id}`}>{item.medical_center.name}</Link></td>
            <td><Link to={`/business-snares/businessSnaresPage/edit/${item.businessSnares.id}`}>{item.businessSnares.title}</Link></td>
            <td>{formatDate(item.created_at)}</td>
            <td>{formatDate(item.updated_at)}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}
