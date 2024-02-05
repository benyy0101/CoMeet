import { CreateBoardParams, CreateBoardResponse } from "models/Board.interface";
import { localAxios } from "./http-commons";

export const createBoard = async (
  params: CreateBoardParams
): Promise<CreateBoardResponse> => {
  const url = `board`;
  const response = await localAxios.post(url, params);
  return response.data;
};
