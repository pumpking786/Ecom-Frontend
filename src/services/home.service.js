import HttpService from "./http-service";

class HomeService extends HttpService {
  listAllBanners = async () => {
    //api call
    try {
      let response = await this.getRequest("/banner/active");
      if (response.status) {
        return response.result;
      } else {
        throw response.msg;
      }
    } catch (err) {
      throw err;
    }
  };
}
export const home_svc = new HomeService();
export default HomeService;
