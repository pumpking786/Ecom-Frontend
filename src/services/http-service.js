import axiosInstance from "../config/http-request";

class HttpService {
  postRequest = async (url, data, config = {}) => {
    try {
      console.log(data);
      let response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}
export default HttpService;
