import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {t} from 'i18next'
import getMethod from '../../../../functions/getMethod'
import deleteMethod from '../../../../functions/deleteMethod'
import SwalShowAlert from '../../../../functions/swal/SwalShowAlert'
import SwalConfirmAlert from '../../../../functions/swal/SwalConfirmAlert'
import formatDate from '../../../../functions/FormatDate'
import MainCustomTable from '../../../modules/MainCustomTable/MainCustomTable'
import TruncatedText from '../../../modules/MainCustomTable/TruncatedText'
import GetMethod from '../../../../functions/getMethod'

export interface DataInterface {
  id:                number;
  country:           string;
  state:             string;
  city:              string;
  full_address:      string;
  // latitude:          string;
  // longitude:         string;
  user_id:           number;
  created_at:        string;
  updated_at:        string;
}


export default function VaccinationsTable() {
  const [data, setData] = useState<DataInterface[]>([])
  const [usersList, setUsersList] = useState<any[]>([])
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchUsers = async () => {
      const res = await GetMethod(`/user`)
      setUsersList(res?.data?.data)
    }
    fetchUsers()
  },[])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/addresses')
      if (res?.status == '404') {
        return navigate('/no-items?to=addresses')
      }
      setData(res?.data?.addresses)
    }

    fetchData()
  }, [trigger])

  function getUserFullName(userId: number) {
    const user = usersList.find(user => user.id === userId);
    if (user) {
      return `${user.first_name} ${user.last_name}`;
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
            await deleteMethod(`/addresses/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
  const headers = ['#','Country', 'State', 'City', 'Full Address', 'User', 'Created At', 'Updated At']



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
            title={item.country}
            style={{backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa'}}
          >
          <td>{index + 1}</td>
            <td>{item.country}</td>
            <td>{item.state}</td>
            <td>{item.city}</td>
            <td><TruncatedText text={item.full_address} /></td>
            {/* <td>{item.latitude}</td>
            <td>{item.longitude}</td> */}
            <td><Link to={`/user-management/patient/edit/${item.user_id}`}>
              {/* {item.user_id} */}
              {getUserFullName(item.user_id)}
              </Link></td>
            <td>{formatDate(item.created_at)}</td>
            <td>{formatDate(item.updated_at)}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  )
}
