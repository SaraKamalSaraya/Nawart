import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import postMethod from '../../../../functions/postMethod'
import SwalShowAlert from '../../../../functions/swal/SwalShowAlert'
import { Admins_Inputs, Banners_Inputs, Categories_Inputs, Default_Inputs, Delivery_Men_Inputs, Food_Items_Inputs, Invoice_Inputs, Offers_Inputs, Order_Inputs, Users_Inputs } from '../components/inputs'
import axios from 'axios'

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
  const [formData, setFormData] = useState<FormDataInterface>({} as FormDataInterface)
  const [inputs, setInputs] = useState<Inputs[]>([]);
  const [pageType, setPageType] = useState('')
  const [loading, setLoading] = useState(false)
  const [ImagePreview, setImagePreview] = useState<string | null>(null)

  const navigate = useNavigate()
  // const params = useParams();
  const params = window.location.pathname
  const pathSegments = params.split('/');
  let paramsValue = pathSegments && pathSegments.length >= 2 ? pathSegments[pathSegments.length - 2] : null;

  // Setting the data
  useEffect(() => {
    // Getting Page Type
    if (paramsValue === 'edit'){
      paramsValue = pathSegments && pathSegments.length >= 3 ? pathSegments[pathSegments.length - 3] : null;
      setPageType('edit')
    } else{
      paramsValue = pathSegments && pathSegments.length >= 2 ? pathSegments[pathSegments.length - 2] : null;
      setPageType('add')
    }

    // Getting inputs of the Page
    if (paramsValue === 'admins') {
      setInputs(Admins_Inputs)
      // if (pageType === 'edit'){
      //   axios.get('')
      //   .then(res=>{
      //     setFormData()
      //   })
      // }
    } else if (paramsValue === 'users') {
      setInputs(Users_Inputs)
      // if (pageType === 'edit'){
      //   axios.get('')
      //   .then(res=>{
      //     setFormData()
      //   })
      // }
    } else if (paramsValue === 'deliveryMen') {
      setInputs(Delivery_Men_Inputs)
      // if (pageType === 'edit'){
      //   axios.get('')
      //   .then(res=>{
      //     setFormData()
      //   })
      // }
    } else if (paramsValue === 'offers') {
      setInputs(Offers_Inputs)
      // if (pageType === 'edit'){
      //   axios.get('')
      //   .then(res=>{
      //     setFormData()
      //   })
      // }
    } else if (paramsValue === 'banners') {
      setInputs(Banners_Inputs)
      // if (pageType === 'edit'){
      //   axios.get('')
      //   .then(res=>{
      //     setFormData()
      //   })
      // }
    } else if (paramsValue === 'categories') {
      setInputs(Categories_Inputs)
      // if (pageType === 'edit'){
      //   axios.get('')
      //   .then(res=>{
      //     setFormData()
      //   })
      // }
    } else if (paramsValue === 'foodItems') {
      setInputs(Food_Items_Inputs)
      // if (pageType === 'edit'){
      //   axios.get('')
      //   .then(res=>{
      //     setFormData()
      //   })
      // }
    } else if (paramsValue === 'all') { // Order
      setInputs(Order_Inputs)
      // if (pageType === 'edit'){
      //   axios.get('')
      //   .then(res=>{
      //     setFormData()
      //   })
      // }
    } else if (paramsValue === 'invoices') { // Invoices
      setInputs(Invoice_Inputs)
      // if (pageType === 'edit'){
      //   axios.get('')
      //   .then(res=>{
      //     setFormData()
      //   })
      // }
    } else {
      setInputs([])
      setFormData({} as FormDataInterface)
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
        <button style={{backgroundColor:"#1085A4",color:"#fff"}} type='submit' disabled={loading} className='w-200px mx-4 btn'>
          {loading ? t('Loading...') : t('Submit')}
        </button>
      </Form>
    </Container>
  )
}
