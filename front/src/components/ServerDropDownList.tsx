import React, { useRef } from "react";
import { Link } from "react-router-dom";

import tw from "tailwind-styled-components";

import RoomDefault from "../assets/img/room-default.svg";
import RightAroow from "../assets/img/right-arrow.svg";

//StyleDropdownMenu: 서버의 드롭다운 메뉴 스타일
// 너비(w)와 오른쪽(right)의 절대적인 숫자를 바꿔야 함
const StyleDropdownMenu = tw.div`
    absolute
    bg-[#3B3B3B]
    text-white
    mt-1
    py-2
    shadow-lg
    z-50
    right-20
    rounded-md
    px-2
`;

//StyleServerTitle: '가입한 내 방' 과 같은 타이틀
const StyleServerTitle = tw.h1`
    text-center
    font-bold
    mb-2
    mt-1
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
    justify-end
    my-1
    text-[13px]
`;

const StyleArrowImg = tw.img`
    w-5
    ml-1
`;

export const ServerDropDownList = () => {
  //임시 룸 아이디
  const roomId = 1;

  return (
    <StyleDropdownMenu>
      <StyleServerTitle>가입한 내 방</StyleServerTitle>
      <StyleImgTextBoth>
        <StyleServerImg src={RoomDefault} alt="" />
        <li>
          <Link to={`/room/${roomId}`}>서버1 이름</Link>
        </li>
      </StyleImgTextBoth>
      <StyleImgTextBoth>
        <StyleServerImg src={RoomDefault} alt="" />
        <li>
          <Link to={`/room/${roomId}`}>서버2 이름</Link>
        </li>
      </StyleImgTextBoth>
      <StyleServerGo>
        <button className="flex">
          <p>지속 방 가입하러 가기</p>
          <StyleArrowImg src={RightAroow} alt="" />
        </button>
      </StyleServerGo>
      <hr />
      <div>
        <StyleServerTitle>가입 대기중인 방</StyleServerTitle>
        <p>대충 대기 중인 방 서버 이름</p>
      </div>
      <hr />
      <StyleServerGo>
        <button className="flex">
          <p>지속 방 생성하러 가기</p>
          <StyleArrowImg src={RightAroow} alt="" />
        </button>
      </StyleServerGo>
    </StyleDropdownMenu>
  );
};
