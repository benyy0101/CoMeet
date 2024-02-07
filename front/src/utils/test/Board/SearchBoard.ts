import { searchBoard } from "api/Board";
import { SearchBoardParams } from "models/Board.interface";

export async function func(lst: any) {
  console.log("test API");
  let i = 1;
  for (const elem of lst) {
    console.log("Test data", i++, " is....", elem);
    const results = await searchBoard(elem);
    console.log("Result is...", results);
    // results
    //   .then((d) => {
    //     console.log("Result is...", d);
    //     // for (const i of d.content) {
    //     //   console.log(i);
    //     // }
    //   })
    //   .catch((f) => {
    //     console.log("Failed...", f);
    //   });
  }
}

// const data1: SearchBoardParams = {
//   boardType: "FREE",
//   // searchKeyword: "test",
//   // writerNickname: "다몽상가",
//   sortBy: "LATEST",
//   // recruitBoardCategory: "OFF",
//   // keywordIds: [4],
//   // capacity: 10,
//   freeBoardCategory: "CHAT",
// };

// const data2: SearchBoardParams = {
//   boardType: "RECRUIT",
//   // searchKeyword: "test",
//   // writerNickname: "다몽상가",
//   sortBy: "LATEST",
//   recruitBoardCategory: "ON",
//   // keywordIds: [4],
//   // capacity: 10,
//   // freeBoardCategory: "CHAT",
// };

// //왜인지 FAIL 뜬다 정렬방식으로 추정
// const data3: SearchBoardParams = {
//   boardType: "RECRUIT",
//   // searchKeyword: "test",
//   // writerNickname: "damongsanga",
//   sortBy: "RECRUIT",
//   recruitBoardCategory: "ON",
//   // keywordIds: [4],
//   // capacity: 10,
//   freeBoardCategory: "CHAT",
// };

// const data4: SearchBoardParams = {
//   boardType: "RECRUIT",
//   // searchKeyword: "test",
//   // writerNickname: "damongsanga",
//   sortBy: "LATEST",
//   // recruitBoardCategory: "ON",
//   keywordIds: [3, 2],
//   // capacity: 10,
//   // freeBoardCategory: "CHAT",
// };

// const data5: SearchBoardParams = {
//   boardType: "RECRUIT",
//   // searchKeyword: "test",
//   // writerNickname: "damongsanga",
//   sortBy: "LATEST",
//   // recruitBoardCategory: "ON",
//   keywordIds: [3],
//   capacity: 10,
//   // freeBoardCategory: "CHAT",
// };

// const data6: SearchBoardParams = {
//   // boardType: "RECRUIT",
//   // searchKeyword: "test",
//   writerNickname: "빙건이테스트용",
//   sortBy: "LATEST",
//   // recruitBoardCategory: "ON",
//   // keywordIds: [3],
//   // capacity: 10,
//   // freeBoardCategory: "CHAT",
//   size: 10,
//   page: 0,
// };

export let datas: Array<any> = [
  // data1,
  // data2,
  // data3,
  // data4,
  // data5,
  // data6,
];
