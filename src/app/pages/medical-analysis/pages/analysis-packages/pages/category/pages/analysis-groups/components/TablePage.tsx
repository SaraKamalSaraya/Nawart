import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {t} from 'i18next'
import getMethod from '../../../../../../../../../../functions/getMethod'
import deleteMethod from '../../../../../../../../../../functions/deleteMethod'
import SwalShowAlert from '../../../../../../../../../../functions/swal/SwalShowAlert'
import SwalConfirmAlert from '../../../../../../../../../../functions/swal/SwalConfirmAlert'
import formatDate from '../../../../../../../../../../functions/FormatDate'
import MainCustomTable from '../../../../../../../../../modules/MainCustomTable/MainCustomTable'
import TruncatedText from '../../../../../../../../../modules/MainCustomTable/TruncatedText'
import { Dropdown } from 'react-bootstrap'

export interface DataInterface {
  id:                  number;
  name:                string;
  price:               number;
  description:         string;
  instructions:        string;
  category:{
    id: number
    name: string
  };
  analysis_data: [{
    id: number
    title: string
  }]
  medical_services_id: number;
}





export default function AnalysisGroupsTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/analysis_groups')
      if (res?.status == '404') {
        return navigate('/no-items?to=medical-analysis/analysis-packages/group-categories/analysis-groups')
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
            await deleteMethod(`/analysis_groups/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
  const headers = ['#', 'Name', 'Price', 'Description', 'Instructions', 'Category', "Analyses"]


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
            <td>{item.price}</td>
            <td>{item.description}</td>
            <td><TruncatedText text={item.instructions} /></td>
            <td><Link to={`/medical-analysis/analysis-packages/group-categories/edit/${item.category.id}`}>{item.category.name}</Link></td>
            
            <td>

            <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic">{t('Analyses')}</Dropdown.Toggle>
              <Dropdown.Menu>
                {item.analysis_data?.map((item, index) => (
                  <Link className='dropdown-item' to={`/medical-analysis/individual-analyses/classification/individual-analyses/edit/${item.id}`}>{item.title}</Link>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
                  </td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}
