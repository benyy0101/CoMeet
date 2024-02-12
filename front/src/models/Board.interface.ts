import {
  FREE_BOARD_CATEGORY,
  BOARD_SORTBY,
  BOARD_TYPE,
  RECRUIT_BOARD_CATEGORY,
} from "./Enums.type";
import { Keyword, Pageable } from "./Util";

export interface CreateBoardParams {
  //writerId?: String; //필수
  title: string; // 필수
  context: String; //필수
  type: BOARD_TYPE; //필수
  roomId?: number; // 모집이면 필수
  category?: FREE_BOARD_CATEGORY; // 자유면 필수
  isValid?: boolean; //선택. 사실 활용할 일 없음
}

export interface CreateBoardResponse {
  boardId: number;
}

export interface SearchBoardParams {
  boardType?: BOARD_TYPE; //필수
  searchKeyword?: string; //선택
  writerNickname?: string; //선택
  sortBy: BOARD_SORTBY; //필수.
  recruitBoardCategory?: RECRUIT_BOARD_CATEGORY; // 선택. 모집에서만 사용
  keywordIds?: number[]; //선택
  capacity?: number; //선택
  freeBoardCategory?: FREE_BOARD_CATEGORY; //선택. 자유에서만 사용
  page: number;
  size: number;
}

export interface SearchBoardContent {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  type: BOARD_TYPE;
  category: FREE_BOARD_CATEGORY | null;
  isValid: true;
  roomKeywords: Keyword[];
  roomImage: string;
  writerNickname: string;
  writerImage: string;
  createdAt: string;
  updatedAt: string;
}
export default interface SearchBoardResponse {
  content: SearchBoardContent[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
}

export interface ModifyBoardParams {
  boardId: number;
  title: string;
  content: string;
  category?: FREE_BOARD_CATEGORY;
  isValid?: boolean;
}

export interface ModifyBoardResponse {}

export interface DeleteBoardParams {
  boardId: number; //필수
}

export interface DeleteBoardResponse {}

export interface EnterBoardParams {
  boardId: number; //필수
}

/**
 * 모집글 일때만 방 관련 정보가 오고 아닐 때는 null
 * category 역시 자유글일때만 마찬가지
 */
export interface EnterBoardResponse {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  type: BOARD_TYPE;
  category: FREE_BOARD_CATEGORY | null;
  isValid: boolean; // 모집완료인지
  roomKeywords: Keyword[];
  roomTitle: string;
  roomDescription: string;
  roomMcount: number;
  roomCapacity: number;
  roomImage: string;
  isLocked: boolean;
  writerNickname: string;
  writerImage: string;
  isLike: boolean;
  createdAt: string;
  updatedAt: string;
  roomLink?: string;
}

export interface LikeBoardParams {
  boardId: number; //필수
}

export interface LikeBoardResponse {}

export interface UnlikeBoardParams {
  boardId: number; //필수
}

export interface UnlikeBoardResponse {}

export interface TextEditProps {
  isFree: boolean;
  isEdit: boolean;
}
