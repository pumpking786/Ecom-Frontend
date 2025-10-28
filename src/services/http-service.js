import axiosInstance from "../config/http-request";

class HttpService {
  postRequest = async (url, data, config = {}) => {
    try {
      let response = await axiosInstance.post(url, data, config);
      if (response.status === 200) {
        return response.data;
      } else {
        throw response.data;
      }
    } catch (err) {
      throw err;
    }
  };
}
export default HttpService;
