import { modifyBoard } from "api/Board";
import { ModifyBoardParams } from "models/Board.interface";

export function func(lst: any): any {
  console.log("test API");
  for (const elem of lst) {
    console.log("Test data is....", elem);
    const results = modifyBoard(elem);
    results
      .then((d) => {
        console.log("Result is...", d);
        // for (const i of d.content) {
        //   console.log(i);
        // }
      })
      .catch((f) => {
        console.log("Failed...", f);
      });
  }
}

const data1: ModifyBoardParams = {
  boardId: 6,
  title: "modify",
  content: "modoifyt",
  category: "PROMOTION",
  // valid: true,
};

const data2: ModifyBoardParams = {
  boardId: 7,
  title: "recruit modify",
  content: "modoifyt",
};

//무빙건으로 테스트 시 이건 FAIL이 떠야 정상
const data3: any = {};

const data4: any = {};

export let datas: Array<any> = [
  data1,
  data2,
  // data3,
  // data4,
  // data5,
];
