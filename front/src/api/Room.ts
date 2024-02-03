import { CreateRoomParams, ModifyRoomParams } from "models/Room.interface";
import { localAxios } from "./http-commons";

export const createRoom = async (params: CreateRoomParams) => {
  const url = `room`;
  const response = await localAxios.post(url, params);

  return response.data; // The token
};

export const modifyRoom = async (params: ModifyRoomParams) => {
  const { roomId, title, description, capacity, notice, password, constraints, keywordIds } =
    params;
  const url = `room/${roomId}`;
  const body = {
    title,
    description,
    capacity,
    notice,
    password,
    constraints,
    keywordIds,
  };
  //roomId가 같이 바디에 들어가도 문제가 안 생긴다
  const response = await localAxios.patch(url, params);

  return response.data; // The token
};
