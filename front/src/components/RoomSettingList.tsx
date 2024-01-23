import React from "react";

import RightGo from "../assets/img/right-go.svg";

import tw from "tailwind-styled-components";
import { Setting } from "./Setting";

//css

//StyleSettingLayout: 환경 설정 전체 감싸는 애
const StyleSettingLayout = tw.div`
    mx-2

`;

//StyleButtonSettingBoth: 닫는 버튼 & 환경 설정 타이틀
const StyleButtonSettingBoth = tw.div`
    flex
    justify-between
    items-center
    border-b-2
    p-2
    m-2
`;

//StyleRightButton: 환경 설정 닫는 버튼
const SytleRightButton = tw.img`
  rounded-full
  w-5
  h-5
`;

//StyleSettingTitle: '환경 설정' title 부분
const StyleSettingTitle = tw.h1`
    text-center
    font-bold
`;

//StyleSettingList: 프로필사진, 닉네임, 시간이 나타나는 멤버들의 목록
const StyleSettingList = tw.div`
    mx-3

`;

export const RoomSettingList = () => {
  return (
    <StyleSettingLayout>
      <StyleButtonSettingBoth>
        <button>
          <SytleRightButton src={RightGo} alt="" />
        </button>
        <StyleSettingTitle>환경 설정</StyleSettingTitle>
        <div></div>
      </StyleButtonSettingBoth>
      <StyleSettingList>
        <Setting />
      </StyleSettingList>
    </StyleSettingLayout>
  );
};
