import { ListViewProvider, useListView } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Admins_Headers, Banners_Headers, Categories_Headers, Delivery_Men_Headers, Food_Items_Headers, Offers_Headers, Order_Headers, Users_Headers, Invoice_Headers } from './components/headers';
import { Users_Columns, Admins_Columns, Delivery_Men_Columns, Offers_Columns, Banners_Columns, Categories_Columns, Food_Items_Columns, Order_Columns, Invoice_Columns } from './components/columns'
import { Admins_Data, Banners_Data, Categories_Data, Delivery_Men_Data, Food_Items_Data, Offers_Data, Order_Data, Users_Data, Invoice_Data } from './components/testData';
import MainCustomTable from '../../modules/MainCustomTable/MainCustomTable'
import SwalConfirmAlert from '../../../functions/swal/SwalConfirmAlert'
import deleteMethod from '../../../functions/deleteMethod'
import SwalShowAlert from '../../../functions/swal/SwalShowAlert'
import formatDate from '../../../functions/FormatDate';
import GetMethod from '../../../functions/getMethod';
import { useNavigate } from 'react-router-dom';


interface Data {
  id: number;
  [key: string]: any;
}

const API_URL = process.env.REACT_APP_API_URL
export const GET_ADMINS = `${API_URL}/admin`

const DataList = () => {
  const [trigger, setTrigger] = useState(false)
  const navigate = useNavigate()

  const [headers, setHeaders] = useState([''])
  const [columns, setColumns] = useState([''])
  const [title, setTitle] = useState('')
  const [data, setData] = useState<Data[]>([]);

  const params = window.location.pathname
  const pathSegments = params.split('/');
  const paramsValue = pathSegments && pathSegments.length >= 0 ? pathSegments[pathSegments.length - 1] : null;

  const fetchData = async (url: string) => {
    const res = await GetMethod(`/${url}`)
    // if (res?.status == '404') {
    //   return navigate(`/no-items?to=${url}`)
    // }
    setData(res?.data?.data?.reverse())
  }

  // Setting the data
  useEffect(() => {
    if (paramsValue === 'admins') {
      setHeaders(Admins_Headers)
      setColumns(Admins_Columns)
      setTitle(Admins_Columns[1])
      fetchData('admin')
    } else if (paramsValue === 'users') {
      setHeaders(Users_Headers)
      setColumns(Users_Columns)
      setTitle(Users_Columns[1])
      fetchData('user')
    } else if (paramsValue === 'deliveryMen') {
      setHeaders(Delivery_Men_Headers)
      setColumns(Delivery_Men_Columns)
      setTitle(Delivery_Men_Columns[0])
      setData(Delivery_Men_Data)
    } else if (paramsValue === 'offers') {
      setHeaders(Offers_Headers)
      setColumns(Offers_Columns)
      setTitle(Offers_Columns[0])
      setData(Offers_Data)
    } else if (paramsValue === 'banners') {
      setHeaders(Banners_Headers)
      setColumns(Banners_Columns)
      setTitle(Banners_Columns[1])
      setData(Banners_Data)
    } else if (paramsValue === 'categories') {
      setHeaders(Categories_Headers)
      setColumns(Categories_Columns)
      setTitle(Categories_Columns[1])
      fetchData('categories')
    } else if (paramsValue === 'foodItems') {
      setHeaders(Food_Items_Headers)
      setColumns(Food_Items_Columns)
      setTitle(Food_Items_Columns[1])
      setData(Food_Items_Data)
    } else if (paramsValue === 'all') { // ---- Order
      setHeaders(Order_Headers)
      setColumns(Order_Columns)
      setTitle(Order_Columns[1])
      setData(Order_Data)
    } else if (paramsValue === 'invoices') { // ---- Invoices
      setHeaders(Invoice_Headers)
      setColumns(Invoice_Columns)
      setTitle(Invoice_Columns[0])
      setData(Invoice_Data)
    } else {
      setHeaders([])
      setColumns([])
      setTitle('')
      setData([])
    }
  }, [params, trigger]);

  const handleDeleteAll = async (itemsToDelete: number[]) => {
    if (itemsToDelete.length > 0) {
      SwalConfirmAlert(
        ['Are you sure you want to delete'],
        'warning',
        async () => {
          for (const id of itemsToDelete) {
            if (paramsValue === 'admins') await deleteMethod(`/admin/${id}`)
            else if (paramsValue === 'users') await deleteMethod(`/user/${id}`)
            else if (paramsValue === 'categories') await deleteMethod(`/categories/${id}`)
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
        showSendNotification={paramsValue === 'all' ? true : false}
        showPagination={true}
        showSearch={true}
        onDelete={handleDeleteAll}
        data={data}
      >
        {data?.map((item, index) => (
          <tr
            key={item.id}
            id={item.id as any}
            title={item[title]}
            style={{ backgroundColor: index % 2 === 0 ? 'white' : '#eef9fa' }}
          >
            <td>{index + 1}</td>
            {columns?.map((column, index_number) => (
              <td key={index_number}>
                {column === 'image' ? <img src={item[column]} alt="Image" style={{ width: '100px' }} /> 
                : column === 'created_at' ||  column === 'updated_at' ?
                formatDate(item[column])
                :
                  (item[column]?.length > 20 ? item[column].substring(0, 15) + ' ...' : item[column])
                }
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