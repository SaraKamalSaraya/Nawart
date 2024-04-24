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
  // email:              string;
  workplace:          string;
  price:              number;
  image:              string;
  medical_service_id: string;
}

export default function EditDoctorPage() {
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [ImagePreview, setImagePreview] = useState<string | null>(null)
  const [medicalService, setMedicalService] = useState<any[]>([])

  const navigate = useNavigate()
const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const res = await GetMethod(`/medical_services`)
      setMedicalService(res?.data?.data)
    }   
    
    const fetchData2 = async () => {
      const res = await GetMethod(`/doctors`)
      const doctor = res?.data.doctors.find((item: any) => item.id == id)
      setFormData({ ...doctor ,image:null})
      setImagePreview(doctor.image)
    }

    fetchData()
    fetchData2()
  }, [])

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
      if (value == null || key == 'email') {
        return     
      }else{
        formDataToSend.append(key, value)
      }
    })

    const response = await postMethod(`/doctors/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/user-management/doctor')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Doctor')}</h2>
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

          {/* <Form.Group className='my-5' style={{width: '45%'}} controlId='email'>
          <Form.Label>{t('Email')}</Form.Label>
          <Form.Control
            type='email'
            placeholder={t('Enter Email')}
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group> */}

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

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='workplace'>
            <Form.Label>{t('Workplace')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Workplace')} value={formData.workplace} onChange={handleChange} />
          </Form.Group>


          <Form.Group className='my-5' style={{ width: '45%' }} controlId='price'>
            <Form.Label>{t('Price')}</Form.Label>
            <Form.Control type='number' placeholder={t('Enter Price')} value={formData.price} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='medical_service_id'>
            <Form.Label>{t('Medical Service')}</Form.Label>
            <Form.Select aria-label='Default select example' onChange={handleChange} id='medical_service_id'>
              <option>{t('Select')}</option>
              {medicalService?.map((item: any) => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
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
