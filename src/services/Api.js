import axios from "axios";
import { API_URL} from "../enviroments";

export function getAxiosInstance({ baseURL = null, token = null } = {}) {
  const axiosInstance = axios.create({
    baseURL: baseURL || API_URL,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const hasErrors = error.response?.data?.errors;
      const message = hasErrors ? hasErrors.join(", ") : error.message;
      return Promise.reject({ code: error.code, message });
    },
  );

  return axiosInstance;
}
