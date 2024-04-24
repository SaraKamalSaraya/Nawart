import {t} from 'i18next'
import React, {useEffect, useState} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import postMethod from '../../../../functions/postMethod'
import SwalShowAlert from '../../../../functions/swal/SwalShowAlert'
import {useNavigate, useParams} from 'react-router-dom'
import GetMethod from '../../../../functions/getMethod'

interface FormDataInterface {
  title: string
  icon: string
}

export default function EditMedicalServicePage() {
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [iconPreview, setIconPreview] = useState<string | null>(null)

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetMethod(`/medical_services`)
      if (res?.status == '404') {
        return navigate('/no-items?to=medical-services')
      }
      setFormData({...res?.data?.data.find((item: any) => item.id == id), icon: null})
      setIconPreview(res?.data?.data.icon)
    }
    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const {id, value} = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }
  const handleFileChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null
    setFormData({...formData, icon: file})

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setIconPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setIconPreview(null)
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

    const response = await postMethod(`/medical_services/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/medical-services')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Medical Service')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5'>
        <Form.Group className='my-5' style={{width: '45%'}} controlId='title'>
          <Form.Label>{t('Name')}</Form.Label>
          <Form.Control
            type='text'
            placeholder={t('Enter Name')}
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className='my-5' style={{width: '45%'}} controlId='icon'>
          <Form.Label>{t('Icon')}</Form.Label>
          <div className='d-flex flex-column  gap-2'>
            <Form.Control type='file' onChange={handleFileChange} />
            {iconPreview && <img src={iconPreview} alt='icon' width={100} height={100} />}
          </div>
        </Form.Group>

        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
