import { MemberQuery } from "models/Member.interface";
import { localAxios } from "./http-commons";
import { SignupQuery } from "models/Login.interface";

export const handleMember = async (memberId: string): Promise<MemberQuery> => {
  const response = await localAxios.get(`/member/${memberId}`);
  return response.data;
};

export const handleSignup = async (req: SignupQuery): Promise<SignupQuery> => {
  const response = await localAxios.post("/member", req);
  return response.data;
};
