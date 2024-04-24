import {t} from 'i18next'
import React, {useEffect, useState} from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import postMethod from '../../../../functions/postMethod'
import SwalShowAlert from '../../../../functions/swal/SwalShowAlert'
import {useNavigate, useParams} from 'react-router-dom'
import GetMethod from '../../../../functions/getMethod'

interface FormDataInterface {
  country:           string;
  state:             string;
  city:              string;
  full_address:      string;
  // latitude:          number;
  // longitude:         number;
  user_id:           number;
}

export default function AddAddressPage() {
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [usersList, setUsersList] = useState<any[]>([])

  const navigate = useNavigate()
  
  const {id} = useParams()

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await GetMethod(`/user`)
      setUsersList(res?.data?.data)
    }

    const fetchData = async () => {
      const res = await GetMethod(`/addresses`)
       setFormData(res?.data?.addresses.find((item: any) => item.id == id))
    }

    fetchUsers()
    fetchData()
  }, [])

  


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
      } else {
        formDataToSend.append(key, value)
      }
    })

    const response = await postMethod(`/addresses/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/addresses')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Address')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>
          <Form.Group className='my-5' style={{width: '45%'}} controlId='country'>
            <Form.Label>{t('Country')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('Enter Country')}
              value={formData.country}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='state'>
            <Form.Label>{t('State')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('Enter State')}
              value={formData.state}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='city'>
            <Form.Label>{t('City')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('Enter City')}
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='full_address'>
            <Form.Label>{t('Full Address')}</Form.Label>
            <Form.Control  type='text' placeholder={t('Enter Full Address')} value={formData.full_address} onChange={handleChange}>
            </Form.Control>
          </Form.Group>

          {/* <Form.Group className='my-5' style={{width: '45%'}} controlId='latitude'>
            <Form.Label>{t('Latitude')}</Form.Label>
            <Form.Control  type='number' placeholder={t('Enter Latitude')} value={formData.latitude} onChange={handleChange}>
            </Form.Control>
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='longitude'>
            <Form.Label>{t('Longitude')}</Form.Label>
            <Form.Control  type='number' placeholder={t('Enter Longitude')} value={formData.longitude} onChange={handleChange}>
            </Form.Control>
          </Form.Group> */}

          <Form.Group className='my-5' style={{width: '45%'}} controlId='user_id'>
            <Form.Label>{t('User')}</Form.Label>
            <Form.Select onChange={handleChange} value={formData.user_id}>
              <option value={0}>{t('Select')}</option>
              {usersList?.map((user: any) => (
                <option value={user?.id}>{user?.first_name} {user?.last_name}</option>
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
