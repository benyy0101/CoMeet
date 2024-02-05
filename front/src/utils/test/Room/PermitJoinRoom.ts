import { permitJoinRoom } from "api/Room";
import { PermitJoinRoomParams } from "models/Room.interface";

export function func(lst: any): any {
  console.log("test API");
  for (const elem of lst) {
    console.log("Test data is....", elem);
    const results = permitJoinRoom(elem);
    results
      .then((d) => {
        console.log("Result is...", d);
        // for (const i of d.content) {
        //   console.log(i);
        // }
      })
      .catch((d) => {
        console.log("failed...", d.response.data);
      });
  }
}

//무빙건으로 테스트 시 이건 FAIL이 떠야 정상
const data1: PermitJoinRoomParams = {
  roomId: 32,
  memberId: "movinggun",
};

const data2: PermitJoinRoomParams = {
  roomId: 32,
  memberId: "damongsanga",
};

//무빙건으로 테스트 시 이건 FAIL이 떠야 정상
const data3: any = {
  roomId: 32,
  memberId: "testmember",
};

const data4: any = {};

export let datas: Array<any> = [
  data1,
  data2,
  data3,
  // data4,
  // data5,
];
