import {
  CreateLoungeParams,
  CreateLoungeResponse,
  DeleteLoungeParams,
  DeleteLoungeResponse,
  ModifyLoungeParams,
  ModifyLoungeResponse,
} from "models/Lounge.interface";
import { localAxios } from "./http-commons";

export const createLounge = async (params: CreateLoungeParams): Promise<number> => {
  const url = `lounge`;
  const response = await localAxios.post(url, params);
  return response.data;
};

export const modifyLounge = async (params: ModifyLoungeParams): Promise<ModifyLoungeResponse> => {
  const { loungeId } = params;
  const url = `lounge/${loungeId}`;
  const response = await localAxios.patch(url, params);
  return response.data;
};

export const deleteLounge = async (params: DeleteLoungeParams): Promise<DeleteLoungeResponse> => {
  const { loungeId } = params;
  const url = `lounge/${loungeId}`;
  const response = await localAxios.delete(url);
  return response.data;
};
