import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import postMethod from '../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../functions/getMethod'

interface FormDataInterface {
  title: string
  description: string
  image: string
  price: string
  features: string[]
  medical_services_id: number
}

export default function EditVitaminPage() {
  const [formData, setFormData] = useState<FormDataInterface>({
    features: [''],
  } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [medicalServiceList, setMedicalServiceList] = useState<any[]>([])
  const [ImagePreview, setImagePreview] = useState<string | null>(null)

  const {id} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetMethod(`/medical_services`)
      setMedicalServiceList(res?.data?.data)
    }
    const fetchFormData = async () => {
      const res = await GetMethod(`/vitamins`)
      const data = res?.data.vitamins.find((item: any) => item.id == id)
      setFormData({...data ,image:null })
      setImagePreview(data.image)      
    }

    fetchData()
    fetchFormData()    
  }, [])

  
  const handleEditFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    })
  }

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...formData.features]
    newFeatures.splice(index, 1)
    setFormData({
      ...formData,
      features: newFeatures,
    })
  }

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>, index: number) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = e.target.value
    setFormData({
      ...formData,
      features: newFeatures,
    })
  }

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
      }else if(key == 'features'){
        formData.features.forEach((feature: string) => {
          formDataToSend.append('features[]', feature)
        })
      }else{
        formDataToSend.append(key, value)
      }
    })

    const response = await postMethod(`/vitamins/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/vitamins')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Vitamin')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='title'>
            <Form.Label>{t('Title')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Title')} value={formData.title} onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='description'>
            <Form.Label>{t('Description')}</Form.Label>
            <Form.Control as='textarea' rows={1} type='text' placeholder={t('Enter Description')} value={formData.description} onChange={handleChange}
            />
          </Form.Group>

            <Form.Group className='my-5' style={{ width: '45%' }} controlId='image'>
            <Form.Label>{t('Image')}</Form.Label>
            <Form.Control type='file' onChange={handleFileChange} />
            {ImagePreview && (
              <img src={ImagePreview} alt='image' width={50} height={50} />
            )}
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='price'>
            <Form.Label>{t('Price')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Price')} value={formData.price} onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='medical_services_id'>
            <Form.Label>{t('Medical Service')}</Form.Label>
            <Form.Select value={formData.medical_services_id}  onChange={handleChange} id="medical_services_id">
              <option value={0}  disabled>{t('Select')}</option>
              {medicalServiceList?.map((medicalService: any) => (
                <option key={medicalService.id} value={medicalService.id}>
                  {medicalService.title}
                </option>
              ))}
            </Form.Select>
            </Form.Group>

            <Form.Group className='my-5' style={{ width: '45%' }} controlId='features'>
            <Form.Label>{t('Features')}</Form.Label>
            {formData.features?.map((feature: string, index: number) => (
              <div className='d-flex align-items-center my-2' key={index}>
                <Form.Control
                  type='text'
                  placeholder={t('Enter Feature')}
                  value={feature}
                  onChange={(e) => handleFeatureChange(e, index)}
                />
                <Button
                  variant='danger'
                  className='ms-2'
                  onClick={() => handleRemoveFeature(index)}
                >
                  {t('Remove')}
                </Button>
              </div>
            ))}

            <Button variant='primary' className='w-200px' onClick={handleEditFeature}>
              {t('Add Feature')}
            </Button>
          </Form.Group>


        </div>


        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
