import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import postMethod from '../../../../functions/postMethod'
import SwalShowAlert from '../../../../functions/swal/SwalShowAlert'
import { Admins_Inputs, Banners_Inputs, Categories_Inputs, Default_Inputs, Delivery_Men_Inputs, Food_Items_Inputs, Invoice_Inputs, Offers_Inputs, Order_Inputs, Users_Inputs } from '../components/inputs'
import GetMethod from '../../../../functions/getMethod'

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

export default function InputsPage() {
  const { id } = useParams()
  console.log('id', id)
  const [formData, setFormData] = useState<FormDataInterface>({ id: 0 } as FormDataInterface)
  const [inputs, setInputs] = useState<Inputs[]>([]);
  const [pageType, setPageType] = useState('')
  const [loading, setLoading] = useState(false)
  const [ImagePreview, setImagePreview] = useState<string | null>(null)

  const navigate = useNavigate()
  // const params = useParams();
  const params = window.location.pathname
  const pathSegments = params.split('/');
  let paramsValue = pathSegments && pathSegments.length >= 2 ? pathSegments[pathSegments.length - 2] : null;

  const fetchData = async (url: string) => {
    const res = await GetMethod(`/${url}`)
    // if (url === 'admin' || url === 'user')
    setFormData(res?.data?.data.find((item: any) => item.id == id))
  }

  // Setting the data
  useEffect(() => {
    // Getting Page Type
    if (paramsValue === 'edit') {
      paramsValue = pathSegments && pathSegments.length >= 3 ? pathSegments[pathSegments.length - 3] : null;
      setPageType('edit')
    } else {
      paramsValue = pathSegments && pathSegments.length >= 2 ? pathSegments[pathSegments.length - 2] : null;
      setPageType('add')
    }

    // Getting inputs of the Page
    if (paramsValue === 'admins') {
      setInputs(Admins_Inputs)
      if (pageType === 'edit') fetchData('admin')
    } else if (paramsValue === 'users') {
      setInputs(Users_Inputs)
      if (pageType === 'edit') fetchData('user')
    } else if (paramsValue === 'deliveryMen') {
      setInputs(Delivery_Men_Inputs)
    } else if (paramsValue === 'offers') {
      setInputs(Offers_Inputs)
    } else if (paramsValue === 'banners') {
      setInputs(Banners_Inputs)
    } else if (paramsValue === 'categories') {
      setInputs(Categories_Inputs)
      if (pageType === 'edit') fetchData('categories')
    } else if (paramsValue === 'foodItems') {
      setInputs(Food_Items_Inputs)
    } else if (paramsValue === 'all') { // Order
      setInputs(Order_Inputs)
    } else if (paramsValue === 'invoices') { // Invoices
      setInputs(Invoice_Inputs)
    } else {
      setInputs([])
      setFormData({} as FormDataInterface)
    }
    console.log(paramsValue)

  }, [paramsValue, pageType]);


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

    // Handle incomming data
    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value != null) {
        formDataToSend.append(key, value as string | Blob)
      } else return;
    })

    // handle params value
    if (paramsValue === 'edit') {
      paramsValue = pathSegments && pathSegments.length >= 3 ? pathSegments[pathSegments.length - 3] : null;
      setPageType('edit')
    } else {
      paramsValue = pathSegments && pathSegments.length >= 2 ? pathSegments[pathSegments.length - 2] : null;
      setPageType('add')
    }

    // post in api
    let response
    if (paramsValue === 'admins') {
      if (pageType === 'add') response = await postMethod(`/admin`, formDataToSend)
      else response = await postMethod(`/admin/update/${id}`, formDataToSend)
    } else if (paramsValue === 'users') {
      if (pageType === 'add') response = await postMethod(`/user/register`, formDataToSend)
      else response = await postMethod(`/user/update/${id}`, formDataToSend)
    } else if (paramsValue === 'categories') {
      if (pageType === 'add') response = await postMethod(`/categories`, formDataToSend)
      else response = await postMethod(`/categories/update/${id}`, formDataToSend)
    }
    console.log('click', paramsValue, pageType)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      if (pageType === 'add') SwalShowAlert('success', 'Created successfully')
      else SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)

      // navigate
      if (paramsValue === 'admins') navigate('/user-management/admins')
      else if (paramsValue === 'users') navigate('/user-management/users')
        else if (paramsValue === 'categories') navigate('/menu/categories')
    }
  }

  // Render different input components based on type
  const renderInput = (input: Inputs) => {
    return (
      <Form.Group key={input.id} className='' style={{ width: '100%' }}>
        <Form.Label htmlFor={input.id}>{t(`${input.label}`)}</Form.Label>
        {input.type === 'file' ? (
          <Form.Control
            id={input.id}
            type="file"
            onChange={handleFileChange}
          />
        ) : (
          <Form.Control
            id={input.id}
            type={input.type}
            placeholder={t(`${input.placeholder}`)}
            value={formData[input.id] as string}
            onChange={handleChange}
            min={0}
          />
        )}
      </Form.Group>
    );
  };



  return (
    <Container className='mt-5 card p-8'>
      <h2>
        {t('Please Enter All Data')}
      </h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>
          {/* ----------------------- Inputs -------------------- */}
          {inputs.map((input, index) => (
            <Form.Group key={index} className='my-5' style={{ width: '45%' }}>
              {renderInput(input)}
            </Form.Group>
          ))}
        </div>
        {/* <Button type='submit' disabled={loading} className='w-200px mx-4 submit-btn'>
          {loading ? t('Loading...') : t('Submit')}
        </Button> */}
        <button style={{ backgroundColor: "#1085A4", color: "#fff" }} type='submit' disabled={loading} className='w-200px mx-4 btn'>
          {loading ? t('Loading...') : t('Submit')}
        </button>
      </Form>
    </Container>
  )
}
