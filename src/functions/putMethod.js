import axios from "axios"
import SwalShowAlert from "./swal/SwalShowAlert"
import HandelCatchError from "./HandelCatchError"

const putMethod = async (endPoint,data) => {
  const authToken =  `Bearer ${JSON.parse(localStorage.getItem("auth-token"))}`
  try {
    const response = await axios.put(process.env.REACT_APP_API_URL + endPoint, data,{
      headers: {
        Authorization: authToken
      }
    })
    SwalShowAlert("success",response.data.message)
    return response
  } catch (error) {
    HandelCatchError(error)
  }
}

export default putMethod