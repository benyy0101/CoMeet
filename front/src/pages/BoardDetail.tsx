import React from "react";

import tw from "tailwind-styled-components";
import { BoardDetailWritingTotal } from "../components/BoardDetailWritingTotal";
import { BoardDetailComment } from "../components/BoardDetailComment";

export const BoardDetail = () => {
  return (
    <TotalContainer>
      <WritingContainer>
        <BoardDetailWritingTotal />
      </WritingContainer>
      <CommentContainer>
        <BoardDetailComment />
      </CommentContainer>
    </TotalContainer>
  );
};

const TotalContainer = tw.div`
flex
flex-col
w-full
h-full
items-center
bg-[#070311]
pt-16
pb-20
min-h-svh

`;

const WritingContainer = tw.div`
w-[750px]
mb-5
border-b
`;

const CommentContainer = tw.div`
max-w-[750px]
`;
