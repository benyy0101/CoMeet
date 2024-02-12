import { deleteComment } from "api/Comment";
import { SearchCommentContent } from "models/Comments.interface";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import tw from "tailwind-styled-components";

type CommentProps = {
  comment: SearchCommentContent;
  handleDelete: (id: number) => void;
};

export const BoardCommentComponent = (props: CommentProps) => {
  const { writerNickname, updatedAt, content, id } = props.comment;
  const memberNickname = useSelector((state: any) => state.user.user.nickname);

  const handleModify = () => {};
  // const handleDeleteSub = () => {
  // };

  return (
    <TotalContainer>
      <Comment>
        <NicAndDate>
          <Nicname>{writerNickname}</Nicname>
          <Date>{updatedAt}</Date>
        </NicAndDate>
        <Context>{content}</Context>
        {memberNickname === writerNickname ? (
          <NicAndDate>
            <button onClick={handleModify}>수정 -----</button>
            <button onClick={() => props.handleDelete(id)}>삭제</button>
          </NicAndDate>
        ) : null}
      </Comment>
    </TotalContainer>
  );
};

//댓글 전체 컨테이너 - border-t를 위해
const TotalContainer = tw.div`
border-t
border-gray-600
`;

// 진짜 댓글 컨테이너
const Comment = tw.div`
flex
flex-col
py-3
mx-5
my-5
`;

//닉네임&날짜
const NicAndDate = tw.div`
flex
mb-3
`;

//닉네임
const Nicname = tw.div`
mr-3
text-gray-200
`;

//날짜
const Date = tw.div`
text-gray-400
`;

//댓글 내용
const Context = tw.div``;
