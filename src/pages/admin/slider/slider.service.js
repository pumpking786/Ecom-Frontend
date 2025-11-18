import HttpService from "../../../services/http-service";

class SliderService extends HttpService {
  listAllBanners = async () => {
    try {
      let response = await this.getRequest("/banner");
      return response;
    } catch (error) {
      throw error;
    }
  };
  addSlider = async (data) => {
    try {
      let response = await this.postRequest("/banner", data, {
        login: true,
        files: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export const slider_svc = new SliderService();
export default SliderService;
