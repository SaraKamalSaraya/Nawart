import { ListViewProvider, useListView } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { KTCard } from '../../../_metronic/helpers'
import { useEffect, useState } from 'react';
import { Users_Columns, Admins_Columns, Pilots_Columns } from './components/columns'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import MainCustomTable from '../../modules/MainCustomTable/MainCustomTable'
import SwalConfirmAlert from '../../../functions/swal/SwalConfirmAlert'
import deleteMethod from '../../../functions/deleteMethod'
import SwalShowAlert from '../../../functions/swal/SwalShowAlert'
import formatDate from '../../../functions/FormatDate';
import { Admins_Data, Pilots_Data, Users_Data } from './components/testData';
import { Admins_Headers, Pilots_Headers, Users_Headers } from './components/headers';


interface Data {
  id: number;
  [key: string]: any;
}

const DataList = () => {
  const [trigger, setTrigger] = useState(false)
  const [headers, setHeaders] = useState([''])
  const [columns, setColumns] = useState([''])

  const [title, setTitle] = useState('')
  const [data, setData] = useState<Data[]>([]);

  const params = useParams();
  const paramsValue = params['*'];

  // Setting the data
  useEffect(() => {
    if (paramsValue === 'admins') {
      setHeaders(Admins_Headers)
      setColumns(Admins_Columns)
      setTitle(Admins_Columns[0])
      setData(Admins_Data)
    } else if (paramsValue === 'users') {
      setHeaders(Users_Headers)
      setColumns(Users_Columns)
      setTitle(Users_Columns[0])
      setData(Users_Data)
    } else if (paramsValue === 'pilots') {
      setHeaders(Pilots_Headers)
      setColumns(Pilots_Columns)
      setTitle(Pilots_Columns[0])
      setData(Pilots_Data)
    } else {
      setHeaders([])
      setColumns([])
      setTitle('')
      setData([])
    }
  }, [paramsValue]);

  const handleDeleteAll = async (itemsToDelete: number[]) => {
    if (itemsToDelete.length > 0) {
      SwalConfirmAlert(
        ['Are you sure you want to delete'],
        'warning',
        async () => {
          for (const id of itemsToDelete) {
            await deleteMethod(`/admins/${id}`)
          }

          SwalShowAlert('success', 'Deleted successfully')
          setTrigger(!trigger)
        }
      )
    }
  }
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
            title={title}
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa' }}
          >
            <td>{index + 1}</td>
            {columns.map((column, index_number) => (
              <td key={index_number}>
                {item[column]}
              </td>
            ))}
          </tr>
        ))}
      </MainCustomTable>
    </>
  );
};

const DataListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <DataList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { DataListWrapper };