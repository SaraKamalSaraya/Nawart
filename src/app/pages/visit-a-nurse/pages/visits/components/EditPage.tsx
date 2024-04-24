import {t} from 'i18next'
import React, {useEffect, useState} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import postMethod from '../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import {useNavigate, useParams} from 'react-router-dom'
import GetMethod from '../../../../../../functions/getMethod'

interface FormDataInterface {
  main_title: string
  sub_title: string
  description: string
  price: string
  medical_services_id: number
}

export default function EditVisitANursePage() {
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [medicalServiceList, setMedicalServiceList] = useState<any[]>([])

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetMethod(`/medical_services`)
      setMedicalServiceList(res?.data?.data)
    }

    const fetchData2 = async () => {
      const res = await GetMethod(`/nursing_tasks`)
      if (res?.status == '404') {
        return navigate('/no-items?to=visit-a-nurse')
      }
      setFormData(res?.data?.data.find((item: any) => item.id == id))
    }

    fetchData()
    fetchData2()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const {id, value} = e.target
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

    const response = await postMethod(`/nursing_tasks/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/visit-a-nurse')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Visit A Nurse')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5'>
        <div className='row w-100'>
          <Form.Group className='my-5' style={{width: '45%'}} controlId='main_title'>
            <Form.Label>{t('Main Title')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('Enter Main Title')}
              value={formData.main_title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='sub_title'>
            <Form.Label>{t('Sub Title')}</Form.Label>
            <Form.Control type='text'placeholder={t('Enter Sub Title')}value={formData.sub_title}onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='description'>
            <Form.Label>{t('Description')}</Form.Label>
            <Form.Control as={'textarea'} rows={3} placeholder={t('Enter Description')} value={formData.description} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='price'>
            <Form.Label>{t('Price')}</Form.Label>
            <Form.Control type='number' placeholder={t('Enter Price')} value={formData.price} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='medical_services_id'>
            <Form.Label>{t('Medical Service')}</Form.Label>
            <Form.Control as='select' value={formData.medical_services_id} onChange={handleChange}>
              <option value='' >{t('Select')}</option>
              {medicalServiceList?.map((medicalService: any) => (
                <option key={medicalService.id} value={medicalService.id}>
                  {medicalService.title}
                </option>
              ))}
            </Form.Control>

          </Form.Group>



        </div>

        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
