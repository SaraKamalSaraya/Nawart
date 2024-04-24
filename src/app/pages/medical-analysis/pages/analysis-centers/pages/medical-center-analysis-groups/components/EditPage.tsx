import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../../../functions/getMethod';
import postMethod from '../../../../../../../../functions/postMethod';
import SwalShowAlert from '../../../../../../../../functions/swal/SwalShowAlert';

interface FormDataInterface {
  price: string
  analysis_group_id: number
  medical_center_id: number
}

export default function EditMedicalCenterAnalysisGroupPage() {
  const [formData, setFormData] = useState<FormDataInterface>({
    medical_center_id: 0,
    price: '0',
    analysis_group_id: 0
  } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [analysisGroupList, setAnalysisGroupList] = useState<any[]>([])
  const [medicalCenterList, setMedicalCenterList] = useState<any[]>([])

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {

    const fetchData = async () => {
      const res = await GetMethod(`/medical-center-analysis-groups/${id}`)
      setFormData(res?.data?.data)
    }
    const fetchAnalysisGroupList = async () => {
      const res = await GetMethod('/analysis_groups')
      setAnalysisGroupList(res?.data?.data)
    }


    const fetchMedicalCenterList = async () => {
      const res = await GetMethod('/medical_centers')
      setMedicalCenterList(res?.data?.medical_centers)
    }


    fetchAnalysisGroupList()
    fetchMedicalCenterList()
    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }



  // const handelAddMedicalCenterId = () => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     medical_center_id: [...prevState.medical_center_id, 0],
  //   }))
  // }

  // const handelRemoveMedicalCenterId = (index: number) => {
  //   const newMedicalCenterIds = [...formData.medical_center_id]
  //   newMedicalCenterIds.splice(index, 1)
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     medical_center_id: newMedicalCenterIds
  //   }))
  // }


  // const handelChangeMedicalCenterId = (e: any, index: number) => {
  //   const newMedicalCenterIds = [...formData.medical_center_id]
  //   newMedicalCenterIds[index] = e.target.value
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     medical_center_id: newMedicalCenterId
  //   }))
  // }

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

    // formData.medical_center_ids.map((item, index) => {
    //   formDataToSend.append(`medical_center_ids[${index}]`, item as any)      
    // })

    const response = await postMethod(`/medical-center-analysis-groups/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/medical-analysis/analysis-centers/analysis-groups')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Medical Center Analysis Group')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>


          <Form.Group className='my-5' style={{ width: '45%' }} controlId='price'>
            <Form.Label>{t('Price')}</Form.Label>
            <Form.Control type='text' placeholder={t('Enter Price')} value={formData.price} onChange={handleChange} />
          </Form.Group>


          <Form.Group className='my-5' style={{ width: '45%' }} controlId='analysis_group_id'>
            <Form.Label>{t('Analysis Group')}</Form.Label>
            <Form.Select onChange={handleChange} value={formData.analysis_group_id}>
              <option value={0}>{t('Select')}</option>
              {analysisGroupList?.map((analysisGroup: any) => (
                <option key={analysisGroup.id} value={analysisGroup.id}> {analysisGroup.name} </option>
              ))}
            </Form.Select>
          </Form.Group>



          {/* <Form.Group className='my-5' style={{ width: '45%' }} controlId='medical_center_ids'>
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
          </Form.Group> */}

          <Form.Group className='my-5' style={{ width: '45%' }} controlId='medical_center_id'>
            <Form.Label>{t('Medical Center')}</Form.Label>
            <div className='d-flex  my-2'>
              <Form.Select className='col' onChange={handleChange} value={formData.medical_center_id}>
                <option value={0}>{t('Select')}</option>
                {medicalCenterList?.map((medicalCenter: any) => (
                  <option key={medicalCenter.id} value={medicalCenter.id}> {medicalCenter.name} </option>
                ))}
              </Form.Select>
            </div>
          </Form.Group>

        </div>


        <Button variant='primary' type='submit' disabled={loading} className='w-200px mx-4'>
          {loading ? t('Loading...') : t('Submit')}
        </Button>
      </Form>
    </Container>
  )
}
