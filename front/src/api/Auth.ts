import axios from "axios";
import { localAxios } from "./http-commons";
import { LoginResponse } from "models/Login.interface";

export const handleLogin = async (
  memberId: string,
  password: string
): Promise<LoginResponse> => {
  const response = await localAxios.post("/auth/login", {
    memberId,
    password,
  });
  return response.data;
};

export const handleLogout = async () => {
  const response = await localAxios.post("/auth/logout");
  return response;
};
export const githubLogin = async (code: string): Promise<LoginResponse> => {
  const response = await localAxios.get("/auth/oauth2/login/github", {
    params: {
      code: code,
    },
  });

  return response.data;
};
