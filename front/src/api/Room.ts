import { CreateRoomParams } from "models/Room.interface";
import { localAxios } from "./http-commons";

export const createRoom = async (params: CreateRoomParams) => {
  const { title, description, capacity, constraints, type } = params;
  // const url = `/room`;
  const url = "room";
  console.log(JSON.stringify(params));
  const response = await localAxios.post(url, JSON.stringify(params));
  console.log(response);

  return response.data; // The token
};
