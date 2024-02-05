import { createRoom } from "api/Room";
import { CreateRoomParams } from "models/Room.interface";

export function func(lst: any): any {
  console.log("test API");
  for (const elem of lst) {
    console.log(elem);
    const results = createRoom(elem);
    results.then((d) => {
      console.log("Result is...", d);
      // for (const i of d.content) {
      //   console.log(i);
      // }
    });
  }
}

const data1: CreateRoomParams = {
  title: "방 제목",
  description: "방에 대한 설명",
  capacity: 10,
  constraints: "VIDEOONMICOFF",
  type: "DISPOSABLE",
};
const data2: CreateRoomParams = {
  title: "영구방",
  description: "영구없다",
  capacity: 15,
  constraints: "VIDEOON",
  type: "PERMANENT",
};

export let datas: Array<any> = [
  //data1,
  data2,
];
