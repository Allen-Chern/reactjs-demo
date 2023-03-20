import axios from "axios";
import { apiBaseUrl } from "../configs/api";

const headers = {
  "Content-Type": "application/json",
};

const baseUrl = apiBaseUrl;
const service = axios.create({
  baseURL: baseUrl,
  headers,
  timeout: 35000,
  withCredentials: true,
});

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
      return;
    }

    return error.response;
  }
);

export default service;
