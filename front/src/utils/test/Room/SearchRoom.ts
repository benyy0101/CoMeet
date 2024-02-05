import { searchRoom } from "api/Room";
import { SearchRoomParams } from "models/Room.interface";

export function func(lst: any): any {
  console.log("test API");
  for (const elem of lst) {
    console.log(elem);
    const results = searchRoom(elem);
    results.then((d) => {
      console.log(d);
      // for (const i of d.content) {
      //   console.log(i);
      // }
    });
  }
}

const data1: SearchRoomParams = {
  searchKeyword: "방에",
  // managerNickname: "빙건이테스트용",
  // isLocked: false,
  keywordIds: [2, 3],
  // constraints: "VIDEOONMICOFF",
  // sortBy: "LATEST",
  page: 1,
  size: 20,
};

const data2: SearchRoomParams = {
  // searchKeyword: "방에",
  managerNickname: "빙건이테스트용",
  // isLocked: false,
  // keywordIds: [2, 3],
  // constraints: "VIDEOONMICOFF",
  // sortBy: "LATEST",
  // page: 1,
  // size: 20,
};

//무빙건으로 테스트 시 이건 FAIL이 떠야 정상
const data3: any = {};

const data4: any = {};

const data5: SearchRoomParams = {};

export let datas: Array<any> = [
  // data1,
  data2,
  // data3,
  // data4,
  // data5,
];
