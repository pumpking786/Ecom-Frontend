import HttpService from "../../../services/http-service";

class UserService extends HttpService {
  listAllUsers = async () => {
    try {
      let response = await this.getRequest("/user", {
        login: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  addUser = async (data) => {
    try {
      let response = await this.postRequest("/user", data, {
        login: true,
        files: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  updateUser = async (data, id) => {
    try {
      let response = await this.putRequest("/user/" + id, data, {
        login: true,
        files: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  changePasswordByAdmin = async (data, id) => {
    try {
      let response = await this.putRequest(
        "/user/changePasswordByAdmin/" + id,
        data,
        {
          login: true,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  deleteUserById = async (id) => {
    try {
      let response = await this.deleteRequest("/user/" + id, {
        login: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  getDetailById = async (id) => {
    try {
      let response = await this.getRequest("/user/" + id, {
        login: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export const user_svc = new UserService();
export default UserService;
