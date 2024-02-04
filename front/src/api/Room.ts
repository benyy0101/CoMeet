import {
  CreateRoomParams,
  DeleteRoomParams,
  ModifyRoomParams,
  SearchRoomParams,
} from "models/Room.interface";
import { localAxios } from "./http-commons";
import { makeQuerystring } from "utils/ApiUtil";

export const createRoom = async (params: CreateRoomParams) => {
  const url = `room`;
  const response = await localAxios.post(url, params);
  return response.data; // The token
};

export const modifyRoom = async (params: ModifyRoomParams) => {
  const { roomId } = params;
  const url = `room/${roomId}`;
  //roomId가 같이 바디에 들어가도 문제가 안 생긴다
  const response = await localAxios.patch(url, params);

  return response.data; // The token
};

export const searchRoom = async (params: SearchRoomParams) => {
  const url = `room${makeQuerystring(params)}`;
  const response = await localAxios.get(url);
  return response.data; // The token
};

export const deleteRoom = async (params: DeleteRoomParams) => {
  const { roomId } = params;
  const url = `room/${roomId}`;
  const response = await localAxios.delete(url);

  return response.data; // The token
};
