import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import postMethod from '../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../functions/getMethod'

interface FormDataInterface {
  title:             string;
  price:             number;
  duration:          number;
}

export default function EditCareDurationPage() {
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const res = await GetMethod(`/care_durations`)
      setFormData(res?.data?.careDurations.find((item: any) => item.id == id))
    }    

    fetchData()
  },[])

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
      }else{
        formDataToSend.append(key, value)
      }
    })

    const response = await postMethod(`/care_durations/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/healthcare-packages/care-durations')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Care Duration')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>
          
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='title'>
            <Form.Label>{t('Title')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Title')} value={formData.title} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='price'>
            <Form.Label>{t('Price')}</Form.Label>
            <Form.Control type='number' placeholder={t('Enter Price')} value={formData.price} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='duration'>
            <Form.Label>{t('Duration')}</Form.Label>
            <Form.Control type='number' placeholder={t('Enter Duration')} value={formData.duration} onChange={handleChange} />
          </Form.Group>
          

        </div>


        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
