import {t} from 'i18next'
import React, {useEffect, useState} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import postMethod from '../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import {useNavigate, useParams} from 'react-router-dom'
import GetMethod from '../../../../../../functions/getMethod'

interface FormDataInterface {
  image: string
  name: string
  email: string
  password: string
}

export default function AddAdminPage() {
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [ImagePreview, setImagePreview] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const {id, value} = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }
  const handleFileChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null
    setFormData({...formData, image: file})

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
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

    const response = await postMethod(`/admins`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Created successfully')

      setFormData({} as FormDataInterface)
      navigate('/user-management/admin')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Add Admin')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>
          <Form.Group className='my-5' style={{width: '45%'}} controlId='name'>
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

          <Form.Group className='my-5' style={{width: '45%'}} controlId='image'>
            <Form.Label>{t('Image')}</Form.Label>
            <div className='d-flex align-items-center gap-2'>
              <Form.Control type='file' onChange={handleFileChange} />
              {ImagePreview && <img src={ImagePreview} alt='image' width={100} height={100} />}
            </div>
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
          
        </div>

        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
