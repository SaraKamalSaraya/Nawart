import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import postMethod from '../../../../../../functions/postMethod'
import SwalShowAlert from '../../../../../../functions/swal/SwalShowAlert'
import { useNavigate, useParams } from 'react-router-dom'
import GetMethod from '../../../../../../functions/getMethod'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'

interface FormDataInterface {
  icon: string
  title: string
  analysis_ids: number[]
  analysis_group_ids: number[]
}

export default function AddBodyFunctionPage() {
  const [formData, setFormData] = useState<FormDataInterface>({
    analysis_ids: [0],
    analysis_group_ids: [0],
  } as FormDataInterface)
  const [loading, setLoading] = useState(false)
  const [iconPreview, setIconPreview] = useState<string | null>(null)
  const [analysisList, setAnalysisList] = useState<any[]>([])
  const [analysisGroupList, setAnalysisGroupList] = useState<any[]>([])

  const navigate = useNavigate()
  useEffect(() => {
    const fetchAnalysisList = async () => {
      const res = await GetMethod('/analyses')
      setAnalysisList(res?.data?.data)
    }

    const fetchAnalysisGroupList = async () => {
      const res = await GetMethod('/analysis_groups')
      setAnalysisGroupList(res?.data?.data)
    }
    fetchAnalysisList()
    fetchAnalysisGroupList()
  }, [])

  const handelAddAnalysisId = () => {
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
      analysis_ids: newAnalysisIds,
    }))
  }

  const handelChangeAnalysisId = (e: any, index: number) => {
    const newAnalysisIds = [...formData.analysis_ids]
    newAnalysisIds[index] = e.target.value
    setFormData((prevState) => ({
      ...prevState,
      analysis_ids: newAnalysisIds,
    }))
  }

  const handelAddAnalysisGroupId = () => {
    setFormData((prevState) => ({
      ...prevState,
      analysis_group_ids: [...prevState.analysis_group_ids, 0],
    }))
  }

  const handelRemoveAnalysisGroupId = (index: number) => {
    const newAnalysisGroupIds = [...formData.analysis_group_ids]
    newAnalysisGroupIds.splice(index, 1)
    setFormData((prevState) => ({
      ...prevState,
      analysis_group_ids: newAnalysisGroupIds,
    }))
  }

  const handelChangeAnalysisGroupId = (e: any, index: number) => {
    const newAnalysisGroupIds = [...formData.analysis_group_ids]
    newAnalysisGroupIds[index] = e.target.value
    setFormData((prevState) => ({
      ...prevState,
      analysis_group_ids: newAnalysisGroupIds,
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null
    setFormData({ ...formData, icon: file })

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setIconPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setIconPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log(formData)

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value == null) {
        return
      } else if (key == 'analysis_ids') {
        value.forEach((val: number)  => {
          formDataToSend.append('analysis_ids[]', val.toString());
      });
        // formDataToSend.append('analysis_ids[]', value)
      } else if (key == 'analysis_group_ids') {
        value.forEach((val: number)  => {
          formDataToSend.append('analysis_group_ids[]', val.toString());
      });
        // formDataToSend.append('analysis_group_ids[]', value)
      } else {
        formDataToSend.append(key, value)
      }
    })

    const response = await postMethod(`/body_functions`, formDataToSend)
    setLoading(false)

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Created successfully')

      setFormData({} as FormDataInterface)
      navigate('/medical-analysis/body-functions')
    }
  }
  return (
    <Container className='mt-5 card p-8'>
      <h2>{t('Add BodyFunction')}</h2>
      <Form onSubmit={handleSubmit} className='mt-5 '>
        <div className='row w-100'>
          <Form.Group className='my-5' style={{ width: '45%' }} controlId='title'>
            <Form.Label>{t('Title')}</Form.Label>
            <Form.Control
              type='text'
              placeholder={t('Enter Name')}
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='my-5' style={{width: '45%'}} controlId='icon'>
            <Form.Label>{t('Icon')}</Form.Label>
            <Form.Control type='file' onChange={handleFileChange} />
            {iconPreview && <img src={iconPreview} alt='icon' width={100} height={100} />}
          </Form.Group>

          
          <Form.Group className='my-5' style={{ width: '45%' }}>
            <Form.Label>{t('Analysis')}</Form.Label>

            {formData.analysis_ids?.map((analysis_id: number, index: number) => (
              <div key={index} className='d-flex  my-2'>
                <Form.Select
                  className='col'
                  key={index}
                  onChange={(e: any) => handelChangeAnalysisId(e, index)}
                  value={analysis_id}
                >
                  <option value={0}>{t('Select')}</option>
                  {analysisList?.map((analysis: any) => (
                    <option key={analysis.id} value={analysis.id}>
                      {' '}
                      {analysis.title}{' '}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant='danger'
                  onClick={() => handelRemoveAnalysisId(index)}
                  className=' '
                >
                  {t('Remove')}
                </Button>
              </div>
            ))}

            <Button variant='primary' onClick={handelAddAnalysisId} className='my-5'>
              {t('Add Analysis')}
            </Button>
          </Form.Group>

          <Form.Group className='my-5' style={{ width: '45%' }}>
            <Form.Label>{t('Analysis Group')}</Form.Label>

            {formData.analysis_group_ids?.map((analysis_group_id: number, index: number) => (
              <div key={index} className='d-flex  my-2'>
                <Form.Select
                  className='col'
                  key={index}
                  onChange={(e: any) => handelChangeAnalysisGroupId(e, index)}
                  value={analysis_group_id}
                >
                  <option value={0}>{t('Select')}</option>
                  {analysisGroupList?.map((analysisGroup: any) => (
                    <option key={analysisGroup.id} value={analysisGroup.id}>
                      {analysisGroup.name}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant='danger'
                  onClick={() => handelRemoveAnalysisGroupId(index)}
                  className=' '
                >
                  {t('Remove')}
                </Button>
              </div>
            ))}

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
