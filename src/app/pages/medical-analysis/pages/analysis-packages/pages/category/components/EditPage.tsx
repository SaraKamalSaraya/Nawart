import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import postMethod from '../../../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../../../functions/swal/SwalShowAlert'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../../../functions/getMethod'

interface FormDataInterface {
  name: string
}

export default function EditGroupCategoriesPage() {
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetMethod(`/group_categories/${id}`)
      setFormData(res?.data?.data)
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

    const response = await postMethod(`/group_categories/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/medical-analysis/analysis-packages/group-categories')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Group Category')}</h2>
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



        </div>


        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
