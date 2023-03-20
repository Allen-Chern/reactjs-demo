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
    return error.response;
  }
);

export default service;
