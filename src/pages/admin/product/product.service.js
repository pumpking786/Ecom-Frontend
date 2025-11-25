import HttpService from "../../../services/http-service";

class ProductService extends HttpService {
  listAllProducts = async () => {
    try {
      let response = await this.getRequest("/product");
      return response;
    } catch (error) {
      throw error;
    }
  };
  addProduct = async (data) => {
    try {
      let response = await this.postRequest("/product", data, {
        login: true,
        files: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  updateProduct = async (data, id) => {
    try {
      let response = await this.putRequest("/product/" + id, data, {
        login: true,
        files: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  deleteProductById = async (id) => {
    try {
      let response = await this.deleteRequest("/product/" + id, {
        login: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  getDetailById = async (id) => {
    try {
      let response = await this.getRequest("/product/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export const product_svc = new ProductService();
export default ProductService;
