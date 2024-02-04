import { CreateChannelParams } from "models/Channel.interface";
import { localAxios } from "./http-commons";

export const createChannel = async (params: CreateChannelParams) => {
  const url = `channel`;
  const response = await localAxios.post(url, params);
  return response.data;
};
