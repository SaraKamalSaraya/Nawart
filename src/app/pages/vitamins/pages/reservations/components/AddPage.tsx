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
  vitamins: any[];
  medical_center: any;
  booking_date: string;
  status: string;
  notes: string;
  quantity: number;
  total_price: number;
}

interface Vitamins {
  id: number;
  price: number;
  title: string;
}

export default function AddReservationsPage() {
  const [formData, setFormData] = useState<FormDataInterface>({ id: 0, user_id: 0, quantity: 1, total_price: 0, vitamins: [0] } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [VitaminssList, setVitaminssList] = useState<Vitamins[]>([]);
  const [medicalCentersList, setMedicalCentersList] = useState([])


  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await GetMethod(`/user`)
      setUsersList(res?.data.data)
    }
    const fetchvitamins = async () => {
      const res = await GetMethod(`/vitamins`)
      setVitaminssList(res?.data.vitamins)
    }
    const fetchMedicalCenters = async () => {
      const res = await GetMethod(`/medical_centers`)
      setMedicalCentersList(res?.data.medical_centers)
    }

    fetchUsers()
    fetchvitamins()
    fetchMedicalCenters()
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handelAddVitaminssId = () => {
    setFormData((prevState) => ({
      ...prevState,
      vitamins: [...prevState.vitamins, 0],
    }))
  }

  const handelRemoveVitaminssId = (index: number) => {
    const newVitaminssId = [...formData.vitamins]
    newVitaminssId.splice(index, 1)
    setFormData((prevState) => ({
      ...prevState,
      vitamins: newVitaminssId,
    }))
  }

  const handelChangeVitaminssId = (e: any, index: number) => {
    const value = parseInt(e.target.value)
    const newVitaminssId = [...formData.vitamins]
    newVitaminssId[index] = value
    setFormData((prevState) => ({
      ...prevState,
      vitamins: newVitaminssId,
    }))
  }

  const handleTotalPrice = () => {
    const total_price = formData?.vitamins?.reduce((acc, id) => {
      const vitamin = VitaminssList?.find((item) => item.id === parseInt(id));
      return acc + (vitamin ? parseFloat(vitamin.price.toString()) : 0)
    }, 0);
    return total_price
  }

  useEffect(() => {
    const totalPrice = handleTotalPrice()
    const totalQuantity = formData?.vitamins?.length
    setFormData((prevState) => ({
      ...prevState,
      total_price: totalPrice,
      quantity: totalQuantity
    }))
  }, [formData.vitamins])

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

    const response = await postMethod(`/vitamins-bookings`, formData)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Created successfully')

      setFormData({} as FormDataInterface)
      navigate('/vitamins/reservations')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Add Vitamin Reservasion')}</h2>
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
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='vitamins_id'>
            <Form.Label>{t('Vitamins')}</Form.Label>
            {
              formData.vitamins?.map((item: number, index: number) => (
                <div key={index} className='d-flex  mb-2'>
                  <Form.Select className='col' key={index} onChange={(e: any) => handelChangeVitaminssId(e, index)}
                    value={item}
                  >
                    <option value={0}>{t('Select')}</option>
                    {VitaminssList?.map((item: any) => (
                      <option key={item.id} value={item.id}> {item.title} </option>
                    ))}
                  </Form.Select>
                  <Button variant='danger' onClick={() => handelRemoveVitaminssId(index)} className=' '>
                    {t('Remove')}
                  </Button>
                </div>
              ))
            }
            <Button variant='primary' onClick={handelAddVitaminssId} className='my-5'>
              {t('Add Vitamin')}
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
                <th>{t('Vitamin')}</th>
                <th>{t('Price')}</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 fw-semibold">
              {formData?.vitamins?.length === 0 && (
                <tr>
                  <td colSpan={100} className="text-center">لا يوجد بيانات</td>
                </tr>
              )}
              {formData?.vitamins?.map((vitaminId: number, index) => {
                const vitamin: Vitamins | undefined = VitaminssList?.find(item => item.id === vitaminId);
                return (
                  <tr key={index} className={index % 2 === 0 ? 'table-active' : ''}>
                    <td>{vitamin?.title}</td>
                    <td>{vitamin?.price}</td>
                  </tr>
                );
              })}
              {formData?.vitamins?.length > 0 ?
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
