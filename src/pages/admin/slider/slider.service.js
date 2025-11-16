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
}
export const slider_svc = new SliderService();
export default SliderService;
