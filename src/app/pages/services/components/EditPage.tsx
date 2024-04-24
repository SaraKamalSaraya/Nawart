import {t} from 'i18next'
import React, {useEffect, useState} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import postMethod from '../../../../functions/postMethod'
import SwalShowAlert from '../../../../functions/swal/SwalShowAlert'
import {useNavigate, useParams} from 'react-router-dom'
import GetMethod from '../../../../functions/getMethod'

interface FormDataInterface {
  title: string
  image: string
  description: string
  instructions: string[]
}

export default function EditServicesPage() {
  const [formData, setFormData] = useState<FormDataInterface>({
    instructions: [''],
  } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [ImagePreview, setImagePreview] = useState<string | null>(null)
  const navigate = useNavigate()

  const {id} = useParams()
  useEffect(() => {
    const fetchFormData = async () => {
      const res = await GetMethod(`/services`)
      const data = res?.data.services.find((item: any) => item.id == id)
      setFormData({...data, image: null})
      setImagePreview(data.image)
    }

    fetchFormData()
  },[])

  const handleAddIntruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ''],
    })
  }

  const handleRemoveIntruction = (index: number) => {
    const newIntructions = [...formData.instructions]
    newIntructions.splice(index, 1)
    setFormData({
      ...formData,
      instructions: newIntructions,
    })
  }

  const handleIntructionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>,
    index: number
  ) => {
    const newIntructions = [...formData.instructions]
    newIntructions[index] = e.target.value
    setFormData({
      ...formData,
      instructions: newIntructions,
    })
  }

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
      } else if (key == 'instructions') {
        formData.instructions.forEach((feature: string) => {
          formDataToSend.append('instructions[]', feature)
        })
      } else {
        formDataToSend.append(key, value)
      }
    })

    const response = await postMethod(`/services/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/services')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Service')}</h2>
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

          <Form.Group className='my-5' style={{width: '45%'}} controlId='instructions'>
            <Form.Label>{t('Intructions')}</Form.Label>
            {formData.instructions?.map((feature: string, index: number) => (
              <div className='d-flex align-items-center my-2' key={index}>
                <Form.Control
                  type='text'
                  placeholder={t('Enter Intruction')}
                  value={feature}
                  onChange={(e) => handleIntructionChange(e, index)}
                />
                <Button
                  variant='danger'
                  className='ms-2'
                  onClick={() => handleRemoveIntruction(index)}
                >
                  {t('Remove')}
                </Button>
              </div>
            ))}

            <Button variant='primary' className='w-200px' onClick={handleAddIntruction}>
              {t('Add Intruction')}
            </Button>
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='image'>
            <Form.Label>{t('Image')}</Form.Label>
            <Form.Control type='file' onChange={handleFileChange} />
            {ImagePreview && <img src={ImagePreview} alt='image' width={50} height={50} />}
          </Form.Group>
        </div>

        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
