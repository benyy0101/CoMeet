import React, { useRef } from "react";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import { BoardListProps } from "types";

import StarFill from "assets/img/star-fill.svg";
import BasicRoom from "assets/img/basic-room.png";
import BasicProfile from "assets/img/basic-profile.svg";
import { SearchBoardContent } from "models/Board.interface";
import { Keyword } from "models/Util";

//export const RecruitBoardListLink = (props: BoardListProps) => {
export const RecruitBoardListLink = (props: SearchBoardContent) => {
  //const keywordArr: string[] = props.roomKeywords.split("-");
  // let keywordArr: string[] = [];
  // for (let index = 0; index < array.length; index++) {
  //   const element = array[index];
  // }

  const keywordArr: Keyword[] = props.roomKeywords;
  // props.roomKeywords.map((key) => {
  //   console.log(key);
  //   props.roomKeywords.
  //   return key.name;
  // });
  const boardId = props.id;

  return (
    <Link to={`/recruit-board/${boardId}`}>
      <TotalContainer>
        <LeftContainer>
          <RoomImg src={props.roomImage ? props.roomImage : BasicRoom} alt="roomImg" />
        </LeftContainer>
        <CenterContainer>
          <TitleAndValidContainer>
            <RecruitValid>
              {props.isValid ? <ValidTrue>모집중</ValidTrue> : <ValidFalse>모집완료</ValidFalse>}
            </RecruitValid>
            <BoardTitle>{props.title}</BoardTitle>
          </TitleAndValidContainer>
          <RoomKeywordContainer>
            {keywordArr?.map((keyword) => (
              <RoomKeyword key={keyword.id}>{keyword.name}</RoomKeyword>
            ))}
          </RoomKeywordContainer>
        </CenterContainer>
        <RightContainer>
          <WriterContainer>
            <WriterImg src={props.writerImage ? props.writerImage : BasicProfile} alt="wrtierImg" />
            <WriterNicname>{props.writerNickname}</WriterNicname>
          </WriterContainer>
          <WriteDate>{props.createdAt}</WriteDate>
          <LikeContatiner>
            <LikeImg src={StarFill} alt="" />
            {/* {props.isLiked ? (
        ) : (
          <LikeImg src={StarEmpty} alt="" />
        )} */}
            {/* useState로 likecount 관리 */}
            {props.likeCount}
          </LikeContatiner>
        </RightContainer>
      </TotalContainer>
    </Link>
  );
};

//전체
const TotalContainer = tw.div`
flex
border-b
border-gray-600
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
rounded-lg
bg-white
`;

//제목, 모집중, 키워드 적혀 있는 가운데 컨테이너
const CenterContainer = tw.div`
flex
flex-col
mr-5
flex-grow
items-start
justify-around
`;

//글 제목 & 모집 유효 컨테이너
const TitleAndValidContainer = tw.div`
flex
items-center
mt-3
`;

// 글 제목
const BoardTitle = tw.div`
text-[16px]
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
p-2
rounded-md
`;

//모집 완료
const ValidFalse = tw.div`
bg-[#262626]

p-2
rounded-md
text-gray-200
`;

// 방 키워드 컨테이너
const RoomKeywordContainer = tw.div`
flex
w-full
gap-3
flex-wrap
mb-3
`;

//방 키워드
const RoomKeyword = tw.div`
text-base
font-medium
px-2
rounded-lg
bg-gray-600
text-slate-200
`;

//작성자 닉네임, 작성자 이미지, 작성 날짜, 좋아요수 있는 오른쪽 컨테이너
const RightContainer = tw.div`
flex
flex-col
items-end
mr-5
justify-center
w-[150px]


`;

// 작성자 프로필 컨테이너
const WriterContainer = tw.div`
flex
items-center
`;

// 작성자 프로필 이미지
const WriterImg = tw.img`
w-6
h-6
rounded-full
mr-1
bg-white
`;

// 작성자 닉네임
const WriterNicname = tw.div`
text-[14px]
`;

// 작성 날짜
const WriteDate = tw.div`
py-1
`;

//좋아요 컨테이너
const LikeContatiner = tw.div`
ml-7
flex
items-center
`;

const LikeImg = tw.img`
w-[17px]
h-[17px]
mr-1
`;
