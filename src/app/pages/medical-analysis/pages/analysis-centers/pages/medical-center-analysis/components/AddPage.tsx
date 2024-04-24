import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../../../functions/getMethod';
import postMethod from '../../../../../../../../functions/postMethod';
import SwalShowAlert from '../../../../../../../../functions/swal/SwalShowAlert';

interface FormDataInterface {
  price: string
  analysis_id: number
  medical_center_ids: number[]
}

export default function AddMedicalCenterAnalysisPage() {
  const [formData, setFormData] = useState<FormDataInterface>({
    medical_center_ids: [0],
  } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [analysisList, setAnalysisList] = useState<any[]>([])
  const [medicalCenterList, setMedicalCenterList] = useState<any[]>([])

  const navigate = useNavigate()

  useEffect(() => {

    const fetchAnalysisList = async () => {
      const res = await GetMethod('/analyses')
      setAnalysisList(res?.data?.data)
    }


    const fetchMedicalCenterList = async () => {
      const res = await GetMethod('/medical_centers')
      setMedicalCenterList(res?.data?.medical_centers)
    }


    fetchAnalysisList()
    fetchMedicalCenterList()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }



  const handelAddMedicalCenterId = () => {
    setFormData((prevState) => ({
      ...prevState,
      medical_center_ids: [...prevState.medical_center_ids, 0],
    }))
  }

  const handelRemoveMedicalCenterId = (index: number) => {
    const newMedicalCenterIds = [...formData.medical_center_ids]
    newMedicalCenterIds.splice(index, 1)
    setFormData((prevState) => ({
      ...prevState,
      medical_center_ids: newMedicalCenterIds
    }))
  }


  const handelChangeMedicalCenterId = (e: any, index: number) => {
    const newMedicalCenterIds = [...formData.medical_center_ids]
    newMedicalCenterIds[index] = e.target.value
    setFormData((prevState) => ({
      ...prevState,
      medical_center_ids: newMedicalCenterIds
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value == null || key == 'medical_center_ids') {
        return
      } else {
        formDataToSend.append(key, value)
      }
    })

    formData.medical_center_ids.map((item, index) => {
      formDataToSend.append(`medical_center_ids[${index}]`, item as any)      
    })

    const response = await postMethod(`/medical-center-analysis`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Created successfully')

      setFormData({} as FormDataInterface)
      navigate('/medical-analysis/analysis-centers/analysis')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Add Medical Center Analysis')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>


          <Form.Group className='my-5' style={{ width: '45%' }} controlId='price'>
            <Form.Label>{t('Price')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Price')} value={formData.price} onChange={handleChange} />
          </Form.Group>


          <Form.Group className='my-5' style={{ width: '45%' }} controlId='analysis_id'>
            <Form.Label>{t('Analysis')}</Form.Label>
            <Form.Select onChange={handleChange} value={formData.analysis_id}>
              <option value={0}>{t('Select')}</option>
              {analysisList?.map((analysis: any) => (
                <option key={analysis.id} value={analysis.id}> {analysis.title} </option>
              ))}
            </Form.Select>
          </Form.Group>



          <Form.Group className='my-5' style={{ width: '45%' }} controlId='medical_center_ids'>
            <Form.Label>{t('Medical Center')}</Form.Label>
            {
              formData.medical_center_ids?.map((medical_center_id: number, index: number) => (
                <div key={index} className='d-flex  my-2'>
                  <Form.Select className='col' key={index} onChange={(e: any) => handelChangeMedicalCenterId(e, index)} value={medical_center_id}>
                    <option value={0}>{t('Select')}</option>
                    {medicalCenterList?.map((medicalCenter: any) => (
                      <option key={medicalCenter.id} value={medicalCenter.id}> {medicalCenter.name} </option>
                    ))}
                  </Form.Select>
                  <Button variant='danger' onClick={() => handelRemoveMedicalCenterId(index)} className=' '>
                    {t('Remove')}
                  </Button>
                </div>
              ))
            }

            <Button variant='primary' onClick={handelAddMedicalCenterId} className='my-5'>
              {t('Add Medical Center')}
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
