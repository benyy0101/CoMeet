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
export const githubLogin = async (): Promise<LoginResponse> => {
  const response = await axios.get(
    "https://github.com/login/oauth/authorize?client_id=ee190e90e2c248f7e25d&scope=user:email"
  );
  return response.data;
};
