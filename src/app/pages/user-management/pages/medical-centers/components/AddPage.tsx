import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import postMethod from '../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../functions/getMethod'

interface FormDataInterface {
  name:               string;
  phone:              string;
  email:              string;
  password:           string;
  price:              number;
  description:        string;
}

export default function AddMedicalCenterPage() {
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


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

    const response = await postMethod(`/medical_centers`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Created successfully')

      setFormData({} as FormDataInterface)
      navigate('/user-management/medical-centers')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Add MedicalCenter')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='name'>
            <Form.Label>{t('Name')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('Enter Name')}
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='email'>
          <Form.Label>{t('Email')}</Form.Label>
          <Form.Control
            type='email'
            placeholder={t('Enter Email')}
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className='my-5' style={{width: '45%'}} controlId='password'>
          <Form.Label>{t('Password')}</Form.Label>
          <Form.Control
            type='password'
            placeholder={t('Enter Password')}
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>


          <Form.Group className='my-5' style={{ width: '45%' }} controlId='phone'>
            <Form.Label>{t('Phone')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Phone')} value={formData.phone} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='price'>
            <Form.Label>{t('Price')}</Form.Label>
            <Form.Control type='number' placeholder={t('Enter Price')} value={formData.price} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '90%' }} controlId='description'>
            <Form.Label>{t('Description')}</Form.Label>
            <Form.Control as='textarea' rows={3} placeholder={t('Enter Description')} value={formData.description} onChange={handleChange} />

          </Form.Group>

        </div>


        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
