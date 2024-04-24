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
  vaccinations_ids: any[];
  medical_center_id: number;
  booking_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string
}

export default function EditReservationPage() {
  const [formData, setFormData] = useState<FormDataInterface>({ id: 0, vaccinations_ids: [0] } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [vaccinationsList, setvaccinationsList] = useState([])
  const [medicalCentersList, setMedicalCentersList] = useState([])

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await GetMethod(`/user`)
      setUsersList(res?.data.data)
    }

    const fetchvaccinations = async () => {
      const res = await GetMethod(`/vaccinations`)
      setvaccinationsList(res?.data.data)
    }

    const fetchMedicalCenters = async () => {
      const res = await GetMethod(`/medical_centers`)
      setMedicalCentersList(res?.data.medical_centers)
    }

    const fetchFormData = async () => {
      const res = await GetMethod(`/vaccinationsBookings/${id}`)
      const item = res?.data?.booking;

      const formattedData: FormDataInterface = {
        id: item?.id,
        user_id: item?.user?.id,
        vaccinations_ids: item?.data?.id || [0],
        medical_center_id: item?.medical_center?.id,
        booking_date: item?.booking_date?.split(' ')[0],
        status: item?.status,
        notes: item?.notes,
        created_at: item?.created_at,
        updated_at: item?.updated_at,
      };

      setFormData(formattedData);
    }

    fetchUsers()
    fetchvaccinations()
    fetchMedicalCenters()
    fetchFormData()
  }, [])



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  
  const handelAddvaccinationsId = () => {
    setFormData((prevState) => ({
      ...prevState,
      vaccinations_ids: [...prevState.vaccinations_ids, 0],
    }))
  }

  const handelRemovevaccinationsId = (index: number) => {
    const newvaccinationsId = [...formData.vaccinations_ids]
    newvaccinationsId.splice(index, 1)
    setFormData((prevState) => ({
      ...prevState,
      vaccinations_ids: newvaccinationsId
    }))
  }

  const handelChangevaccinationsId = (e: any, index: number) => {
    const newvaccinationsId = [...formData.vaccinations_ids]
    newvaccinationsId[index] = e.target.value
    setFormData((prevState) => ({
      ...prevState,
      vaccinations_ids: newvaccinationsId
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value == null) {
        return
      } else {
        formDataToSend.append(key, value)
      }
    })

    const response = await postMethod(`/vaccinationsBookings/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/vaccinations/reservations')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Vaccination Reservation')}</h2>
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
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='medical_center_id'>
            <Form.Label>{t('Medical Center')}</Form.Label>
            <Form.Select
              value={formData.medical_center_id}
              onChange={handleChange}
              id='medical_center_id'
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
              <option value='pending'> {t('Pending')}  </option>
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
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='vaccinations_ids'>
            <Form.Label>{t('Vaccinations')}</Form.Label>
            {/* <Form.Select
              value={formData.vaccinations_ids}
              onChange={handleChange}
              id='vaccinations_ids'
            >
              <option value=''>{t('Select')}</option>
              {vaccinationsList?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {' '}
                  {item.title}
                </option>
              ))}
            </Form.Select> */}
            {
              formData.vaccinations_ids?.map((item: number, index: number) => (
                <div key={index} className='d-flex  mb-2'>
                  <Form.Select className='col' key={index} onChange={(e: any) => handelChangevaccinationsId(e, index)}
                    value={item}
                  >
                    <option value={0}>{t('Select')}</option>
                    {vaccinationsList?.map((item: any) => (
                      <option key={item.id} value={item.id}> {item.title} </option>
                    ))}
                  </Form.Select>
                  <Button variant='danger' onClick={() => handelRemovevaccinationsId(index)} className=' '>
                    {t('Remove')}
                  </Button>
                </div>
              ))
            }
            <Button variant='primary' onClick={handelAddvaccinationsId} className='my-5'>
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

        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
