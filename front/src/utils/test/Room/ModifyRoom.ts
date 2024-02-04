import { modifyRoom } from "api/Room";
import { ModifyRoomParams } from "models/Room.interface";
import { json } from "stream/consumers";

export function func(lst: any): any {
  console.log("test API");
  for (const elem of lst) {
    console.log(elem);
    const results = modifyRoom(elem);
    results.then((d) => {
      console.log(d);
    });
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

//무빙건으로 테스트 시 이건 FAIL이 떠야 정상
const data3: any = {
  roomId: 5,
  title: "12",
  description: "방에 대한 설명22",
  capacity: 13,
  notice: "공지데스",
  isLocked: false, // Null 불가
  password: "asdf1234",
  constraints: "VIDEOON",
  keywordIds: [],
};

const data4: any = {
  roomId: 25,
  title: "12",
  description: "방에 대한 설명22",
  capacity: 13,
  notice: "공지데스",
  roomImage: "ts",
  isLocked: false, // Null 불가
  password: "asdf1234",
  constraints: "VIDEOON",
  keywordIds: [], // 이 친구가 존재만 하면 에러가 뜬다. 포스트맨은 잘 됨. 안 속에 비었어도 에러
};

const data5: ModifyRoomParams = {
  roomId: 25,
  title: "12",
  description: "방에 대한 설명22",
  capacity: 13,
  notice: "공지데스",
  roomImage: "ts",
  isLocked: false, // Null 불가
  password: "asdf1234",
  constraints: "VIDEOON",
};

export let datas: Array<any> = [
  // data1,
  //data2,
  // data3,
  data4,
  // data5,
];
