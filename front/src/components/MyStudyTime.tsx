import React from "react";

import tw from "tailwind-styled-components";

export const MyStudyTime = () => {
  //예시 - 시간을 어떻게 받아오는지 아직 잘 모르겠음!
  const studyTime = 20;

  return (
    <TotalContainer>
      <TitleContainer>공부 시간대</TitleContainer>
      <ImgContainer>이미지 추가 예정</ImgContainer>
      <TimeContainer>
        {studyTime < 12 ? "오전" : "오후"}&nbsp;
        {studyTime <= 12 ? studyTime : studyTime - 12}시
      </TimeContainer>
    </TotalContainer>
  );
};

//전체 컨테이너
const TotalContainer = tw.div`
w-full
h-full
flex
flex-col
items-center
`;

//타이틀 컨테이너
const TitleContainer = tw.div`
text-white
text-xl
font-bold
mt-3
`;

//이미지 컨테이너
const ImgContainer = tw.div`
text-white
flex-grow
flex
items-center
justify-center

`;

//시간대 표시 컨테이너
const TimeContainer = tw.div`
text-white
text-2xl
font-semibold
mb-4
`;
