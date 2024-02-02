import { modifyRoom } from "api/Room";
import { ModifyRoomParams } from "models/Room.interface";

export function func(lst: any): any {
  console.log("test API");
  for (const elem of lst) {
    console.log(elem);
    modifyRoom(elem);
  }
}

const data1: ModifyRoomParams = {
  roomId: 10,
  title: "테스트 수정",
  description: "방에 대한 설명234",
  capacity: 13,
  notice: "공지데스",
  password: "asdf1234",
  constraints: "VIDEOON",
  keywordIds: [2, 3, 4],
};
const data2: ModifyRoomParams = {
  roomId: 1,
  title: "김수정",
  description: "설명 수정",
  capacity: 15,
  notice: "공지",
  password: "",
  constraints: "VIDEOON",
  keywordIds: [2, 3, 4],
};

export let datas: Array<any> = [data1, data2];
