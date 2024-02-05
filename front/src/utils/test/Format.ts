export function func(lst: any): any {
  console.log("test API");
  for (const elem of lst) {
    console.log(elem);
    //test function
    const results = console.log(elem);
    console.log(results);
  }
}

const data1: any = {};
const data2: any = {};
const data3: any = {};
export let datas: Array<any> = [
  data1,
  // data2,
  data3,
];
