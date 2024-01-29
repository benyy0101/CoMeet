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
          <div className="flex">
            여기 헤더임
            <div>키워드 검색</div>
            <div>검색바</div>
          </div>
          <div className="flex flex-col">
            여기 리스트임
            <RecruitBoardListLink />
          </div>
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

//
const CoreTotalContainer = tw.div`
flex-grow
max-w-[800px]
mb-5
border
`;

// 임시
// 글 보기 버튼
const WriteButton = tw.button`
hover:bg-gray-200
`;
