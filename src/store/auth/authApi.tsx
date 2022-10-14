// utils
import apiService from "../../utils/apiService";

// interface
interface Authenticate {
  email?: string;
  mobileNumber?: string;
}

interface Verify {
  email?: string;
  mobileNumber?: string;
  code: string;
}

interface Signup {
  firstName: string;
  lastName: string;
  email: string;
}

// methods
class AuthApi {
  async authenticate(data: Authenticate) {
    try {
      const res = await apiService.post(`/v1/auth`, { ...data });
      return apiService.response(true, res.data.mode, "");
    } catch (err: any) {
      return apiService.response(false, {}, err.response.data.message);
    }
  }

  async googleAuth(token: string) {
    try {
      const res = await apiService.post(`/v1/auth/google`, { token });
      return apiService.response(true, res.data.accessToken, "");
    } catch (err: any) {
      return apiService.response(false, {}, err.response.data.message);
    }
  }

  async facebookAuth(token: string) {
    try {
      const res = await apiService.post(`/v1/auth/facebook`, { token });
      return apiService.response(true, res.data.accessToken, "");
    } catch (err: any) {
      return apiService.response(false, {}, err.response.data.message);
    }
  }

  async verify(data: Verify) {
    try {
      const res = await apiService.post(`/v1/auth/verify`, { ...data });
      return apiService.response(true, res.data?.accessToken || {}, "");
    } catch (err: any) {
      return apiService.response(false, {}, err.response.data.message);
    }
  }

  async signup(data: Signup) {
    try {
      const res = await apiService.post("/v1/auth/signup", { ...data });
      return apiService.response(true, res.data.accessToken, "");
    } catch (err: any) {
      return apiService.response(false, {}, err.response.data.message);
    }
  }

  async validate() {
    try {
      const res = await apiService.get("/v1/user");
      return apiService.response(true, res.data, "");
    } catch (err: any) {
      return apiService.response(false, {}, err.response.data.message);
    }
  }

  async logout() {
    try {
      await apiService.get("/v1/auth/logout");
      return apiService.response(true, {}, "");
    } catch (err: any) {
      return apiService.response(false, {}, err.response.data.message);
    }
  }
}

const authApi = new AuthApi();
export default authApi;
