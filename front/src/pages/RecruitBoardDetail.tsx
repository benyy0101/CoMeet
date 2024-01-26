import React from "react";

import tw from "tailwind-styled-components";
import { BoardDetailWritingTotal } from "../components/BoardDetailWritingTotal";

export const RecruitBoardDetail = () => {
  return (
    <TotalContainer>
      <WritingContainer>
        <BoardDetailWritingTotal />
      </WritingContainer>
    </TotalContainer>
  );
};

const TotalContainer = tw.div`
flex
w-full
h-full
justify-center

`;

const WritingContainer = tw.div`
w-[750px]
border-2
border-gray-800`;
