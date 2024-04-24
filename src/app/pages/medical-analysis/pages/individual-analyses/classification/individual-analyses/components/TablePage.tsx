import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {t} from 'i18next'
import getMethod from '../../../../../../../../functions/getMethod'
import deleteMethod from '../../../../../../../../functions/deleteMethod'
import SwalShowAlert from '../../../../../../../../functions/swal/SwalShowAlert'
import SwalConfirmAlert from '../../../../../../../../functions/swal/SwalConfirmAlert'
import formatDate from '../../../../../../../../functions/FormatDate'
import MainCustomTable from '../../../../../../../modules/MainCustomTable/MainCustomTable'
import TruncatedText from '../../../../../../../modules/MainCustomTable/TruncatedText'

export interface DataInterface {
  id: number
  tasnif: {
    id: number
    name : string
  }
  title: string
  price: number
  description: string
  sample: string
  instructions: string
  medical_services: {
    id : number
    title : string
  }
  created_at: string
  updated_at: string
}

export default function IndividualAnalysesTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/analyses')
      if (res?.status == '404') {
        return navigate('/no-items?to=medical-analysis/individual-analyses/classification/individual-analyses')
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
            await deleteMethod(`/analyses/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
  const headers = ['#',"Classification","Medical Service", "Title" ,"Price" , "Description","Sample", "Instructions"  ,'Created At', 'Updated At']



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
            <td><Link to={`/medical-analysis/individual-analyses/classification/edit/${item.tasnif.id}`}>{item.tasnif.name}</Link></td>
            <td><Link to={`/medical-services/edit/${item.medical_services.id}`}>{item.medical_services.title}</Link></td>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td><TruncatedText text={item.description} /></td>
            <td>{item.sample}</td>
            <td><TruncatedText text={item.instructions} /></td>
            <td>{formatDate(item.created_at)}</td>
            <td>{formatDate(item.updated_at)}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}
