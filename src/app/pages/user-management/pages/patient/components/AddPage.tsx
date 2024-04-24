import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import postMethod from '../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../functions/getMethod'

interface FormDataInterface {
  first_name: string
  last_name: string
  image: string
  email: string
  phone: string
  blood_type: string
  nationality: string
  national_id: number
  birth_date: string
  age: string
  gender: string
  password: string
}

export default function AddPatientPage() {
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [ImagePreview, setImagePreview] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }
  const handleFileChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null
    setFormData({ ...formData, image: file })

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
      }else{
        formDataToSend.append(key, value)
      }
    })

    const response = await postMethod(`/user`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Created successfully')

      setFormData({} as FormDataInterface)
      navigate('/user-management/patient')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Add Patient')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='first_name'>
            <Form.Label>{t('First Name')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('Enter First Name')}
              value={formData.first_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='last_name'>
            <Form.Label>{t('Last Name')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('Enter Last Name')}
              value={formData.last_name}
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

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='password'>
            <Form.Label>{t('Password')}</Form.Label>
            <Form.Control
              type='password'
              placeholder={t('Enter Password')}
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='image'>
            <Form.Label>{t('Image')}</Form.Label>
            <div className='d-flex align-items-center gap-2'>
              <Form.Control type='file' onChange={handleFileChange} />
              {ImagePreview && <img src={ImagePreview} alt='image' width={100} height={100} />}
            </div>
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='phone'>
            <Form.Label>{t('Phone')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Phone')} value={formData.phone} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='blood_type'>
            <Form.Label>{t('Blood Type')}</Form.Label>
            <Form.Select value={formData.blood_type} onChange={handleChange} id='blood_type'>
              <option value=''>{t('Select')}</option>
              <option value='A+'>A+</option>
              <option value='A-'>A-</option>
              <option value='B+'>B+</option>
              <option value='B-'>B-</option>
              <option value='O+'>O+</option>
              <option value='O-'>O-</option>
              <option value='AB+'>AB+</option>
              <option value='AB-'>AB-</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='nationality'>
            <Form.Label>{t('Nationality')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Nationality')} value={formData.nationality} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='national_id'>
            <Form.Label>{t('National ID')}</Form.Label>
            <Form.Control type='number' placeholder={t('Enter National ID')} value={formData.national_id} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='birth_date'>
            <Form.Label>{t('Birth Date')}</Form.Label>
            <Form.Control type='date' placeholder={t('Enter Birth Date')} value={formData.birth_date} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='age'>
            <Form.Label>{t('Age')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Age')} value={formData.age} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='gender'>
            <Form.Label>{t('Gender')}</Form.Label>
            <Form.Select value={formData.gender} onChange={handleChange} id='gender'>
              <option value=''>{t('Select')}</option>
              <option value='male'>{t('Male')}</option>
              <option value='female'>{t('Female')}</option>
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
