import { modifyTil } from "api/Til";
import { ModifyTilParams } from "models/Til.interface";

export function func(lst: any): any {
  console.log("test API");
  for (const elem of lst) {
    console.log("Test data is....", elem);
    const results = modifyTil(elem);
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

const data1: ModifyTilParams = {
  context: "modify test 1",
  tilId: 4,
};
const data2: ModifyTilParams = {
  context: "modify test 1",
  tilId: 5,
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
