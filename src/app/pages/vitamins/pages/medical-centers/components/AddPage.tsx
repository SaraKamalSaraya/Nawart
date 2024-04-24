import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../functions/getMethod';
import postMethod from '../../../../../../functions/postMethod';
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert';

interface FormDataInterface {
  id: number;
  price: string
  vitamins_id: number
  medical_center_id: number
}

export default function AddMedicalCenter() {
  const [formData, setFormData] = useState<FormDataInterface>({ id: 0 } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [vitaminsList, setvitaminsList] = useState<any[]>([])
  const [medicalCenterList, setMedicalCenterList] = useState<any[]>([])

  const navigate = useNavigate()

  useEffect(() => {

    const fetchvitaminsList = async () => {
      const res = await GetMethod('/vitamins')
      setvitaminsList(res?.data?.vitamins)
    }

    const fetchMedicalCenterList = async () => {
      const res = await GetMethod('/medical_centers')
      setMedicalCenterList(res?.data?.medical_centers)
    }

    fetchvitaminsList()
    fetchMedicalCenterList()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
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

    const response = await postMethod(`/medical-center-vitamins`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Created successfully')

      setFormData({} as FormDataInterface)
      navigate('/vitamins/medical-centers')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Add Medical Center For Vitamins')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='price'>
            <Form.Label>{t('Price')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Price')} value={formData.price} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='vitamins_id'>
            <Form.Label>{t('Vitamin')}</Form.Label>
            <Form.Select onChange={handleChange} value={formData.vitamins_id}>
              <option value={0}>{t('Select')}</option>
              {vitaminsList?.map((vitamins: any) => (
                <option key={vitamins.id} value={vitamins.id}> {vitamins.title} </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='medical_center_id'>
            <Form.Label>{t('Medical Center')}</Form.Label>
            <Form.Select onChange={handleChange} value={formData.medical_center_id}>
              <option value={0}>{t('Select')}</option>
              {medicalCenterList?.map((medicalCenter: any) => (
                <option key={medicalCenter.id} value={medicalCenter.id}> {medicalCenter.name} </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
