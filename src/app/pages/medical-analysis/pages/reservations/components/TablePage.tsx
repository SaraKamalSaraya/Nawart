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

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

interface Analysis {
  id: number;
  title: string;
}

interface MedicalCenter {
  id: number;
  name: string;
}
interface AnalysisGroup {
  id: number;
  name: string;
}

interface DataInterface {
  id: number;
  user: User;
  analysis: Analysis;
  analysis_group: AnalysisGroup;
  medical_center: MedicalCenter;
  booking_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string
}

export default function ReservationsTable() {
  const [data, setData] = useState<DataInterface[]>([]);
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMethod('/AnalysisBookings')
      if (res?.status == '404') {
        return navigate('/no-items?to=AnalysisBookings')
      }
      const formattedData = res?.data?.data?.map((item: any) => ({
        id: item.id,
        user: {
          first_name: item?.user?.first_name,
          last_name: item?.user?.last_name,
          id: item?.user?.id,
        },
        analysis: {
          title: item?.analysis?.title,
          id: item?.analysis?.id,
        },
        analysis_group: {
          name: item?.analysis_group?.name,
          id: item?.analysis_group?.id,
        },
        medical_center: {
          name: item?.medical_center?.name,
          id: item?.medical_center?.id,
        },
        booking_date: item?.booking_date,
        status: item?.status,
        notes: item?.notes,
      }));

      setData(formattedData);
    };

    fetchData();
  }, [trigger]);

  const handleDeleteAll = async (itemsToDelete: number[]) => {
    if (itemsToDelete.length > 0) {
      SwalConfirmAlert(['Are you sure you want to delete'], 'warning', async () => {
        for (const id of itemsToDelete) {
          await deleteMethod(`/AnalysisBookings/${id}`);
        }
        SwalShowAlert('success', 'Deleted successfully');
        setTrigger(!trigger);
      });
    }
  };

  const headers = ['#', 'User', 'Analyses', 'Analyses Groups', 'Medical Center', 'Booking Date', 'Status', 'Notes'];
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
            title={item.user as any}
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa' }}
          >
            <td>{index + 1}</td>
            <td>
              <Link to={`/user-management/patient/edit/${item.user.id}`}>{item.user.first_name}{" "}{item.user.last_name}</Link>
            </td>
            <td>
              {/* <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">{t('Analyses Groups')}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {item.analyses?.map((item, index) => (
                    <Link className='dropdown-item' to={`/medical-analysis/individual-analyses/classification/individual-analyses/edit/${item.analysis.id}`}>{item.analysis.title}</Link>
                  ))}
                </Dropdown.Menu>
              </Dropdown> */}
              <Link to={`/medical-analysis/individual-analyses/classification/individual-analyses/edit/${item.analysis.id}`}>{item.analysis.title}</Link>
            </td>
            <td>
              {/* <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">{t('Analyses')}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {item.analysesGroups?.map((item, index) => (
                    <Link className='dropdown-item' to={`/medical-analysis/individual-analyses/classification/individual-analyses/edit/${item.analysis.id}`}>{item.analysis.title}</Link>
                  ))}
                </Dropdown.Menu>
              </Dropdown> */}
              <Link to={`/medical-analysis/medical-analysis/analysis-packages/group-categories/analysis-groups/edit/${item.analysis_group.id}`}>{item.analysis_group.name}</Link>
            </td>
            <td>
              <Link to={`/user-management/medical-centers/edit/${item.medical_center.id}`}>{item.medical_center.name}</Link>
            </td>
            <td>{item.booking_date}</td>
            <td>{t(`${item.status}`)}</td>
            <td>{item.notes}</td>
          </tr>
        ))}
      </MainCustomTable>
    </>
  );
}
