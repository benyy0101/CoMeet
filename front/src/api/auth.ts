import { UserState } from "../types";
import { localAxios } from "./http-commons";

export const handleLogin = async (
  email: string,
  password: string
): Promise<UserState> => {
  const response = await localAxios.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const handleLogout = async () => {
  const response = await localAxios.post("/auth/logout");
  return response;
};
