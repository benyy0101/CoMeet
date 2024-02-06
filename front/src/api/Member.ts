import { MemberQuery } from "models/Member.interface";
import { localAxios } from "./http-commons";

export const handleMember = async (memberId: string): Promise<MemberQuery> => {
  const response = await localAxios.get(`/member/${memberId}`);
  console.log(response.data);
  console.log("dfjioefjowejf");
  return response.data;
};
