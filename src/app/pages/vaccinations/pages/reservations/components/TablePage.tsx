import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import getMethod from '../../../../../../functions/getMethod';
import deleteMethod from '../../../../../../functions/deleteMethod';
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert';
import SwalConfirmAlert from '../../../../../../functions/swal/SwalConfirmAlert';
import MainCustomTable from '../../../../../modules/MainCustomTable/MainCustomTable';
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';

interface DataInterface {
  id: number;
  user_id: any;
  vaccinations_ids: any[];
  medical_center: any;
  booking_date: string;
  status: string;
  notes: string;
  quantity: number;
  total_price: number;
}

export default function ReservationsTable() {
  const [data, setData] = useState<DataInterface[]>([]);
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/vaccinations_idsBookings')
      setData(res?.data?.data)
    };

    // fetchData();
  }, [trigger]);

  const handleDeleteAll = async (itemsToDelete: number[]) => {
    if (itemsToDelete.length > 0) {
      SwalConfirmAlert(['Are you sure you want to delete'], 'warning', async () => {
        for (const id of itemsToDelete) {
          await deleteMethod(`/vaccinations_idsBookings/${id}`);
        }
        SwalShowAlert('success', 'Deleted successfully');
        setTrigger(!trigger);
      });
    }
  };

  const headers = ['#', 'User', 'Vaccinations', 'Medical Center', 'Quantity', 'Total Price', 'Booking Date', 'Status', 'Notes'];
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
            title={item.user_id.id as any}
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa' }}
          >
            <td>{index + 1}</td>
            <td>
              <Link to={`/user-management/patient/edit/${item.user_id.id}`}>{item.user_id.first_name}{" "}{item.user_id.last_name}</Link>
            </td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">{t('Vaccination')}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {item.vaccinations_ids?.map((item, index) => (
                    <Link className='dropdown-item' to={`/vaccination/vaccinationPage/edit/${item.id}`}>{item.title}</Link>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {/* <Link to={`/visit-a-nurse/visits/edit/${item.vaccinations_ids.id}`}>{item.vaccinations_ids.main_title}</Link> */}
            </td>
            <td>
              <Link to={`/user_id-management/medical-centers/edit/${item.medical_center.id}`}>{item.medical_center.name}</Link>
            </td>
            <td>{item?.quantity}</td>
            <td>{item?.total_price}</td>
            <td>{item.booking_date}</td>
            <td>{t(`${item.status}`)}</td>
            <td>{item.notes}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  );
}
