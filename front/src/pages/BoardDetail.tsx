import React from "react";
import { useParams } from "react-router-dom";

import tw from "tailwind-styled-components";
import { BoardDetailWritingTotal } from "components/BoardDetail/BoardDetailWritingTotal";
import { BoardDetailComment } from "components/BoardDetail/BoardDetailComment";

export const BoardDetail = () => {
  const { boardId } = useParams();
  return (
    <TotalContainer>
      <WritingContainer>
        <BoardDetailWritingTotal boardId={parseInt(boardId!)} />
      </WritingContainer>
      <CommentContainer>
        <BoardDetailComment boardId={parseInt(boardId!)} />
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
