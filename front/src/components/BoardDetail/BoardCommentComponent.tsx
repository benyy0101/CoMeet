import React from "react";

import tw from "tailwind-styled-components";

export const BoardCommentComponent = () => {
  const nicName = "닉네임입니다";
  const date = "2024-01-29";
  const context =
    "리액트 나와! 스프링 나와! 노드 들어가! 리액트 나와! 스프링 나와! 노드 들어가! 리액트 나와! 스프링 나와! 노드 들어가! 리액트 나와! 스프링 나와! 노드 들어가! 리액트 나와! 스프링 나와! 노드 들어가! 리액트 나와! 스프링 나와! 노드 들어가! ";

  return (
    <TotalContainer>
      <Comment>
        <NicAndDate>
          <Nicname>{nicName}</Nicname>
          <Date>{date}</Date>
        </NicAndDate>
        <Context>{context}</Context>
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
