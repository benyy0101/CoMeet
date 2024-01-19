import React, { useState } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import BasicProfile from "../assets/img/basic-profile.svg";
import IMac from "../assets/img/iMac.svg";
import MicMute from "../assets/img/mic-mute.svg";
import VideoWhite from "../assets/img/video-white.svg";
import RoomDefault from "../assets/img/room-default.svg";

import { ServerDropDownList } from "./ServerDropDownList";

//StyleNavBar: 네비게이션바 전체 틀
const StyleNavBar = tw.div`
    bg-[#282828]
    h-12
    border-black-200
    border
    text-white
    flex
    items-center
    
    `;

//StyleLogo: 로고 메뉴
const StyleLogo = tw.div`
    text-[20px]
    ml-5
    `;

//StyleMenu: 방 찾기, 커뮤니티 메뉴 그룹
const StyleMenu = tw.div`
    flex
    ml-12
    `;

//StyleEachMenu: 방찾기, 커뮤니티 메뉴
const StyleEachMenu = tw.div`
    mr-5
    `;

//StyleMenu2: 서버, 프로필 사진 메뉴
const StyleMenu2 = tw.div`
    ml-auto
    mr-5
    flex
    `;

//StyleLoginSignup: 로그인, 회원가입 메뉴
const StyleLoginSignup = tw.div`
    ml-2
    mr-3
    `;

//StyleInServer: 서버 표시하는 상태바
const StyleInServer = tw.div`
    flex
    mr-4
    p-1
    border-purple-400
    border-2
    rounded-md
    text-[14px]
`;

//StyleServerImg: 서버 이미지
const StyleServerImg = tw.img`
    bg-white
    rounded-full
    w-5
    mr-2
    ml-1
`;

//StyleServerText: 서버 이름
const StyleServerText = tw.p`
    mr-3
`;

//StyleMicVideoImg: 마이크, 비디오 이미지 크기
const StyleMicVideoImg = tw.img`
    w-5
    ml-1
    mr-1
`;

export const NavBar = () => {
  //임시
  const isLogin = true;

  //임시
  const isChannelIn = true;

  const [isServerOpen, setIsServerOpen] = useState(false);

  const showServerList = () => {
    setIsServerOpen(!isServerOpen);
  };

  return (
    <StyleNavBar>
      <StyleLogo>
        <Link to="/">[코밋]</Link>
      </StyleLogo>
      {/*로그인 하면 서버, 프로필 메뉴 나오고 로그인 안 하면 회원가입, 로그인 메뉴 나옴*/}
      {isLogin ? (
        <>
          <StyleMenu>
            <StyleEachMenu>
              <Link to="/roomlist">방 찾기</Link>
            </StyleEachMenu>
            <StyleEachMenu>
              <Link to="/community">커뮤니티</Link>
            </StyleEachMenu>
          </StyleMenu>
        </>
      ) : null}
      <StyleMenu2>
        {isLogin ? (
          <>
            {isChannelIn ? (
              <StyleInServer>
                <StyleServerImg src={RoomDefault} alt="room" />
                <StyleServerText>싸피 10기</StyleServerText>
                {/* 마이크 상태, 비디오 상태에 따라 화면에 표시되는 이미지 다르게 해야 함 */}
                <StyleMicVideoImg src={VideoWhite} alt="video" />
                <StyleMicVideoImg src={MicMute} alt="mic" />
              </StyleInServer>
            ) : null}

            <StyleMenu2>
              <ul>
                <button onClick={showServerList}>
                  <img src={IMac} width={30} alt="server" />
                </button>
                {isServerOpen && <ServerDropDownList />}
              </ul>
            </StyleMenu2>
            <StyleMenu2>
              <Link to="/Mypage">
                <img src={BasicProfile} width={30} alt="profile" />
              </Link>
            </StyleMenu2>
          </>
        ) : (
          <>
            <StyleLoginSignup>
              <Link to="/signup">회원가입</Link>
            </StyleLoginSignup>
            |
            <StyleLoginSignup>
              <Link to="/login">로그인</Link>
            </StyleLoginSignup>
          </>
        )}
      </StyleMenu2>
    </StyleNavBar>
  );
};
