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
  listAllBrands = async () => {
    //api call
    try {
      let response = await this.getRequest("/brand/active");
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
  listAllProducts = async () => {
    //api call
    try {
      let response = await this.getRequest("/product");
      if (response.status) {
        let product_res = response.result.filter(
          (item) => item.status === "active"
        );
        return product_res;
      } else {
        throw response.msg;
      }
    } catch (err) {
      throw err;
    }
  };
  productByCatSlug = async (slug) => {
    try {
      let detail = await this.getRequest("/category/slug/" + slug);
      return detail;
      // console.log("Detail: ", detail);
    } catch (err) {
      throw err;
    }
  };
  getProductBySlug = async (slug) => {
    try {
      let detail = await this.getRequest("/product/slug/" + slug);
      return detail;
    } catch (err) {
      throw err;
    }
  };
}
export const home_svc = new HomeService();
export default HomeService;
