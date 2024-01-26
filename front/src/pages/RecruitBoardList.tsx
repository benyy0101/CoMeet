import React from "react";
import { Link } from "react-router-dom";

import tw from "tailwind-styled-components";

export const RecruitBoardList = () => {
  return (
    <TotalContainer>
      모집게시판:
      <Link to="/recruit-board/1">
        <WriteButton> 글 보기</WriteButton>
      </Link>
    </TotalContainer>
  );
};

const TotalContainer = tw.div`
flex
w-full
h-full
`;

// 임시
// 글 보기 버튼
const WriteButton = tw.button`
hover:bg-gray-200
`;
