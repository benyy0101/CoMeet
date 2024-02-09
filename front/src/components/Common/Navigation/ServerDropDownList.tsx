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
  console.log(roomInfo);

  // const roomInfo = [{
  //       roomId:21,
  //       title:"mockup_room",
  //       roomImage:"default_image_letsgo",
  //     },
  //     {
  //       roomId:25,
  //       title:"mockup_room2",
  //       roomImage:"default_image_letsgo",
  //     },
  //     {
  //       roomId:38,
  //       title:"mockup_room3",
  //       roomImage:"default_image_letsgo",
  //     }
  //     ];
  //const roomInfo:any = [];

  return (
    <StyleDropdownMenu>
      <ServerContent>
        {roomInfo.length !== 0 ? (
          <>
            {roomInfo.map((room: any) => (
              <StyleImgTextBoth key={room.id}>
                <StyleServerImg src={RoomDefault} alt="" />
                <Link to={`/room/${room.roomId}`}>{room.title}</Link>
              </StyleImgTextBoth>
            ))}
            <AddIconWrapper>
              <Link to="/room-regist">
                <PlusIcon className="w-4 h-4" />
              </Link>
            </AddIconWrapper>
          </>
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
      </ServerContent>
    </StyleDropdownMenu>
  );
};

//StyleDropdownMenu: 서버의 드롭다운 메뉴 스타일
// 너비(w)와 오른쪽(right)의 절대적인 숫자를 바꿔야 함
const StyleDropdownMenu = tw.div`
  flex
  flex-col
  items-center
  justify-center
  p-2
  shadow-2xl
  absolute
  bg-gray-700
  text-white
  text-sm
  top-10
  min-w-[280px]
  rounded-lg
  space-y-4
`;

//StyleServerTitle: '가입한 내 방' 과 같은 타이틀
const StyleServerTitle = tw.h1`
    font-bold
    text-lg
`;

//StyleImgTextBoth: '서버 이미지, 서버 이름'
const StyleImgTextBoth = tw.div`
    flex
    p-2
    hover:bg-black 
    hover:rounded-md
    hover:bg-opacity-10 
    transition-all
`;

const ServerContent = tw.div`
  w-full
`;
//StyleServerImg: 서버 이미지
const StyleServerImg = tw.img`
    bg-white
    rounded-full
    w-7
    mr-2
    ml-1
`;

const AddIconWrapper = tw.div`
flex
justify-end
w-full
items-center
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
