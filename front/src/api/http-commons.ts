import axios, { AxiosInstance } from "axios";
import { logout, login } from "../store/reducers/userSlice";
import store from "../store/index";
//DO NOT TOUCH THIS SHIT
const baseURL: string = process.env.REACT_APP_API_SERVER_URL ?? "";

export const localAxios: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const imageAxios: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

localAxios.interceptors.request.use(
  (config) => {
    //console.log("interceptor");
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

imageAxios.interceptors.request.use(
  (config) => {
    console.log("interceptor");
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

localAxios.interceptors.response.use(
  async (response) => {
    if (response.data.jwtToken) {
      sessionStorage.setItem("accessToken", response.data.jwtToken.accessToken);
      sessionStorage.setItem(
        "refreshToken",
        response.data.jwtToken.refreshToken
      );
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
      // } else if (response.data === "logout") {
      //   console.log("interceptor");
      //   sessionStorage.removeItem("accessToken");
      //   sessionStorage.removeItem("refreshToken");
      //   return response;
    } else {
      console.log("response", response);
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    if (sessionStorage.getItem("refreshToken")) {
      const refreshResponse = await localAxios.patch(
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
