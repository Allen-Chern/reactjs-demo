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
});

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      //NotificationManager.error("Server error, please retry.");
      throw error;
    } else if (error.response?.status === 401) {
      //store.clear();
      // map shouldn't redirect to login.
      window.location.href = window.location.origin + "/login";
    } else {
      throw error.response;
    }
  }
);

export default service;
