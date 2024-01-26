import React from "react";
import { BoardDetailHeader } from "./BoardDetailHeader";
import { BoardDetailRoomInfo } from "./BoardDetailRoomInfo";

export const BoardDetailWritingTotal = () => {
  //임시
  //본문
  const context = "서울 5반 알고리즘 스터디 들어오세여";

  return (
    <div>
      <BoardDetailHeader />
      <BoardDetailRoomInfo />
      <div>{context}</div>
    </div>
  );
};
