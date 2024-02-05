import { createRoom } from "api/Room";
import { CreateRoomParams } from "models/Room.interface";

export function func(lst: any): any {
  console.log("test API");
  for (const elem of lst) {
    console.log(elem);
    const results = createRoom(elem);
    results.then((d) => {
      console.log(d);
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
  title: "이것도 방제목",
  description: "방방봐",
  capacity: 15,
  constraints: "VIDEOON",
  type: "PERMANENT",
};

export let datas: Array<any> = [
  //data1,
  data2,
];
