import HttpService from "./http-service";

class AuthService extends HttpService {
  login = async (data) => {
    try {
      let response = await this.postRequest("login", data);
      let result = response.result;
      let local_user = {
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        user_id: result.user._id,
      };
      localStorage.setItem("mern_token", result.token);
      localStorage.setItem("mern_user", JSON.stringify(local_user));
      return local_user;
    } catch (err) {
      throw err;
    }
  };
}
export const auth_svc = new AuthService();
export default AuthService;
