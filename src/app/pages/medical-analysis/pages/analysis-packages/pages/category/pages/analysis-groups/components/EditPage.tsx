import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import postMethod from '../../../../../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../../../../../functions/swal/SwalShowAlert'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../../../../../functions/getMethod'

interface FormDataInterface {
  name: string;
  price: number;
  description: string;
  instructions: string;
  category_id: number;
  medical_services_id: number;
  analysis_ids: number[];
}

export default function EditAnalysisGroupPage() {
  const [formData, setFormData] = useState<FormDataInterface>({
    analysis_ids: [0],
  } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [medicalServiceList, setMedicalServiceList] = useState([])
  const [analysisList, setAnalysisList] = useState<any[]>([])

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await GetMethod(`/group_categories`)
      setCategoryList(res?.data?.data)
    }
    const fetchMedicalService = async () => {
      const res = await GetMethod(`/medical_services`)
      setMedicalServiceList(res?.data.data)
    }

    const fetchAnalysis = async () => {
      const res = await GetMethod(`/analyses`)
      setAnalysisList(res?.data?.data)
    }

    const fetchData = async () => {
      const res = await GetMethod(`/analysis_groups/${id}`)
      const data= res?.data?.data
      const analysis_ids = data?.analysis_data?.map((analysis: any) => analysis.id)
      setFormData({...data,analysis_ids})
      console.log('foooooaaoooooo',data)
    }


    fetchCategory()
    fetchMedicalService()
    fetchAnalysis()
    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }


  const handelEditAnalysisId = () => {
    setFormData((prevState) => ({
      ...prevState,
      analysis_ids: [...prevState.analysis_ids, 0],
    }))
  }

  const handelRemoveAnalysisId = (index: number) => {
    const newAnalysisIds = [...formData.analysis_ids]
    newAnalysisIds.splice(index, 1)
    setFormData((prevState) => ({
      ...prevState,
      analysis_ids: newAnalysisIds
    }))
  }

  const handelChangeAnalysisId = (e: any, index: number) => {
    const newAnalysisIds = [...formData.analysis_ids]
    newAnalysisIds[index] = e.target.value
    setFormData((prevState) => ({
      ...prevState,
      analysis_ids: newAnalysisIds
    }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value == null) {
        return
      } else if(key == 'analysis_ids'){
        value.forEach((val: number)  => {
          formDataToSend.append('analysis_ids[]', val.toString());
      });
        // formDataToSend.append('analysis_ids[]', value)
      }else {
        formDataToSend.append(key, value)
      }
    })

    const response = await postMethod(`/analysis_groups/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/medical-analysis/analysis-packages/group-categories/analysis-groups')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Analysis Group')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='name'>
            <Form.Label>{t('Name')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Name')} value={formData.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='price'>
            <Form.Label>{t('Price')}</Form.Label>
            <Form.Control type='number' placeholder={t('Enter Price')} value={formData.price} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='description'>
            <Form.Label>{t('Description')}</Form.Label>
            <Form.Control as='textarea' cols={1} placeholder={t('Enter Description')} value={formData.description} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='instructions'>
            <Form.Label>{t('Instructions')}</Form.Label>
            <Form.Control as='textarea' cols={1} placeholder={t('Enter Instructions')} value={formData.instructions} onChange={handleChange} />
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='category_id'>
            <Form.Label>{t('Category')}</Form.Label>
            <Form.Select id='category_id' onChange={handleChange} value={formData.category_id}>
              <option value={0}>{t('Choose Category')}</option>
              {categoryList?.map((category: any) => (
                <option key={category.id} value={category.id}> {category.name} </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='medical_services_id'>
            <Form.Label>{t('Medical Service')}</Form.Label>
            <Form.Select id='medical_services_id' onChange={handleChange} value={formData.medical_services_id}>
              <option value={0}>{t('Select')}</option>
              {medicalServiceList?.map((medicalService: any) => (
                <option key={medicalService.id} value={medicalService.id}> {medicalService.title} </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }} >
            <Form.Label>{t('Analysis')}</Form.Label>

            {
              formData.analysis_ids?.map((analysis_id: number, index: number) => (
                <div key={index} className='d-flex  my-2'>
                  <Form.Select className='col' key={index} onChange={(e: any) => handelChangeAnalysisId(e, index)} value={analysis_id}>
                    <option value={0}>{t('Select')}</option>
                    {analysisList?.map((analysis: any) => (
                      <option key={analysis.id} value={analysis.id}> {analysis.title} </option>
                    ))}
                  </Form.Select>
                  <Button variant='danger' onClick={() => handelRemoveAnalysisId(index)} className=' '>
                    {t('Remove')}
                  </Button>
                </div>
              ))
            }

            <Button variant='primary' onClick={handelEditAnalysisId} className='my-5'>
              {t('Add Analysis')}
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
