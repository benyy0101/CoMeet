import React from "react";
import MainpageEx from "../assets/img/mainpage-ex.svg";
import { getBoardList, BoardListParams } from "../api/Board";

export const Mainpage = () => {
  const test0: BoardListParams = {
    category: "string",
    keyword: "string",
    offset: 1,
  };
  const test1: BoardListParams = {
    category: "",
    keyword: "",
    offset: 0,
  };

  // 순수 api 테스트용 코드
  const testAPI = () => {
    console.log("test API");

    console.log(test1);
    getBoardList(test1);
  };

  return (
    <div>
      <button onClick={testAPI}>이건 api용 버튼이다</button>
      <img src={MainpageEx} alt="" />
    </div>
  );
};
