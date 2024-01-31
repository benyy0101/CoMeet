import React from "react";
import tw from "tailwind-styled-components";

export const KeywordSearchBox = () => {
  return (
    <TotalContainer>
      <div>키워드 검색</div>
      <div>드롭박스에서 클릭하면 위로 올라오는 곳</div>
      <div>검색창</div>
      <div>이 밑에 드롭박스</div>
    </TotalContainer>
  );
};

const TotalContainer = tw.div`
border
w-3/4
mx-auto
`;
