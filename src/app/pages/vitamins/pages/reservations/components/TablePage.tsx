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
  user: any;
  nursing_task: any[];
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
      const res = await getMethod('/vitamins-bookings')
      setData(res?.data?.data)
      console.log(res)
    };

    fetchData();
  }, [trigger]);

  const handleDeleteAll = async (itemsToDelete: number[]) => {
    if (itemsToDelete.length > 0) {
      SwalConfirmAlert(['Are you sure you want to delete'], 'warning', async () => {
        for (const id of itemsToDelete) {
          await deleteMethod(`/vitamins-bookings/${id}`);
        }
        SwalShowAlert('success', 'Deleted successfully');
        setTrigger(!trigger);
      });
    }
  };

  const headers = ['#', 'User', 'Vitamins', 'Medical Center', 'Quantity', 'Total Price', 'Booking Date', 'Status', 'Notes'];
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
            key={item?.id}
            id={item?.id as any}
            title={item?.user?.id as any}
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa' }}
          >
            <td>{index + 1}</td>
            <td>
              <Link to={`/user-management/patient/edit/${item?.user?.id}`}>{item?.user?.first_name}{" "}{item?.user?.last_name}</Link>
            </td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">{t('Vitamins')}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {item.nursing_task?.map((item, index) => (
                    <Link className='dropdown-item' to={`/vitamins/vitaminsPage/edit/${item?.id}`}>{item?.main_title}</Link>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </td>
            <td>
              <Link to={`/user-management/medical-centers/edit/${item.medical_center?.id}`}>{item.medical_center?.name}</Link>
            </td>
            <td>{item?.quantity}</td>
            <td>{item?.total_price}</td>
            <td>{item?.booking_date}</td>
            <td>{t(`${item?.status}`)}</td>
            <td>{item?.notes}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  );
}
