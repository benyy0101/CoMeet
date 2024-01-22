import React from "react";
import { Member } from "./Member";

import RightGo from "../assets/img/right-go.svg";

import tw from "tailwind-styled-components";

//css

//StyleMemberLayout: 멤버 목록 전체 감싸는 애
const StyleMemberLayout = tw.div`
    mx-2

`;

//StyleButtonMemberBoth: 닫는 버튼 & 멤버 목록 타이틀
const StyleButtonMemberBoth = tw.div`
    flex
    justify-between
    items-center
    border-b-2
    p-2
    m-2
`;

//StyleRightButton: 멤버 목록 닫는 버튼
const SytleRightButton = tw.img`
  rounded-full
  w-5
  h-5
`;

//StyleMemberTitle: '멤버 목록` title 부분
const StyleMemberTitle = tw.h1`
    text-center
    font-bold
`;

//StyleMemberList: 프로필사진, 닉네임, 시간이 나타나는 멤버들의 목록
const StyleMemberList = tw.div`
    mx-3

`;

export const RoomMemberList = () => {
  return (
    <StyleMemberLayout>
      <StyleButtonMemberBoth>
        <button>
          <SytleRightButton src={RightGo} alt="" />
        </button>
        <StyleMemberTitle>멤버 목록</StyleMemberTitle>
        <div></div>
      </StyleButtonMemberBoth>
      <StyleMemberList>
        <Member />
        <Member />
        <Member />
      </StyleMemberList>
    </StyleMemberLayout>
  );
};
