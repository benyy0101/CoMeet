import {
  CreateChannelParams,
  CreateChannelResponse,
  DeleteChannelParams,
  DeleteChannelResponse,
  ModifyChannelParams,
  ModifyChannelResponse,
} from "models/Channel.interface";
import { localAxios } from "./http-commons";

export const createChannel = async (
  params: CreateChannelParams
): Promise<number> => {
  const url = `channel`;
  const response = await localAxios.post(url, params);
  return response.data;
};

export const modifyChannel = async (
  params: ModifyChannelParams
): Promise<ModifyChannelResponse> => {
  const { channelId } = params;
  const url = `channel/${channelId}`;
  const response = await localAxios.patch(url, params);
  return response.data;
};

export const deleteChannel = async (
  params: DeleteChannelParams
): Promise<DeleteChannelResponse> => {
  const { channelId } = params;
  const url = `channel/${channelId}`;
  const response = await localAxios.delete(url);
  return response.data;
};
