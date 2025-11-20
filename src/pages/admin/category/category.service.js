import HttpService from "../../../services/http-service";

class CategoryService extends HttpService {
  listAllCategories = async () => {
    try {
      let response = await this.getRequest("/category");
      return response;
    } catch (error) {
      throw error;
    }
  };
  addCategory = async (data) => {
    try {
      let response = await this.postRequest("/category", data, {
        login: true,
        files: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  updateCategory = async (data, id) => {
    try {
      let response = await this.putRequest("/category/" + id, data, {
        login: true,
        files: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  deleteCategoryById = async (id) => {
    try {
      let response = await this.deleteRequest("/category/" + id, {
        login: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  getDetailById = async (id) => {
    try {
      let response = await this.getRequest("/category/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export const category_svc = new CategoryService();
export default CategoryService;
