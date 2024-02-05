import { BOARD_CATEGORY, BOARD_TYPE } from "./Enums.type";

export interface CreateBoardParams {
  writerId: String; //필수
  title: string; // 필수
  context: String; //필수
  type: BOARD_TYPE; //필수
  roomId?: number; // 모집이면 필수
  category?: BOARD_CATEGORY; // 자유면 필수
  isValid?: boolean; //선택. 사실 활용할 일 없음
}

export interface CreateBoardResponse {
  boardId: number;
}

export interface SearchBoardParams {}

export interface SearchBoardResponse {}

export interface ModifyBoardParams {}

export interface ModifyBoardResponse {}

export interface DeleteBoardParams {}

export interface DeleteBoardResponse {}
