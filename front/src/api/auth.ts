// api.ts

import axios, { AxiosInstance } from "axios";
import store from "../store/index";
import { logout, login } from "../store/reducers/userSlice";
import { useDispatch } from "react-redux";
import session from "redux-persist/lib/storage/session";
import { Session } from "openvidu-browser";

const baseURL = process.env.REACT_APP_API_SERVER_URL + ":3002";

const refreshAccessToken = async () => {
  try {
    if (sessionStorage.getItem("refreshToken")) {
      const refreshResponse = await api.patch(
        "/auth/reissue",
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("refreshToken")}`,
          },
        }
      );
      const newAccessToken = refreshResponse.data;
      sessionStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } else {
      throw new Error("Refresh token not found");
    }
  } catch (refreshError) {
    //이것도 안되면 처음 페이지로 이동
    console.error("Refresh token failed:", refreshError);
    throw refreshError;
  }
};

const api: AxiosInstance = axios.create({
  baseURL,
});

// Request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    if (response.data.accessToken) {
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      store.dispatch(login(response.data));
      return response;
    } else if (response.data.code === "NOT_VALID_USER") {
      sessionStorage.removeItem("accessToken");
      console.log(response.data.code);
      try {
        const refreshedResponse = await refreshAccessToken();
        return refreshedResponse;
      } catch (error) {
        store.dispatch(logout());
        //window.location.href = "/";
      }
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
