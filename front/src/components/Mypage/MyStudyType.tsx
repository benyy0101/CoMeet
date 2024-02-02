import React from "react";

import tw from "tailwind-styled-components";

export const MyStudyType = () => {
  return (
    <TotalContainer>
      <TitleContainer>공부성향</TitleContainer>
      <ImgContainer>이미지 추가 예정</ImgContainer>
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
