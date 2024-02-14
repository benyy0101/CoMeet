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
  console.log("api logout");
  const response = await localAxios.post("/auth/logout");
  return response;
};
