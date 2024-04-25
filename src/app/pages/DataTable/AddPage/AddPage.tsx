import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import postMethod from '../../../../functions/postMethod'
import SwalShowAlert from '../../../../functions/swal/SwalShowAlert'
import { Admins_Inputs, Default_Inputs, Delivery_Men_Inputs, Users_Inputs } from './components/inputs'

interface FormDataInterface {
  id: number;
  [key: string]: string | File | number;
}

interface Inputs {
  id: string;
  label: string;
  type: string;
  placeholder: string;
};

export default function AddPage() {
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [inputs, setInputs] = useState<Inputs[]>([]);
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [ImagePreview, setImagePreview] = useState<string | null>(null)

  const navigate = useNavigate()
  // const params = useParams();
  const params = window.location.pathname
  const pathSegments = params.split('/');
  const paramsValue = pathSegments && pathSegments.length >= 2 ? pathSegments[pathSegments.length - 2] : null;
  

  // Setting the data
  useEffect(() => {
    if (paramsValue === 'admins') {
      setInputs(Admins_Inputs)
      setTitle('Add Admin')
    } else if (paramsValue === 'users') {
      setInputs(Users_Inputs)
      setTitle('Add User')
    } else if (paramsValue === 'deliveryMen') {
      setInputs(Delivery_Men_Inputs)
      setTitle('Add Admin')
    } else {
      setInputs([])
    }
    console.log(paramsValue)
  }, [paramsValue]);


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
    // Object.entries(formData).forEach(([key, value]) => {
    //   if (value != null) {
    //     formDataToSend.append(key, value)
    //   } else return;
    // })

    const response = await postMethod(`/admins`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Created successfully')

      setFormData({} as FormDataInterface)
      navigate('/user-management/admins')
    }
  }

  // Render different input components based on type
  const renderInput = (input: Inputs) => {
    if (input.type === 'file') {
      return (
        <Form.Control
          id={input.id}
          type="file"
          onChange={handleFileChange}
        />
      );
    } else {
      return (
        <Form.Control
          id={input.id}
          type={input.type}
          placeholder={input.placeholder}
          value={formData[input.id] as string}
          onChange={handleChange}
        />
      );
    }
  };

  return (
    <Container className='mt-5 card p-8'>
      <h2>{t(`${title}`)}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>
          {/* ----------------------- Inputs -------------------- */}
          {inputs.map((input, index) => (
            <Form.Group key={index} className='my-5' style={{ width: '45%' }}>
              {renderInput(input)}
            </Form.Group>
          ))}
        </div>
        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
