import {
  CreateRoomParams,
  DeleteRoomParams,
  DeleteRoomResponse,
  EnterRoomParams,
  RoomResponse,
  GetRoomParams,
  LeaveRoomParams,
  ModifyRoomParams,
  ModifyRoomResponse,
  PermitJoinRoomParams,
  PermitJoinRoomResponse,
  SearchManagingParams,
  SearchManagingResponses,
  SearchRoomParams,
  SearchRoomResponse,
  WithdrawRoomParams,
  WithdrawRoomResponse,
  SmallRoomdata,
} from "models/Room.interface";
import { localAxios } from "./http-commons";
import { imageAxios } from "./http-commons";
import { makeQuerystring } from "utils/ApiUtil";

export const createRoom = async (params: CreateRoomParams): Promise<SmallRoomdata> => {
  const url = `room`;
  const response = await localAxios.post(url, params);
  return response.data;
};

export const modifyRoom = async (params: ModifyRoomParams): Promise<ModifyRoomResponse> => {
  const { roomId } = params;
  const url = `room/${roomId}`;
  //roomId가 같이 바디에 들어가도 문제가 안 생긴다
  const response = await localAxios.patch(url, params);

  return response.data;
};

export const searchRoom = async (params: SearchRoomParams): Promise<SearchRoomResponse> => {
  const url = `room${makeQuerystring(params)}`;
  console.log(url);
  const response = await localAxios.get(url);
  return response.data;
};

export const deleteRoom = async (params: DeleteRoomParams): Promise<DeleteRoomResponse> => {
  const { roomId } = params;
  const url = `room/${roomId}`;
  const response = await localAxios.delete(url);

  return response.data;
};

export const permitJoinRoom = async (
  params: PermitJoinRoomParams
): Promise<PermitJoinRoomResponse> => {
  const { roomId, memberId } = params;
  const url = `room/join/${roomId}`;
  const body = { memberId };
  const response = await localAxios.post(url, body);

  return response.data;
};

export const withdrawRoom = async (params: WithdrawRoomParams): Promise<WithdrawRoomResponse> => {
  const { roomId } = params;
  const url = `room/join/${roomId}`;
  const response = await localAxios.delete(url);

  return response.data;
};

export const getRoom = async (params: GetRoomParams): Promise<RoomResponse> => {
  const { roomId } = params;
  const url = `room/${roomId}`;
  const response = await localAxios.get(url);

  return response.data;
};

export const enterRoom = async (params: EnterRoomParams): Promise<RoomResponse> => {
  const { roomId, password } = params;
  const url = `room/${roomId}/enter`;
  const response = await localAxios.post(url, { password });

  return response.data;
};

export const leaveRoom = async (params: LeaveRoomParams) => {
  const { roomId } = params;
  const url = `room/${roomId}/enter`;

  //이거 잘되는지 확인 필요
  const response = await localAxios.delete(url);
  return response.data;
};

export const searchManagingRoom = async (
  params: SearchManagingParams
): Promise<SearchManagingResponses[]> => {
  const url = `room/managing`;
  const response = await localAxios.get(url);
  return response.data;
};

//방 이미지 수정
export const uploadRoomImage = async (roomId: string, fileImage: FormData) => {
  const url = `room/image/${roomId}`;
  const response = await imageAxios.post(url, fileImage);
};

export const deleteRoomImage = async (roomId: string) => {
  const url = `room/image/${roomId}`;
  const response = await localAxios.delete(url);
};
