import { CreateRoomParams, ModifyRoomParams } from "models/Room.interface";
import { localAxios } from "./http-commons";

export const createRoom = async (params: CreateRoomParams) => {
  const { title, description, capacity, constraints, type } = params;
  const url = `room`;
  const body = { title, description, capacity, constraints, type };
  const response = await localAxios.post(url, JSON.stringify(body));
  console.log(response);

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
  const response = await localAxios.patch(url, body);
  console.log(response);

  return response.data; // The token
};
