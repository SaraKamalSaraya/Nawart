import {t} from 'i18next'
import React, {useEffect, useState} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import postMethod from '../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import {useNavigate, useParams} from 'react-router-dom'
import GetMethod from '../../../../../../functions/getMethod'

interface FormDataInterface {
  title: string
  description: string
  features: string[]
  medical_services_id: number
}

export default function EditVaccinationPage() {
  const [formData, setFormData] = useState<FormDataInterface>({
    features: [''],
  } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [medicalServiceList, setMedicalServiceList] = useState([])

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const fetchMedicalService = async () => {
      const res = await GetMethod(`/medical_services`)
      setMedicalServiceList(res?.data.data)
    }
    const fetchFormData = async () => {
      const res = await GetMethod(`/vaccinations`)
      setFormData(res?.data.data.find((item: any) => item.id == id))
    }

    fetchMedicalService()
    fetchFormData()
  }, [])

  
  const handleAddFeature = () => {
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
      }else if(key == 'features'){
        formData.features.forEach((feature: string) => {
          formDataToSend.append('features[]', feature)
        })
      } else {
        formDataToSend.append(key, value)
      }
    })

    const response = await postMethod(`/vaccinations/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/vaccinations')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Vaccination')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>
          <Form.Group className='my-5' style={{width: '45%'}} controlId='title'>
            <Form.Label>{t('Title')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('Enter Title')}
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='description'>
            <Form.Label>{t('Description')}</Form.Label>
            <Form.Control
              as='textarea'
              rows={1}
              placeholder={t('Enter Description')}
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>


          <Form.Group className='my-5' style={{width: '45%'}} controlId='medical_services_id'>
            <Form.Label>{t('Medical Service')}</Form.Label>
            <Form.Select
              value={formData.medical_services_id}
              onChange={handleChange}
              id='medical_services_id'
            >
              <option value=''>{t('Select')}</option>
              {medicalServiceList?.map((medicalService: any) => (
                <option key={medicalService.id} value={medicalService.id}>
                  {' '}
                  {medicalService.title}{' '}
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

            <Button variant='primary' className='w-200px' onClick={handleAddFeature}>
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
