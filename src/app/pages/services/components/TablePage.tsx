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
  instructions:          string[];
  created_at:        string;
  updated_at:        string;
}

export default function ServicessTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/services')
      if (res?.status == '404') {
        return navigate('/no-items?to=services')
      }
      setData(res?.data?.services)
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
            await deleteMethod(`/services/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
  const headers = ['#', 'Image','Title', 'Description','Instructions' , 'Created At', 'Updated At']


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
            <td><img src={item.image} alt={item.title} style={{width: '100px', height: '100px'}} /></td>
            <td>{item.title}</td>
            <td><TruncatedText text={item.description} /></td>
            <td><TruncatedText text={item.instructions.join(', ')} /></td>
            <td>{formatDate(item.created_at)}</td>
            <td>{formatDate(item.updated_at)}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}
