import SwalShowAlert from "./swal/SwalShowAlert"

export default function HandelCatchError(error) {
  const validationErrorsObject = error.response?.data?.error || error.response?.data?.errors
  if (validationErrorsObject) {
     return SwalShowAlert('error',  Object.values(validationErrorsObject)[0][0])
  }
  
  
  SwalShowAlert('error', 'Error', error.response?.data?.error || error.response?.data?.message || error.response?.data || "Something went wrong. Please try again later.")
  console.log(error.response)
  console.log(error)



}