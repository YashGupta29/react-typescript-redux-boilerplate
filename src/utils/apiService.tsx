import axios, { AxiosRequestConfig } from "axios";

// constants
import { BASE_API_URL } from "../constants";

// utils
import { getObject, setObject } from "./localStorage";

class ApiService {
  constructor() {
    axios.interceptors.request.use(
      async (config) => {
        const accessToken = await getObject("accessToken");
        if (config.headers && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 401 &&
          !prevRequest.url.includes("/auth/refresh") &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const {
            data: { accessToken },
          } = await this.refresh();
          prevRequest.headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          setObject("accessToken", JSON.stringify(accessToken));
          return axios(prevRequest);
        }
        return Promise.reject(error);
      }
    );
  }
  get(url: string, config: AxiosRequestConfig = {}) {
    return axios.get(BASE_API_URL + url, {
      ...config,
      withCredentials: true,
    });
  }
  delete(url: string, config: AxiosRequestConfig = {}) {
    return axios.delete(BASE_API_URL + url, {
      ...config,
      withCredentials: true,
    });
  }
  post(
    url: string,
    payload: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ) {
    return axios.post(BASE_API_URL + url, payload, {
      ...config,
      withCredentials: true,
    });
  }
  put(
    url: string,
    payload: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ) {
    return axios.put(BASE_API_URL + url, payload, {
      ...config,
      withCredentials: true,
    });
  }
  patch(
    url: string,
    payload: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ) {
    return axios.patch(BASE_API_URL + url, payload, {
      ...config,
      withCredentials: true,
    });
  }
  refresh() {
    return axios.get(BASE_API_URL + "/v1/auth/refresh", {
      withCredentials: true,
    });
  }
  setHeader(headerName: string, value: string) {
    axios.defaults.headers.common[headerName] = value;
  }
  response(isSuccessful: boolean, data: {} | string, error: string) {
    return { isSuccessful: isSuccessful, data: data, error: error };
  }
}

const apiService = new ApiService();

export default apiService;
