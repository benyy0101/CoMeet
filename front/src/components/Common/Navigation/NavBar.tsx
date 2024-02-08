import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

import BasicProfile from "assets/img/basic-profile.svg";
import IMac from "assets/img/iMac.svg";
import MicMute from "assets/img/mic-mute.svg";
import VideoWhite from "assets/img/video-white.svg";
import RoomDefault from "assets/img/room-default.svg";

import { ServerDropDownList } from "./ServerDropDownList";
import useOutsideClick from "hooks/useOutsideClick";
import ModalPortal from "utils/Portal";
import Modal from "components/Common/Modal";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const [loginModal, setLoginModal] = React.useState<boolean>(false);
  const [signupModal, setSignupModal] = React.useState<boolean>(false);
  const loginModalHandler = () => {
    setLoginModal(!loginModal);
  };
  const signupModalHandler = () => {
    setSignupModal(!signupModal);
  };

  const userInfo = useSelector((state: any) => state.user);

  const roomInfo = useSelector((state: any) => state.room);

  useEffect(() => {
    if (roomInfo) {
      setIsChannelIn(true);
    }
  }, [roomInfo]);

  const [isChannelIn, setIsChannelIn] = useState<boolean>(false);

  //서버 이모티콘 클릭시
  const [isServerOpen, setIsServerOpen] = useState<boolean>(false);

  //커뮤니티 클릭시
  const [isCommunityOpen, setIsCommunityOpen] = useState<boolean>(false);

  const showServerList = () => {
    setIsServerOpen(!isServerOpen);
  };

  const showCommunityList = () => {
    setIsCommunityOpen(!isCommunityOpen);
  };

  //외부 클릭시 서버 드롭다운 닫힘
  const serverRef = useRef(null);
  useOutsideClick<HTMLDivElement>(serverRef, () => {
    if (isServerOpen) {
      setIsServerOpen(false);
    }
  });

  //외부 클릭시 커뮤니티 드롭다운 닫기
  const communityRef = useRef(null);
  useOutsideClick<HTMLDivElement>(communityRef, () => {
    if (isCommunityOpen) {
      setIsCommunityOpen(false);
    }
  });

  return (
    <NavBarContainer>
      <Logo>
        <Link to="/">[코밋]</Link>
      </Logo>
      {/*로그인 하면 서버, 프로필 메뉴 나오고 로그인 안 하면 회원가입, 로그인 메뉴 나옴*/}
      {userInfo.isLoggedIn ? (
        <>
          <Menu>
            <EachMenu>
              <Link to="/roomlist">방 찾기</Link>
            </EachMenu>
            <EachMenu>
              <ul ref={communityRef}>
                <button onClick={showCommunityList}>커뮤니티</button>

                {isCommunityOpen && (
                  <DropDownCommunity>
                    <ComDropDownBUtton onClick={showCommunityList}>
                      <Link to="/recruit-board">모집 게시판</Link>
                    </ComDropDownBUtton>
                    <ComDropDownBUtton onClick={showCommunityList}>
                      <Link to="/free-board">자유 게시판</Link>
                    </ComDropDownBUtton>
                  </DropDownCommunity>
                )}
              </ul>
            </EachMenu>
          </Menu>
        </>
      ) : null}
      <Menu2>
        {userInfo.isLoggedIn ? (
          <>
            {roomInfo.isRoomIn ? (
              <InServer>
                <ServerImg src={RoomDefault} alt="room" />
                <ServerText>{roomInfo.title}</ServerText>
                {/* 마이크 상태, 비디오 상태에 따라 화면에 표시되는 이미지 다르게 해야 함 */}
                {roomInfo.isMicMuted ? (
                  <MicVideoImg src={MicMute} alt="mic" />
                ) : null}
                {roomInfo.isVideoOn ? (
                  <MicVideoImg src={VideoWhite} alt="video" />
                ) : null}
              </InServer>
            ) : null}

            <Menu2>
              <ul ref={serverRef}>
                <button onClick={showServerList}>
                  <img src={IMac} width={30} alt="server" />
                </button>
                {isServerOpen && <ServerDropDownList />}
              </ul>
            </Menu2>
            <Menu2>
              <Link to="/mypage">
                <img src={BasicProfile} width={30} alt="profile" />
              </Link>
            </Menu2>
          </>
        ) : (
          <>
            <LoginSignup>
              <button onClick={signupModalHandler}>회원가입</button>
              <ModalPortal>
                {signupModal === true ? (
                  <Modal
                    toggleModal={signupModalHandler}
                    option="signup"
                    setting={null}
                  />
                ) : null}
              </ModalPortal>
            </LoginSignup>
            |
            <LoginSignup>
              <button onClick={loginModalHandler}>로그인</button>
              <ModalPortal>
                {loginModal === true ? (
                  <Modal
                    toggleModal={loginModalHandler}
                    option="login"
                    setting={null}
                  />
                ) : null}
              </ModalPortal>
            </LoginSignup>
          </>
        )}
      </Menu2>
    </NavBarContainer>
  );
};

//NavBarContainer: 네비게이션바 전체 틀
const NavBarContainer = tw.div`
    bg-[#282828]
    h-12
    text-white
    flex
    items-center

    `;

//Logo: 로고 메뉴
const Logo = tw.div`
    text-[20px]
    ml-5
    `;

//Menu: 방 찾기, 커뮤니티 메뉴 그룹
const Menu = tw.div`
    flex
    ml-12
    `;

//EachMenu: 방찾기, 커뮤니티 메뉴
const EachMenu = tw.div`
    mr-5
    `;

//커뮤니티 드롭다운
const DropDownCommunity = tw.div`
    flex
    flex-col
    absolute
    bg-[#3B3B3B]
    text-white
    mt-1

    shadow-lg
    z-50
    rounded-md

`;

//커뮤니티 드롭다운 버튼들
const ComDropDownBUtton = tw.button`
rounded-md
w-30
px-4
py-2
cursor-pointer
transition-colors
hover:bg-[#282828]
`;

//Menu2: 서버, 프로필 사진 메뉴
const Menu2 = tw.div`
    ml-auto
    mr-5
    flex
    `;

//LoginSignup: 로그인, 회원가입 메뉴
const LoginSignup = tw.div`
    ml-2
    mr-3
    `;

//InServer: 서버 표시하는 상태바
const InServer = tw.div`
    flex
    mr-4
    p-1
    border-purple-400
    border-2
    rounded-md
    text-[14px]
`;

//ServerImg: 서버 이미지
const ServerImg = tw.img`
    bg-white
    rounded-full
    w-5
    mr-2
    ml-1
`;

//ServerText: 서버 이름
const ServerText = tw.p`
    mr-3
`;

//MicVideoImg: 마이크, 비디오 이미지 크기
const MicVideoImg = tw.img`
    w-5
    ml-1
    mr-1
`;
