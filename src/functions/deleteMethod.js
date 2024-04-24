import axios from "axios"
import Swal from "sweetalert2";
import HandelCatchError from "./HandelCatchError";


const deleteMethod = async (endPoint, data) => {
  const authToken = `Bearer ${JSON.parse(localStorage.getItem("auth-token"))}`
  try {
    return axios.delete(process.env.REACT_APP_API_URL + endPoint, {
      headers: {
        Authorization: authToken
      }
    })
  } catch (error) {
    HandelCatchError(error)
  }
}

export default deleteMethod