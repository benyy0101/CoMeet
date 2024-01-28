import React from "react";

import tw from "tailwind-styled-components";

import PoepleNumImg from "../assets/img/people-num.svg";

export const BoardDetailRoomInfo = () => {
  //방 ID로 방 조회해서 가져올 것들
  //방 제목
  const roomTitle = "서울 5반 알고리즘";
  //방 설명
  const roomDescription = "B형을 위한 알고리즘 스터디방입니다";

  const roomPeopleNum = "30 / 45";

  //방 링크
  const roomLink = "http://localhost:3000/room/3";

  return (
    <RoomHyper href={roomLink} target="_blank" rel="noopener noreferrer">
      <TotalContainer>
        <TitleAndNumContainer>
          <RoomTitle>{roomTitle}</RoomTitle>
          <RoomPeople>
            <PeopleImg src={PoepleNumImg} alt="" />
            <RoomPeopleNum>{roomPeopleNum}</RoomPeopleNum>
          </RoomPeople>
        </TitleAndNumContainer>
        <RoomEx>{roomDescription}</RoomEx>

        <RoomHyperLink>{roomLink}</RoomHyperLink>
      </TotalContainer>
    </RoomHyper>
  );
};

const RoomHyper = tw.a`
`;

const TotalContainer = tw.div`
flex
flex-col
mx-10
mt-10
p-7
break-words
bg-[#1F1C29]

`;

const TitleAndNumContainer = tw.div`
flex
w-full
mb-3
`;

const RoomTitle = tw.div`
flex
flex-grow
text-xl
font-bold
`;

//인원수 아이콘 + 인원수
const RoomPeople = tw.div`
flex
items-center
`;

//인원수 아이콘 이미지
const PeopleImg = tw.img`
w-6
h-6
mr-1
`;

const RoomPeopleNum = tw.div`
items-end
`;

const RoomEx = tw.div`
text-gray-400
mb-3
`;

const RoomHyperLink = tw.div`
transition-colors
hover:text-blue-500
hover:border-blue-500
`;
