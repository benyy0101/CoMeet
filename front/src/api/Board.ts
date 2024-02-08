import SearchBoardResponse, {
  CreateBoardParams,
  CreateBoardResponse,
  DeleteBoardParams,
  DeleteBoardResponse,
  EnterBoardParams,
  EnterBoardResponse,
  LikeBoardParams,
  LikeBoardResponse,
  ModifyBoardParams,
  ModifyBoardResponse,
  SearchBoardParams,
  UnlikeBoardParams,
  UnlikeBoardResponse,
} from "models/Board.interface";
import { localAxios } from "./http-commons";
import { makeQuerystring } from "utils/ApiUtil";

export const createBoard = async (
  params: CreateBoardParams
): Promise<CreateBoardResponse> => {
  const url = `board`;
  const response = await localAxios.post(url, params);
  return response.data;
};

export const searchBoard = async (
  params: SearchBoardParams
): Promise<SearchBoardResponse> => {
  const url = `board${makeQuerystring(params)}`;
  const response = await localAxios.get(url);
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

export const deleteBoard = async (
  params: DeleteBoardParams
): Promise<DeleteBoardResponse> => {
  const { boardId } = params;
  const url = `board/${boardId}`;
  const response = await localAxios.delete(url);
  return response.data;
};

export const enterBoard = async (
  params: EnterBoardParams
): Promise<EnterBoardResponse> => {
  const { boardId } = params;
  const url = `board/${boardId}`;
  const response = await localAxios.get(url);
  return response.data;
};

export const likeBoard = async (
  params: LikeBoardParams
): Promise<LikeBoardResponse> => {
  const { boardId } = params;
  const url = `board/${boardId}/like`;
  const response = await localAxios.post(url);
  return response.data;
};
export const unlikeBoard = async (
  params: UnlikeBoardParams
): Promise<UnlikeBoardResponse> => {
  const { boardId } = params;
  const url = `board/${boardId}/like`;
  const response = await localAxios.delete(url);
  return response.data;
};
