import React from "react";
import { useParams } from "react-router-dom";

import tw from "tailwind-styled-components";
import { BoardDetailWritingTotal } from "components/BoardDetail/BoardDetailWritingTotal";
import { BoardDetailComment } from "components/BoardDetail/BoardDetailComment";
import { Background } from "components/Common/Backgruond";

export const BoardDetail = () => {
  const { boardId } = useParams();
  return (
    <TotalContainer>
      <Background />
      <WritingContainer>
        <BoardDetailWritingTotal boardId={parseInt(boardId!)} />
      </WritingContainer>
      <Boarder />
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

pt-16
pb-20
space-y-5
min-h-svh
`;

const WritingContainer = tw.div`
w-1/2
`;

const Boarder = tw.div`
h-[1px]
bg-white
w-1/2
`;

const CommentContainer = tw.div`
w-1/2
`;
