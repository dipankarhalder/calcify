import axios from "axios";
import { api_base_path } from "./baseUrlConfig";

export const axiosLogInstance = axios.create({
  baseURL: api_base_path,
});
axiosLogInstance.defaults.headers.common["Content-Type"] = "application/json";

export const axiosMainInstance = axios.create({
  baseURL: api_base_path,
});
axiosMainInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosMainInstance.interceptors.request.use(
  config => {
    const logAccess = localStorage.getItem("authToken");
    config.headers.Authorization = logAccess;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axiosMainInstance.interceptors.response.use(
  response => {
    if (response.data.code === -10) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
      return Promise.reject(response.data);
    }
    if (response.data.code !== 200) {
      return Promise.reject(response.data);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
