import { searchKeyword } from "api/Keyword";
import { SearchKeywordParams } from "models/Keyword.interface";

export function func(lst: any): any {
  console.log("test API");
  for (const elem of lst) {
    console.log(elem);
    const results = searchKeyword(elem);
    results.then((d) => {
      console.log(d);
    });
  }
}

const data1: SearchKeywordParams = {};

export let datas: Array<any> = [
  data1,
  //data2,
  // data3,
  // data4,
  // data5,
];
