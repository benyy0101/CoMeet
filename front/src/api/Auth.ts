import { localAxios } from "./http-commons";
import { LoginQuery } from "models/Login.interface";

export const handleLogin = async (memberId: string, password: string): Promise<LoginQuery> => {
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
