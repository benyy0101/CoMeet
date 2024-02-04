import { ROOM_CONSTRAINTS, ROOM_TYPE, ROOM_SORTBY } from "models/Enums.type";

export interface CreateRoomParams {
  title: string; //필수
  description: string; //선택
  capacity: number; // 1~20
  constraints: ROOM_CONSTRAINTS; //필수
  type: ROOM_TYPE; //필수
}

export interface ModifyRoomParams {
  roomId: number; //필수
  managerId?: string | undefined; //매니저 변경 시에만 삽입
  title: string; //필수
  description: string; //선택
  roomImage: string; //필수
  capacity: number; // 1~20
  notice: string; //1000자 제한
  isLocked: Boolean; //필수
  password: string; //isLocked가 True일 때 4~8
  constraints: ROOM_CONSTRAINTS; //필수
  keywordIds?: number[]; //선택
}
/**
 * searchKeyword?: string; //선택
 * managerNickname?: string; //선택
 * isLocked?: Boolean; //선택
 * keywordIds?: number[]; //선택
 * constraints?: ROOM_CONSTRAINTS; //선택
 * sortBy?: ROOM_SORTBY; //선택
 * page?: number; //선택 맞나..? 인덱스 0부터 시작
 * size?: number; //선택
 */
export interface SearchRoomParams {
  searchKeyword?: string; //선택
  managerNickname?: string; //선택
  isLocked?: Boolean; //선택
  keywordIds?: number[]; //선택
  constraints?: ROOM_CONSTRAINTS; //선택
  sortBy?: ROOM_SORTBY; //선택
  page?: number; //선택 맞나..? 인덱스 0부터 시작
  size?: number; //선택
}

export interface DeleteRoomParams {
  roomId: number; //필수
}

export interface PermitJoinRoomParams {
  roomId: number; //필수
  memberId: string; //필수
}

export interface WithdrawRoomParams {
  roomId: number; //필수
}
/**
 * roomId: number; //필수
 * password: string | null; //필수. 없으면 null이라도 넣어야함
 */
export interface EnterRoomParams {
  roomId: number; //필수
  password: string | null; //필수. 없으면 null이라도 넣어야함
}

export interface LeaveRoomParams {
  roomId: number; //필수
  keywords?: string; //선택. 키워드명을 공백으로 구분한 문자열로
}
