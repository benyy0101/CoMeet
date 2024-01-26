// 게시글 제목, 작성자 닉네임, 제목, 좋아요 수, 모집중 여부,
// 방 Id, 키워드들, 작성 날짜

import React, { useState } from "react";

import tw from "tailwind-styled-components";

export const BoardDetailHeader = () => {
  //모두 받아오는 데이터들
  //작성자 ID
  const writerId = "movingGun";
  //작성자 닉네임
  const nickname = "마스터";
  //제목
  const title = "알고리즘 스터디 ";
  //본문
  const context = "서울 5반 알고리즘 스터디 들어오세여";
  //좋아요 수
  const likecount = 20;
  //게시글 타입 - 모집/자유
  const type = "recruit";
  //모집중 여부
  const valid = true;
  //방 Id
  const roomId = "10";
  //키워드들
  const keywords = "java springBoot";
  //작성 날짜
  const createdAt = "2024-01-26";

  const [isValid, setIsValid] = useState<boolean>(valid);

  return (
    <div>
      <div>{title}</div>
      <div>{isValid ? "모집중" : "모집완료"}</div>
      <div>{nickname}</div>
      <div>{createdAt}</div>
      <div>{likecount}</div>
    </div>
  );
};

const HeaderTotalContainer = tw.div``;
