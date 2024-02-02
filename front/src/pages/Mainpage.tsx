import React from "react";
import MainpageEx from "../assets/img/mainpage-ex.svg";
import { getBoardList, BoardListParams } from "../api/Board";
import { datas, func } from "utils/test/Room/ModifyRoom";

export const Mainpage = () => {
  // 순수 api 테스트용 코드
  const testAPI = () => {
    func(datas);
  };

  return (
    <div>
      <button onClick={testAPI}>이건 api용 버튼이다</button>
      <img src={MainpageEx} alt="" />
    </div>
  );
};
