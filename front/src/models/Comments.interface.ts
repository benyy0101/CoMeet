export interface CreateCommentParams {
  boardId: number;
  content: string;
}

export interface CreateCommentResponse {
  commentId: number;
}

export interface SearchCommentParams {
  boardId: number;
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
  pageable: Object;
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
