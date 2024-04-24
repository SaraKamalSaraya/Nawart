import axios from "axios";
import SwalShowAlert from "./swal/SwalShowAlert";
import HandelCatchError from "./HandelCatchError";

const postMethod = async (endPoint, data) => {
  const authToken = `Bearer ${JSON.parse(localStorage.getItem("auth-token"))}`
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + endPoint, data, {
      headers: {
        Authorization: authToken

      }
    });

    if (response.status == 200 || response.status == 201) {
      return response      
    }
  } catch (error) {
    HandelCatchError(error)
  }
};

export default postMethod;
