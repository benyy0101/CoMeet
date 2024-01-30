import React from "react";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import { BoardListProps } from "../types";

export const RecruitBoardListLink = (props: BoardListProps) => {
  return (
    <Link to="/recruit-board/1">
      <TotalContainer>
        <LeftContainer>
          <RoomImg src={props.roomImage} alt="roomImg" />
        </LeftContainer>
        <CenterContainer>
          <TitleAndValidContainer>
            <RecruitValid>
              {props.isValid ? (
                <ValidTrue>모집중</ValidTrue>
              ) : (
                <ValidFalse>모집완료</ValidFalse>
              )}
            </RecruitValid>
            <BoardTitle>{props.title}</BoardTitle>
          </TitleAndValidContainer>
          <RoomKeywordContainer>{props.roomKeywords}</RoomKeywordContainer>
        </CenterContainer>
        <RightContainer>
          <WriterContainer>
            <WriterImg src={props.writerImage} alt="wrtierImg" />
            <WriterNicname>{props.writerNicname}</WriterNicname>
          </WriterContainer>
          <WriteDate>{props.createdAt}</WriteDate>
          <LikeContainer>{props.likeCount}</LikeContainer>
        </RightContainer>
      </TotalContainer>
    </Link>
  );
};

//전체
const TotalContainer = tw.div`
flex
border-b
`;

//이미지 들어있는 왼쪽 컨테이너
const LeftContainer = tw.div`
mr-5
ml-1
p-2
`;

//방 이미지
const RoomImg = tw.img`
w-[120px]
h-[90px]
object-cover
`;

//제목, 모집중, 키워드 적혀 있는 가운데 컨테이너
const CenterContainer = tw.div`
flex
flex-col
mr-5
flex-grow
items-start

`;

//글 제목 & 모집 유효 컨테이너
const TitleAndValidContainer = tw.div`
flex
items-center
mt-3
`;

// 글 제목
const BoardTitle = tw.div`
text-lg
font-bold
`;

// 모집 유효
const RecruitValid = tw.div`
mr-5
text-xs
font-semibold
w-20
`;

//모집 중
const ValidTrue = tw.div`
bg-gradient-to-l
from-[#539AB1]
to-[#7C5EBD]
p-1
rounded-md
`;

//모집 완료
const ValidFalse = tw.div`
bg-[#262626]

p-1
rounded-md
text-gray-200
`;

// 방 키워드 컨테이너
const RoomKeywordContainer = tw.div``;

//작성자 닉네임, 작성자 이미지, 작성 날짜, 좋아요수 있는 오른쪽 컨테이너
const RightContainer = tw.div`
flex
flex-col
items-end
justify-center
border
w-[150px]


`;

// 작성자 프로필 컨테이너
const WriterContainer = tw.div`
flex
justify-
`;

// 작성자 프로필 이미지
const WriterImg = tw.img`
w-7
h-7
`;

// 작성자 닉네임
const WriterNicname = tw.div``;

// 작성 날짜
const WriteDate = tw.div``;

// 좋아요 컨테이너
const LikeContainer = tw.div``;
