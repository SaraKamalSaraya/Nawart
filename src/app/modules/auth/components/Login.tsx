/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { getUserByToken, login } from '../core/_requests'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useAuth } from '../core/Auth'
import { t, use } from 'i18next'
import { UserModel } from '../core/_models'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(t('Wrong email format'))
    .min(3, t('Minimum 3 symbols'))
    .max(50, t('Maximum 50 symbols'))
    .required(t('Email is required')),
  password: Yup.string()
    .min(3, t('Minimum 3 symbols'))
    .max(50, t('Maximum 50 symbols'))
    .required(t('Password is required')),
})

const initialValues = {
  email: 'admin@gmail.com',
  password: 'admin123',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, saveCurrentUser } = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const response = await login(values.email, values.password) as any;

        // saveAuth({
        //   access_token: response.data?.access_token,
        // });
        // saveCurrentUser(response.data?.user);

        // sign in as fake data 
         saveAuth({
          access_token: 'fake_jwt_token',
         });
         saveCurrentUser({
          id: 1,
          name: 'Admin',
          email: 'ms@gmail.com',
          thumbnail_url: 'https://avatars.dicebear.com/v2/avataaars/example.svg?options[mood][]=happy',
          role: 0,
          password: '123456789',
         });
         
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus('The login detail is incorrect');
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>{t('Sign In to Nawart')}</h1>
        
      </div>
      {/* begin::Heading */}
      {/* 
      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            {t('Use account')} <strong>admin@demo.com</strong> {t('and')} {t('password')} <strong>{t('demo')}</strong>
             {t('to continue')}.
          </div>
        </div>
      )} */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>{t('Email')}</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>{t("Password")} </label>
            {/* end::Label */}
            {/* begin::Link */}
            {/* <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{ marginInline: '5px' }}
            >
              {t("Forgot Password")} ?
            </Link> */}
            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
          

      <div className="text-center">
        <button
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
        >
          {!loading && <span className='indicator-label'>{t("Continue")}</span>}
          {loading && (
            <span className='indicator-progress d-flex justify-content-center align-items-center' style={{ display: 'block' }}>
              {t("Please wait...")}
              {/* <span className='spinner-border spinner-border-sm align-middle ms-2'></span> */}
              <span className="loader align-middle ms-2 m-0 p-0" style={{width: '15px', height: '15px'}}></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
