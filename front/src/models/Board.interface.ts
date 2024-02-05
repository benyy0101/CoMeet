import { BOARD_CATEGORY, BOARD_IS_RECRUITING, BOARD_SORTBY, BOARD_TYPE } from "./Enums.type";

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

export interface SearchBoardParams {
  boardType: BOARD_TYPE; //필수
  searchKeyword?: string; //선택
  writerNickname?: string; //선택
  sortBy: BOARD_SORTBY; //필수.
  recruitBoardCategory?: BOARD_IS_RECRUITING; // 선택. 모집에서만 사용
  keywordIds?: number[]; //선택
  capacity?: number; //선택
  freeBoardCategory?: BOARD_CATEGORY; //선택. 자유에서만 사용
}

export interface SearchBoardContent {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  type: string;
  category: BOARD_CATEGORY;
  isValid: true;
  roomKeywords: number[];
  roomImage: string;
  writerNickname: string;
  writerImage: string;
  createdAt: string;
  updatedAt: string;
}
export interface SearchBoardResponse {
  content: SearchBoardContent[];
  pageable: Object;
}

export interface ModifyBoardParams {
  boardId: number;
  title: string;
  content: string;
  category?: BOARD_CATEGORY;
  valid?: boolean;
}

export interface ModifyBoardResponse {}

export interface DeleteBoardParams {}

export interface DeleteBoardResponse {}
