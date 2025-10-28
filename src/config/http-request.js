import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  timeoutErrorMessage: "Server timed out...",
  headers: {
    "content-type": "application/json",
  },
});
export default axiosInstance;
