import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {t} from 'i18next'
import getMethod from '../../../../../../functions/getMethod'
import deleteMethod from '../../../../../../functions/deleteMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import SwalConfirmAlert from '../../../../../../functions/swal/SwalConfirmAlert'
import formatDate from '../../../../../../functions/FormatDate'
import MainCustomTable from '../../../../../modules/MainCustomTable/MainCustomTable'
import {Dropdown} from 'react-bootstrap'

export interface DataInterface {
  id: number
  title: string
  icon: string
  analyses: any[]
  analysis_group: any[]
  created_at: string
  updated_at: string
}

export default function BodyFunctionsTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/body_functions')
      if (res?.status == '404') {
        return navigate('/no-items?to=medical-analysis/body-functions')
      }
      setData(res?.data.bodyFunctions)
    }

    fetchData()
  }, [trigger])

  const handleDeleteAll = async (itemsToDelete: number[]) => {
    if (itemsToDelete.length > 0) {
      SwalConfirmAlert(['Are you sure you want to delete'], 'warning', async () => {
        for (const id of itemsToDelete) {
          await deleteMethod(`/body_functions/${id}`)
        }

        SwalShowAlert('success', 'Deleted successfully')
        setTrigger(!trigger)
      })
    }
  }
  const headers = ['#', 'Icon', 'Title', 'Analyses', 'Analysis Groups', 'Created At', 'Updated At']

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
            <td>
              <img
                style={{width: '50px', height: '50px', borderRadius: '50%'}}
                src={`${item.icon}`}
                alt='icon'
              />{' '}
            </td>
            <td>{item.title}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant='none' id='dropdown-basic'>
                  {t('Analyses')}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {item.analyses?.map((item, index) => (
                    <Link
                      className='dropdown-item'
                      to={`/medical-analysis/individual-analyses/classification/individual-analyses/edit/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </td>

            <td>
              <Dropdown>
                <Dropdown.Toggle variant='none' id='dropdown-basic'>
                  {t('Analysis Groups')}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {item.analysis_group?.map((item, index) => (
                    <Link
                      className='dropdown-item'
                      to={`/medical-analysis/analysis-packages/group-categories/analysis-groups/edit/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </td>

            <td>{formatDate(item.created_at)}</td>
            <td>{formatDate(item.updated_at)}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}
