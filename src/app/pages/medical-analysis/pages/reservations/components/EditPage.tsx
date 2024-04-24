import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import postMethod from '../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../functions/getMethod'

interface FormDataInterface {
  id: number;
  user_id: number;
  analysis_id: number[];
  analysis_group_id: number[];
  medical_center_id: number;
  booking_date: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string
}

export default function EditReservationPage() {
  const [formData, setFormData] = useState<FormDataInterface>({ id: 0, analysis_id: [0], analysis_group_id: [0] } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [analysisList, setAnalysisList] = useState([])
  const [analysisGroupsList, setAnalysisGroupsList] = useState([])
  const [medicalCentersList, setMedicalCentersList] = useState([])


  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await GetMethod(`/user`)
      setUsersList(res?.data.data)
    }

    const fetchAnalysis = async () => {
      const res = await GetMethod(`/analyses`)
      setAnalysisList(res?.data.data)
    }

    const fetchAnalysisGroups = async () => {
      const res = await GetMethod(`/analysis_groups`)
      setAnalysisGroupsList(res?.data.data)
    }

    const fetchMedicalCenters = async () => {
      const res = await GetMethod(`/medical_centers`)
      setMedicalCentersList(res?.data.medical_centers)
    }

    const fetchFormData = async () => {
      const res = await GetMethod(`/AnalysisBookings/${id}`)
      const bookingData = res?.data?.booking;

      const formattedData: FormDataInterface = {
        id: bookingData?.id,
        user_id: bookingData?.user?.id,
        analysis_id: bookingData?.analysis?.id || [0],
        analysis_group_id: bookingData?.analysis_group?.id || [0],
        medical_center_id: bookingData?.medical_center?.id,
        booking_date: bookingData?.booking_date?.split(' ')[0],
        status: bookingData?.status,
        notes: bookingData?.notes,
        created_at: bookingData?.created_at,
        updated_at: bookingData?.updated_at,
      };

      setFormData(formattedData);
    }

    fetchUsers()
    fetchAnalysis()
    fetchAnalysisGroups()
    fetchMedicalCenters()
    fetchFormData()
  }, [])



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handelAddAnalysisId = () => {
    setFormData((prevState) => ({
      ...prevState,
      analysis_id: [...prevState.analysis_id, 0],
    }))
  }

  const handelRemoveAnalysisId = (index: number) => {
    const newAnalysisId = [...formData.analysis_id]
    newAnalysisId.splice(index, 1)
    setFormData((prevState) => ({
      ...prevState,
      analysis_id: newAnalysisId
    }))
  }

  const handelChangeAnalysisId = (e: any, index: number) => {
    const newAnalysisId = [...formData.analysis_id]
    newAnalysisId[index] = e.target.value
    setFormData((prevState) => ({
      ...prevState,
      analysis_id: newAnalysisId
    }))
  }

  const handelAddAnalysisGroupId = () => {
    setFormData((prevState) => ({
      ...prevState,
      analysis_group_id: [...prevState.analysis_group_id, 0],
    }))
  }

  const handelRemoveAnalysisGroupId = (index: number) => {
    const new_Analysis_group_id = [...formData.analysis_group_id]
    new_Analysis_group_id.splice(index, 1)
    setFormData((prevState) => ({
      ...prevState,
      analysis_group_id: new_Analysis_group_id
    }))
  }

  const handelChangeAnalysisGroupId = (e: any, index: number) => {
    const new_Analysis_group_id = [...formData.analysis_group_id]
    new_Analysis_group_id[index] = e.target.value
    setFormData((prevState) => ({
      ...prevState,
      analysis_group_id: new_Analysis_group_id
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

    const response = await postMethod(`/AnalysisBookings/update/${id}`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully')

      setFormData({} as FormDataInterface)
      navigate('/medical-analysis/reservations')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Edit Analysis Reservation')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='user_id'>
            <Form.Label>{t('Patient')}</Form.Label>
            <Form.Select
              value={formData.user_id}
              onChange={handleChange}
              id='user_id'
            >
              <option value=''>{t('Select')}</option>
              {usersList?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {' '}
                  {item.first_name}{' '}{item.last_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='medical_center_id'>
            <Form.Label>{t('Medical Center')}</Form.Label>
            <Form.Select
              value={formData.medical_center_id}
              onChange={handleChange}
              id='medical_center_id'
            >
              <option value=''>{t('Select')}</option>
              {medicalCentersList?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {' '}
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='status'>
            <Form.Label>{t('Status')}</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={handleChange}
              id='status'
            >
              <option value=''>{t('Select')}</option>
              <option value='pending'> {t('Pending')}  </option>
              <option value='cancelled'> {t('Cancelled')} </option>
              <option value='confirmed'> {t('Confirmed')} </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='booking_date'>
            <Form.Label>{t('Booking Date')}</Form.Label>
            <Form.Control
              as='input'
              type='date'
              value={formData.booking_date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='my-5' style={{ width: '90%' }} controlId='notes'>
            <Form.Label>{t('Notes')}</Form.Label>
            <Form.Control
              as='textarea'
              rows={1}
              placeholder={t('Enter notes')}
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='analysis_id'>
            <Form.Label>{t('Analysis')}</Form.Label>
            {/* <Form.Select
              value={formData.analysis_id}
              onChange={handleChange}
              id='analysis_id'
            >
              <option value=''>{t('Select')}</option>
              {analysisList?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {' '}
                  {item.title}
                </option>
              ))}
            </Form.Select> */}
            {
              formData.analysis_id?.map((analysis_id: number, index: number) => (
                <div key={index} className='d-flex  my-2'>
                  <Form.Select className='col' key={index} onChange={(e: any) => handelChangeAnalysisId(e, index)}
                    value={analysis_id}
                  >
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
            <Button variant='primary' onClick={handelAddAnalysisId} className='my-5'>
              {t('Add Analysis')}
            </Button>
          </Form.Group>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='analysis_group_id'>
            <Form.Label>{t('Analysis Groups')}</Form.Label>
            {/* <Form.Select
              value={formData.analysis_group_id}
              onChange={handleChange}
              id='analysis_group_id'
            >
              <option value=''>{t('Select')}</option>
              {analysisGroupsList?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {' '}
                  {item.name}
                </option>
              ))}
            </Form.Select> */}
            {
              formData.analysis_group_id?.map((analysis_group_id: number, index: number) => (
                <div key={index} className='d-flex  my-2'>
                  <Form.Select className='col' key={index} onChange={(e: any) => handelChangeAnalysisGroupId(e, index)}
                    value={analysis_group_id}
                  >
                    <option value={0}>{t('Select')}</option>
                    {analysisGroupsList?.map((group: any) => (
                      <option key={group.id} value={group.id}> {group.name} </option>
                    ))}
                  </Form.Select>
                  <Button variant='danger' onClick={() => handelRemoveAnalysisGroupId(index)} className=' '>
                    {t('Remove')}
                  </Button>
                </div>
              ))
            }
            <Button variant='primary' onClick={handelAddAnalysisGroupId} className='my-5'>
              {t('Add Analysis Group')}
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
