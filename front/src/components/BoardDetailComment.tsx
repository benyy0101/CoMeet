import React from "react";
import tw from "tailwind-styled-components";
import { BoardCommentComponent } from "./BoardCommentComponent";

export const BoardDetailComment = () => {
  return (
    <CommentTotalContainer>
      <WriteCommentContainer>
        <CommentTitle>댓글</CommentTitle>
        <form>
          <CommentInputContainer>
            <CommentInput
              id="comment"
              rows={4}
              placeholder="댓글을 작성해주세요"
              required
            />
          </CommentInputContainer>
          <ButtonContainer>
            <SubmitButton type="submit">등록</SubmitButton>
          </ButtonContainer>
        </form>
      </WriteCommentContainer>
      <BoardCommentComponent />
    </CommentTotalContainer>
  );
};

const CommentTotalContainer = tw.div`
  text-white
  `;

const WriteCommentContainer = tw.div`
  mx-7
  border
`;

//'댓글'
const CommentTitle = tw.div`
mb-2
text-base
font-bold
`;

//댓글 인풋 컨테이너
const CommentInputContainer = tw.div`
  mx-4
  mb-4
  border
  border-gray-200
  rounded-lg
  bg-gray-50
  dark:bg-gray-700
  dark:border-gray-600
`;

//댓글 인풋
const CommentInput = tw.textarea`
  w-full
  px-0
  text-sm
  text-gray-900
  bg-white
  border-0
  dark:bg-gray-800
  focus:ring-0
  dark:text-white
  dark:placeholder-gray-400
`;

// 댓글 등록 버튼 컨테이터
const ButtonContainer = tw.div`
flex
justify-end
mr-5
`;

// 댓글 등록버튼
const SubmitButton = tw.button`
  inline-flex
  items-center
  py-2.5
  px-4
  text-xs
  font-medium
  text-center
  text-white
  bg-blue-700
  rounded-lg
  bg-gradient-to-r
from-purple-500
to-pink-500
hover:bg-gradient-to-l
focus:ring-4
focus:outline-none
focus:ring-purple-200
dark:focus:ring-purple-800
`;
