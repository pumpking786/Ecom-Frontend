import axios from "axios";
import { toast } from "react-toastify";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  timeoutErrorMessage: "Server timed out...",
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      //needs a logout
      localStorage.removeItem("_mern15_token");
      localStorage.removeItem("_mern15_user");
      window.location.href = "/login";
    } else if (error.response.status === 404 || error.response.status === 403) {
      console.log("here: ", error);
      toast.error(error.response.data.msg);
    } else {
      throw error;
    }
  }
);

export default axiosInstance;
