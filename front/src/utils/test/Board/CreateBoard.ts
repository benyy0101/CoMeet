// import { createBoard } from "api/Board";
// import { CreateBoardParams } from "models/Board.interface";

// export function func(lst: any): any {
//   console.log("test API");
//   for (const elem of lst) {
//     console.log("Test data is....", elem);
//     const results = createBoard(elem);
//     results
//       .then((d) => {
//         console.log("Result is...", d);
//         // for (const i of d.content) {
//         //   console.log(i);
//         // }
//       })
//       .catch((f) => {
//         console.log("Failed...", f);
//       });
//   }
// }

// const data1: CreateBoardParams = {
//   writerId: "movinggun",
//   title: "free boardtest",
//   context: "this is test content",
//   type: "FREE",
//   category: "CHAT",
// };

// const data2: CreateBoardParams = {
//   writerId: "movinggun",
//   title: "recruit boardtest",
//   context: "this is test content",
//   type: "RECRUIT",
//   roomId: 32,
// };

// //무빙건으로 테스트 시 이건 FAIL이 떠야 정상
// const data3: any = {};

// const data4: any = {};

// export let datas: Array<any> = [
//   data1,
//   data2,
//   // data3,
//   // data4,
//   // data5,
// ];
export {};
