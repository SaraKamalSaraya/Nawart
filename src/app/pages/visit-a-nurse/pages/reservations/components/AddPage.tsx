import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import postMethod from '../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../functions/getMethod'

interface FormDataInterface {
  id: number;
  user_id: number;
  nursing_tasks: any[];
  medical_center: any;
  booking_date: string;
  status: string;
  notes: string;
  quantity: number;
  total_price: number;
}

interface NursingTask {
  id: number;
  price: number;
  main_title: string;
}

export default function AddReservationsPage() {
  const [formData, setFormData] = useState<FormDataInterface>({ id: 0, user_id: 0, quantity: 1, total_price: 0, nursing_tasks: [0] } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [nursingTasksList, setNursingTasksList] = useState<NursingTask[]>([]);
  const [medicalCentersList, setMedicalCentersList] = useState([])


  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await GetMethod(`/user`)
      setUsersList(res?.data.data)
    }
    const fetchnursing_tasks = async () => {
      const res = await GetMethod(`/nursing_tasks`)
      setNursingTasksList(res?.data.data)
    }
    const fetchMedicalCenters = async () => {
      const res = await GetMethod(`/medical_centers`)
      setMedicalCentersList(res?.data.medical_centers)
    }

    fetchUsers()
    fetchnursing_tasks()
    fetchMedicalCenters()
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handelAddNursingTasksId = () => {
    setFormData((prevState) => ({
      ...prevState,
      nursing_tasks: [...prevState.nursing_tasks, 0],
    }))
  }

  const handelRemoveNursingTasksId = (index: number) => {
    const newNursingTasksId = [...formData.nursing_tasks]
    newNursingTasksId.splice(index, 1)
    setFormData((prevState) => ({
      ...prevState,
      nursing_tasks: newNursingTasksId,
    }))
  }

  const handelChangeNursingTasksId = (e: any, index: number) => {
    const value = parseInt(e.target.value)
    const newNursingTasksId = [...formData.nursing_tasks]
    newNursingTasksId[index] = value
    setFormData((prevState) => ({
      ...prevState,
      nursing_tasks: newNursingTasksId,
    }))
  }

  const handleTotalPrice = () => {
    const total_price = formData?.nursing_tasks?.reduce((acc, id) => {
      const task = nursingTasksList.find((item) => item.id === parseInt(id));
      return acc + (task ? parseFloat(task.price.toString()) : 0)
    }, 0);
    return total_price
  }

  useEffect(() => {
    const totalPrice = handleTotalPrice()
    const totalQuantity = formData?.nursing_tasks?.length
    setFormData((prevState) => ({
      ...prevState,
      total_price: totalPrice,
      quantity: totalQuantity
    }))
  }, [formData.nursing_tasks])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const emptyFields = Object.entries(formData).some(([key, value]) => {
      return String(value).trim() === '';
    });
    if (emptyFields) {
      alert(t('Please Enter All Data'));
      setLoading(false);
      return;
    }

    const response = await postMethod(`/nursing-task-bookings`, formData)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Created successfully')

      setFormData({} as FormDataInterface)
      navigate('/visit-a-nurse/reservations')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Add Visit A Nurse Reservasion')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='user_id'>
            <Form.Label>{t('Patient')}</Form.Label>
            <Form.Select
              value={formData.user_id}
              onChange={handleChange}
              id='user_id'
            >
              <option value=''>{t('Select')}</option>
              {usersList?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {' '}
                  {item.first_name}{' '}{item.last_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='medical_center'>
            <Form.Label>{t('Medical Center')}</Form.Label>
            <Form.Select
              value={formData.medical_center}
              onChange={handleChange}
              id='medical_center'
            >
              <option value=''>{t('Select')}</option>
              {medicalCentersList?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {' '}
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='status'>
            <Form.Label>{t('Status')}</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={handleChange}
              id='status'
            >
              <option value=''>{t('Select')}</option>
              <option value='pending'> {t('Pending')} </option>
              <option value='cancelled'> {t('Cancelled')} </option>
              <option value='confirmed'> {t('Confirmed')} </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='booking_date'>
            <Form.Label>{t('Booking Date')}</Form.Label>
            <Form.Control
              as='input'
              type='date'
              value={formData.booking_date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='nursing_tasks_id'>
            <Form.Label>{t('Nursing Tasks')}</Form.Label>
            {
              formData.nursing_tasks?.map((item: number, index: number) => (
                <div key={index} className='d-flex  mb-2'>
                  <Form.Select className='col' key={index} onChange={(e: any) => handelChangeNursingTasksId(e, index)}
                    value={item}
                  >
                    <option value={0}>{t('Select')}</option>
                    {nursingTasksList?.map((item: any) => (
                      <option key={item.id} value={item.id}> {item.main_title} </option>
                    ))}
                  </Form.Select>
                  <Button variant='danger' onClick={() => handelRemoveNursingTasksId(index)} className=' '>
                    {t('Remove')}
                  </Button>
                </div>
              ))
            }
            <Button variant='primary' onClick={handelAddNursingTasksId} className='my-5'>
              {t('Add Nursing Task')}
            </Button>
          </Form.Group>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='notes'>
            <Form.Label>{t('Notes')}</Form.Label>
            <Form.Control
              as='textarea'
              rows={1}
              placeholder={t('Enter notes')}
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>
        </div>


        <h2 className=' mt-5'>{t('Checkout')}</h2>
        <div className="table-responsive">
          <table className="table align-middle table-row-dashed fs-6 gy-5 text-nowrap" style={{ minHeight: '100%' }}>
            <thead>
              <tr className=" text-gray-500 fw-bold fs-7 text-uppercase gs-0 " >
                <th>{t('Nursing Task')}</th>
                <th>{t('Price')}</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 fw-semibold">
              {formData?.nursing_tasks?.length === 0 && (
                <tr>
                  <td colSpan={100} className="text-center">لا يوجد بيانات</td>
                </tr>
              )}
              {formData?.nursing_tasks?.map((taskId: number, index) => {
                const task: NursingTask | undefined = nursingTasksList.find(item => item.id === taskId);
                return (
                  <tr key={index} className={index % 2 === 0 ? 'table-active' : ''}>
                    <td>{task?.main_title}</td>
                    <td>{task?.price}</td>
                  </tr>
                );
              })}
              {formData?.nursing_tasks?.length > 0 ?
                <tr className="border-top border-dark border-top-1">
                  <td>{t('Total Price')}</td>
                  <td>{formData.total_price}</td>
                </tr>
                : ''}

            </tbody>
          </table>
        </div>

        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
