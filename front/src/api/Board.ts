import {
  CreateBoardParams,
  CreateBoardResponse,
  ModifyBoardParams,
  ModifyBoardResponse,
} from "models/Board.interface";
import { localAxios } from "./http-commons";

export const createBoard = async (
  params: CreateBoardParams
): Promise<CreateBoardResponse> => {
  const url = `board`;
  const response = await localAxios.post(url, params);
  return response.data;
};

export const modifyBoard = async (
  params: ModifyBoardParams
): Promise<ModifyBoardResponse> => {
  const { boardId } = params;
  const url = `board/${boardId}`;
  const response = await localAxios.patch(url, params);
  return response.data;
};
