import { ROOM_CONSTRAINTS, ROOM_TYPE } from "models/Enums.type";

export interface CreateRoomParams {
  title: string;
  description: string;
  capacity: number;
  constraints: ROOM_CONSTRAINTS;
  type: ROOM_TYPE;
}

export interface ModifyRoomParams {
  roomId: number;
  title: string;
  description: string;
  capacity: number;
  notice: string;
  password: string;
  constraints: ROOM_CONSTRAINTS;
  keywordIds: number[];
}
