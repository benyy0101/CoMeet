// api.ts

import axios, { AxiosInstance } from "axios";
import store from "../store/index";
import { logout } from "../store/reducers/userSlice";

const baseURL = process.env.REACT_APP_API_SERVER_URL + ":3002";

const api: AxiosInstance = axios.create({
  baseURL,
});

// Request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token updates or refresh logic if needed
api.interceptors.response.use(
  (response) => {
    // You can handle token updates or refresh logic here if needed
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized, possibly due to expired token
      // Dispatch logout action and handle logout logic
      store.dispatch(logout());
      // Redirect or perform any necessary actions for logout
    }

    return Promise.reject(error);
  }
);

export default api;
