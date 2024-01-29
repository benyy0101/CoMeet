import React, { useState, useEffect } from "react";

import tw from "tailwind-styled-components";
import { RecruitBoardListLink } from "../components/RecruitBoardListLink";

export const RecruitBoardList = () => {
  return (
    <TotalContainer>
      <LeftContainer>
        <div>사이드바임</div>
        <div>최신순</div>
        <div>좋아요순</div>
        <div>모집률순</div>
      </LeftContainer>
      <CenterTotalContainer>
        <CoreTotalContainer>
          <div>모집게시판 타이틀</div>
          <BoardListHeader className="flex">
            여기 헤더임
            <div>키워드 검색</div>
            <div>검색바</div>
          </BoardListHeader>
          <div className="flex flex-col">
            여기 리스트임
            {/* ReadButton은 임시! */}
            <ReadButton>
              <RecruitBoardListLink />
            </ReadButton>
            <ReadButton>
              <RecruitBoardListLink />
            </ReadButton>
          </div>
          <div className="flex justify-center">페이지네이션</div>
        </CoreTotalContainer>
      </CenterTotalContainer>
      {/* 아래는 그냥 여백 때문에 */}
      <LeftContainer></LeftContainer>
    </TotalContainer>
  );
};

const TotalContainer = tw.div`
flex
w-full
h-full
bg-[#070311]
pt-16
pb-20
min-h-svh
text-white
border
`;

//정렬 사이드바
const LeftContainer = tw.div`
min-w-[100px]
max-w-[250px]
border
`;

//가운데 컨테이너 - 사이드바로 빠지는 정렬 외 모든 애들
const CenterTotalContainer = tw.div`
flex-grow
flex
justify-center
border
`;

//진짜 모집게시판 리스트
const CoreTotalContainer = tw.div`
flex-grow
max-w-[800px]
mb-5
border
`;

//모집게시판 헤더 - 검색바, 키워드
const BoardListHeader = tw.div``;

// 임시
// 글 보기 버튼
const ReadButton = tw.button`
hover:bg-gray-200
`;
