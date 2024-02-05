import { UserState } from "../types";
import { localAxios } from "./http-commons";
import { LoginQuery,SignupQuery } from "models/Login.interface";


export const handleLogin = async (
  memberId: string,
  password: string
): Promise<LoginQuery> => {
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


export const handleSignup = async (req: SignupQuery) : Promise<SignupQuery>=> {
  const response = await localAxios.post("/auth/signup",req);
  return response.data;
}
