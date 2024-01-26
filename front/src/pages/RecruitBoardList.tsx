import React from "react";

import tw from "tailwind-styled-components";

export const RecruitBoardList = () => {
  return (
    <TotalContainer>
      모집게시판
      <button>글 등록</button>
    </TotalContainer>
  );
};

const TotalContainer = tw.div`
flex
w-full
h-full
`;
