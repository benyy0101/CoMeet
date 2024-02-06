import {
  CreateCommentParams,
  CreateCommentResponse,
  DeleteCommentParams,
  ModifyCommentParams,
  ModifyCommentResponse,
  SearchCommentParams,
  SearchCommentResponse,
} from "models/Comments.interface";
import { localAxios } from "./http-commons";
import { DeleteChannelResponse } from "models/Channel.interface";

export const createComment = async (
  params: CreateCommentParams
): Promise<CreateCommentResponse> => {
  const url = `comment`;
  const response = await localAxios.post(url, params);
  return response.data;
};

export const searchComment = async (
  params: SearchCommentParams
): Promise<SearchCommentResponse> => {
  const { boardId } = params;
  const url = `comment/${boardId}`;
  const response = await localAxios.get(url);
  return response.data;
};

export const modifyComment = async (
  params: ModifyCommentParams
): Promise<ModifyCommentResponse> => {
  const { commentId } = params;
  const url = `comment/${commentId}`;
  const response = await localAxios.patch(url, params);
  return response.data;
};

export const deleteComment = async (
  params: DeleteCommentParams
): Promise<DeleteChannelResponse> => {
  const { commentId } = params;
  const url = `comment/${commentId}`;
  const response = await localAxios.delete(url);
  return response.data;
};
