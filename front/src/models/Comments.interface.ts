import { Pageable } from "./Util";

export interface CreateCommentParams {
  boardId: number;
  content: string;
}

export type CreateCommentResponse = number;

export interface SearchCommentParams {
  boardId: number;
  page: number;
}

export interface SearchCommentContent {
  id: number;
  boardId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writerNickname: string;
}

export interface SearchCommentResponse {
  content: SearchCommentContent[];
  pageable: Pageable;
  last: boolean;
  numberOfElements: number;
}

export interface ModifyCommentParams {
  commentId: number;
  content: string;
}

export interface ModifyCommentResponse {}

export interface DeleteCommentParams {
  commentId: number;
}

export interface DeleteCommentResponse {}
