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
  listAllcategories = async () => {
    //api call
    try {
      let response = await this.getRequest("/category");
      if (response.status) {
        let cat_res = response.result.filter(
          (item) => item.status === "active"
        );
        return cat_res;
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
