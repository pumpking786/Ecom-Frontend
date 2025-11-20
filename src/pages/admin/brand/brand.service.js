import HttpService from "../../../services/http-service";

class BrandService extends HttpService {
  listAllBrands = async () => {
    try {
      let response = await this.getRequest("/brand");
      return response;
    } catch (error) {
      throw error;
    }
  };
  addBrand = async (data) => {
    try {
      let response = await this.postRequest("/brand", data, {
        login: true,
        files: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  updateBrand = async (data, id) => {
    try {
      let response = await this.putRequest("/brand/" + id, data, {
        login: true,
        files: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  deleteBrandById = async (id) => {
    try {
      let response = await this.deleteRequest("/brand/" + id, {
        login: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  getDetailById = async (id) => {
    try {
      let response = await this.getRequest("/brand/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export const brand_svc = new BrandService();
export default BrandService;
