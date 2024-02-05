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

//무빙건으로 테스트 시 이건 FAIL이 떠야 정상
const data2: SearchKeywordParams = {};

//무빙건으로 테스트 시 이건 FAIL이 떠야 정상
const data3: any = {};

const data4: any = {};

const data5: SearchKeywordParams = {};

export let datas: Array<any> = [
  // data1,
  //data2,
  // data3,
  data4,
  // data5,
];
