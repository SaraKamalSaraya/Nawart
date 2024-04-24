import axios from "axios"
import HandelCatchError from "./HandelCatchError"

const GetMethod = async (endPoint) => {
  const authToken =  `Bearer ${JSON.parse(localStorage.getItem("auth-token"))}`
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + endPoint ,{
      headers: {
        Authorization: authToken
      }
    })

    if (response.status === 200 || response.status === 201) {
      return response
    }
  } catch (error) {
    HandelCatchError(error)
    return error.response
  }
}

export default GetMethod