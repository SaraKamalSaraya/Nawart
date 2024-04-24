import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import postMethod from '../../../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../../../functions/swal/SwalShowAlert'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../../../functions/getMethod'

interface FormDataInterface {
  id_tasnif: number
  icon: string | null;
  title: string;
  price: number
  description: string
  sample: string
  instructions: string
  medical_services_id: number
}

export default function EditIndividualAnalysePage() {
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [iconPreview, setIconPreview] = useState<string | null>(null)
  const [medicalServicesList, setMedicalServicesList] = useState<any[]>([])
  const [classificationList, setClassificationList] = useState<any[]>([])
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    const fetchMedicalServicesList = async () => {
      const res = await GetMethod('/medical_services')
      setMedicalServicesList(res?.data?.data)
    }

    const fetchClassificationList = async () => {
      const res = await GetMethod('/tasnif')
      setClassificationList(res?.data?.data)
    }
    const fetchFormData = async () => {
      const res = await GetMethod(`/analyses/${id}`)
      const data = res?.data?.data
      setFormData({ ...data, icon: null, medical_services_id: data.medical_services.id, id_tasnif: data.tasnif.id })
      setIconPreview(data.icon)
console.log(data)
    }

    fetchMedicalServicesList()
    fetchClassificationList()
    fetchFormData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
    console.log(formData.medical_services_id)
  }
  const handleFileChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null
    setFormData({ ...formData, icon: file })

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

    const response = await postMethod(`/analyses/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/medical-analysis/individual-analyses/classification/individual-analyses')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit IndividualAnalyse')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5'>


        <div className='row mt-5 '>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='title'>
            <Form.Label>{t('Title')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Title')} value={formData.title} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='price'>
            <Form.Label>{t('Price')}</Form.Label>
            <Form.Control type='number' placeholder={t('Enter Price')} value={formData.price} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='sample'>
            <Form.Label>{t('Sample')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Sample')} value={formData.sample} onChange={handleChange} />
          </Form.Group>

          {/* <Form.Group className='my-5' style={{ width: '45%' }} controlId='icon'>
            <Form.Label>{t('Icon')}</Form.Label>
            <div className='d-flex flex-column  gap-2'>
              <Form.Control type='file' onChange={handleFileChange} />
              {iconPreview && <img src={iconPreview} alt='icon' width={50} height={50} />}
            </div>
          </Form.Group> */}

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='description'>
            <Form.Label>{t('Description')}</Form.Label>
            <Form.Control as={'textarea'} cols={1} type='text' placeholder={t('Enter Description')} value={formData.description} onChange={handleChange} />
          </Form.Group>


          <Form.Group className='my-5' style={{ width: '45%' }} controlId='instructions'>
            <Form.Label>{t('Instructions')}</Form.Label>
            <Form.Control as='textarea' cols={1} type='text' placeholder={t('Enter Instructions')} value={formData.instructions} onChange={handleChange} />
          </Form.Group>




          <Form.Group className='my-5' style={{ width: '45%' }} controlId='medical_services_id'>
            <Form.Label>{t('Medical Service')}</Form.Label>
            <Form.Select aria-label='Default select example' value={formData.medical_services_id} onChange={handleChange}>
              <option value='0'>{t('Select')}</option>
              {medicalServicesList?.map((item: any) => (
                <option value={item.id}>{item.title}</option>
              ))}
            </Form.Select>
          </Form.Group>


          <Form.Group className='my-5' style={{ width: '45%' }} controlId='id_tasnif'>
            <Form.Label>{t('Classification')}</Form.Label>
            <Form.Select value={formData.id_tasnif} onChange={handleChange}>
              <option value='0'>{t('Select')}</option>
              {classificationList?.map((item: any) => (
                <option value={item.id}>{item.name}</option>
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
