import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {t} from 'i18next'
import getMethod from '../../../../../../../functions/getMethod'
import deleteMethod from '../../../../../../../functions/deleteMethod'
import SwalShowAlert from '../../../../../../../functions/swal/SwalShowAlert'
import SwalConfirmAlert from '../../../../../../../functions/swal/SwalConfirmAlert'
import formatDate from '../../../../../../../functions/FormatDate'
import MainCustomTable from '../../../../../../modules/MainCustomTable/MainCustomTable'

export interface DataInterface {
  id:                number;
  name:        string;
  icon:             string;
  created_at:        string;
  updated_at:        string;
}

export default function ClassificationsTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/tasnif')
      if (res?.status == '404') {
        return navigate('/no-items?to=medical-analysis/individual-analyses/classification')
      }
      setData(res?.data?.data)
    }

    fetchData()
  }, [trigger])

  const handleDeleteAll = async (itemsToDelete: number[]) => {
    if (itemsToDelete.length > 0) {
      SwalConfirmAlert(
        ['Are you sure you want to delete', itemsToDelete.length, 'Classifications'],
        'warning',
        async () => {
          for (const id of itemsToDelete) {
            await deleteMethod(`/tasnif/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
  const headers = ['#', 'Icon', 'Name',  'Created At', 'Updated At']


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
            <td>
              <img
                style={{width: '50px', height: '50px', borderRadius: '50%'}}
                src={`${item.icon}`}
                alt='icon'
              />{' '}
            </td>
            <td>{item.name}</td>
            <td>{formatDate(item.created_at)}</td>
            <td>{formatDate(item.updated_at)}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}
