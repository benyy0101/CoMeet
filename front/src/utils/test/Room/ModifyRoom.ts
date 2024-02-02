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
  roomId: 4,
  managerId: "movinggun",
  title: "테스트 수정",
  description: "",
  roomImage: "ts",
  capacity: 13,
  notice: "공지데스",
  isLocked: true,
  password: "asdf1234",
  constraints: "VIDEOON",
  keywordIds: [2, 3, 4],
};

//무빙건으로 테스트 시 이건 FAIL이 떠야 정상
const data2: ModifyRoomParams = {
  roomId: 1,
  title: "김수정",
  description: "설명 수정",
  roomImage: "ts",
  capacity: 15,
  notice: "공지",
  isLocked: false,
  password: "",
  constraints: "VIDEOON",
  keywordIds: [2, 3, 4],
};

console.log("asdf", data2);

export let datas: Array<any> = [data1, data2];
