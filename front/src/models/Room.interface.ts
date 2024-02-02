import { ROOM_CONSTRAINTS, ROOM_TYPE } from "models/Enums.type";

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
  keywordIds: number[]; //선택
}
