import {
  CreateChannelParams,
  CreateChannelResponse,
  ModifyChannelParams,
  ModifyChannelResponse,
} from "models/Channel.interface";
import { localAxios } from "./http-commons";

export const createChannel = async (
  params: CreateChannelParams
): Promise<CreateChannelResponse> => {
  const url = `channel`;
  const response = await localAxios.post(url, params);
  return response.data;
};

export const modifyChannel = async (
  params: ModifyChannelParams
): Promise<ModifyChannelResponse> => {
  const { roomId } = params;
  const url = `channel/${roomId}`;
  const response = await localAxios.patch(url, params);
  return response.data;
};
