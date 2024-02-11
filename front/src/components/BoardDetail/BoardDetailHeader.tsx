// 게시글 제목, 작성자 닉네임, 제목, 좋아요 수, 모집중 여부,
// 방 Id, 키워드들, 작성 날짜

import React, { useEffect, useState } from "react";

import tw from "tailwind-styled-components";

import StarFill from "assets/img/star-fill.svg";
import StarEmpty from "assets/img/star-empty.svg";
import { FREE_BOARD_CATEGORY } from "models/Enums.type";

export const BoardDetailHeader: React.FC<{
  nickname: string;
  title: string;
  likecount: number;
  valid: boolean;
  createdAt: string;
  category: FREE_BOARD_CATEGORY;
  isLiked: boolean;
}> = (props) => {
  let categoryTitle: string = "";

  switch (props.category) {
    case "CHAT":
      categoryTitle = "잡담";
      break;
    case "TIP":
      categoryTitle = "팁/정보";
      break;
    case "QUESTION":
      categoryTitle = "질문하기";
      break;
    case "PROMOTION":
      categoryTitle = "구인구직";
      break;
  }

  return (
    <HeaderTotalContainer>
      <TitleTotalContainer>
        <Title>{props.title}</Title>
        {/* 널 인식되나 */}
        {props.category === null ? (
          <>
            {props.valid ? (
              <RecruitTrue>모집중</RecruitTrue>
            ) : (
              <RecruitFalse>모집완료</RecruitFalse>
            )}
          </>
        ) : (
          <FreeCategory>{categoryTitle}</FreeCategory>
        )}
      </TitleTotalContainer>
      <EtcContainer>
        <NicnameContainer>{props.nickname}</NicnameContainer>
        <DateContainer>{props.createdAt}</DateContainer>
        <LikeContatiner>
          <LikeImg src={StarFill} alt="" />
          {/* {props.isLiked ? (
          ) : (
            <LikeImg src={StarEmpty} alt="" />
          )} */}
          {/* useState로 likecount 관리 */}
          {props.likecount}
        </LikeContatiner>
      </EtcContainer>
    </HeaderTotalContainer>
  );
};

//헤더 전체
const HeaderTotalContainer = tw.div`
flex
flex-col
h-[100px]
mb-4

`;

//제목 부분 컨테이너 (모집중 / 모집 완료 포함)
const TitleTotalContainer = tw.div`
items-end
flex-grow
flex
pb-3
px-5
border-b
`;

//제목
const Title = tw.div`
text-2xl
font-bold
`;

//모집중
const RecruitTrue = tw.div`
ml-5
text-blue-500
`;

//모집 완료
const RecruitFalse = tw.div`
ml-5
text-red-500
`;

const FreeCategory = tw.div`
ml-5
`;

//닉네임, 날짜, 좋아요수 나타내는 컨테이너
const EtcContainer = tw.div`
flex
items-end
ml-5
mt-2
`;

//이름
const NicnameContainer = tw.div`

`;

//날짜
const DateContainer = tw.div`
ml-10

`;

const LikeImg = tw.img`
w-[17px]
h-[17px]
mr-1
`;

//좋아요 수
const LikeContatiner = tw.div`
ml-7
flex
items-center
`;
