import React, { useRef } from "react";
import { Link } from "react-router-dom";

import tw from "tailwind-styled-components";

import RoomDefault from "assets/img/room-default.svg";
import RightAroow from "assets/img/right-arrow.svg";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

export const ServerDropDownList = () => {
  //임시 룸 아이디
  const roomId = 1;

  const roomInfo = useSelector((state: any) => state.user.user.joinedRooms);
  return (
    <StyleDropdownMenu>
      <StyleServerTitle>가입한 내 방</StyleServerTitle>
      {roomInfo.length !== 0 ? (
        roomInfo.map((room: any) => (
          <>
            <StyleImgTextBoth key={room.id}>
              <StyleServerImg src={RoomDefault} alt="" />
              <li>
                <Link to={`/room/${room.id}`}>{room.title}</Link>
              </li>
            </StyleImgTextBoth>
            <StyleServerGo>
              <Link to="/room-regist">
                <PlusIcon />
              </Link>
            </StyleServerGo>
          </>
        ))
      ) : (
        <>
          <NoneText>가입한 방이 없습니다.</NoneText>
          <StyleServerGo>
            <Link to="/room-regist">
              <PlusIcon className="w-14 h-14 m-6 text-white text-opacity-40" />
            </Link>
          </StyleServerGo>
        </>
      )}
    </StyleDropdownMenu>
  );
};

//StyleDropdownMenu: 서버의 드롭다운 메뉴 스타일
// 너비(w)와 오른쪽(right)의 절대적인 숫자를 바꿔야 함
const StyleDropdownMenu = tw.div`
    absolute
    bg-[#3B3B3B]
    text-white
    down-1
    p-4
    z-50
    right-20
    rounded-md
    flex
    flex-col
    justify-center
    items-center
    space-y-2
`;

//StyleServerTitle: '가입한 내 방' 과 같은 타이틀
const StyleServerTitle = tw.h1`
    text-center
    font-bold
`;

//StyleImgTextBoth: '서버 이미지, 서버 이름'
const StyleImgTextBoth = tw.div`
    flex
    mb-2
`;

//StyleServerImg: 서버 이미지
const StyleServerImg = tw.img`
    bg-white
    rounded-full
    w-7
    mr-2
    ml-1
`;

//StyleServerGo: 방 가입이나 방 생성하러 가는...
const StyleServerGo = tw.div`
    flex
    w-full
    justify-center
    hover:bg-black 
    hover:rounded-lg
    hover:bg-opacity-10 
    transition-all
`;

const NoneText = tw.p`
text-opacity-50
font-light
text-sm
`;
