import axios from 'axios'
import {AuthModel, UserModel} from './_models'
import postMethod from '../../../../functions/postMethod'
import Swal from 'sweetalert2'
import { t } from 'i18next'
import SwalShowAlert from '../../../../functions/swal/SwalShowAlert'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `/admins/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export async function login(email: string, password: string) {
  const response =  await postMethod(LOGIN_URL, {
    email,
    password,
  }) as any

  console.log(response)

  if (response?.status === 200) {
    SwalShowAlert('success', t('Signed In Successfully'))
    return response    
  }else{
    SwalShowAlert('error', t('Wrong email or password'))
  }
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export async function getUserByToken(token: string) {
  const res =  await axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })

  return

}
