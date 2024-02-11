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
import { UserState } from "models/Login.interface";
import { RoomStore } from "store/reducers/roomSlice";
import { Room } from "pages/Room";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export const NavBar = () => {
  //memberId 가져오기
  const memberId = useSelector((state: any) => state.user.user.memberId);

  const [loginModal, setLoginModal] = React.useState<boolean>(false);
  const [signupModal, setSignupModal] = React.useState<boolean>(false);
  const [messageModal, setMessageModal] = React.useState<boolean>(false);

  const loginModalHandler = () => {
    setLoginModal(!loginModal);
  };
  const signupModalHandler = () => {
    setSignupModal(!signupModal);
  };
  const messageModalHandler = () => {
    setMessageModal(!messageModal);
  };

  const userInfo = useSelector((state: any) => state.user);
  //   const userInfo:UserState = {
  //     isLoggedIn: true,
  //     user: {
  //       memberId: "mockup_id",
  //       nickname: "mockup",
  //       profileImage: "default_image_letsgo",
  //       unreadNoteCount: 12,
  //       joinedRooms: [{
  //         roomId:21,
  //         title:"mockup_room",
  //         roomImage:"default_image_letsgo",
  //       },
  //       {
  //         roomId:25,
  //         title:"mockup_room2",
  //         roomImage:"default_image_letsgo",
  //       },
  //       {
  //         roomId:38,
  //         title:"mockup_room3",
  //         roomImage:"default_image_letsgo",
  //       }
  //       ],
  //   }
  // }

  const roomInfo = useSelector((state: any) => state.room);

  // const roomInfo:RoomStore = {
  //   isRoomIn: false,
  // isMicMuted: false,
  // isVideoOn: false,
  // room: {
  //   managerId: "",
  //   managerNickname: "",
  //   title: "",
  //   description: "",
  //   room_image: "",
  //   notice: "",
  //   mcount: 0,
  //   link: "",
  //   capacity: 0,
  //   isLocked: false,
  //   password: "",
  //   constraints: "FREE",
  //   type: "DISPOSABLE",
  //   members: [],
  //   lounges: [],
  //   channels: [],
  //   keywords: [],
  // },
  // };

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
      <LeftContainer>
        <Logo>
          <Link to="/">[코밋]</Link>
        </Logo>
        {/*로그인 하면 서버, 프로필 메뉴 나오고 로그인 안 하면 회원가입, 로그인 메뉴 나옴*/}
        {userInfo.isLoggedIn ? (
          <LeftMenu>
            <RoomSearch>
              <Link to="/roomlist">방 찾기</Link>
            </RoomSearch>
            <CommunityMenu
              onMouseEnter={showCommunityList}
              onMouseLeave={showCommunityList}
            >
              <ul ref={communityRef}>
                <button onMouseEnter={showCommunityList}>커뮤니티</button>
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
            </CommunityMenu>
          </LeftMenu>
        ) : null}
      </LeftContainer>

      <RightContainer>
        {userInfo.isLoggedIn ? (
          <>
            {roomInfo.isRoomIn ? (
              <InServer>
                <ServerImg src={RoomDefault} alt="room" />
                <ServerText>{roomInfo.room.title}</ServerText>
                {/* 마이크 상태, 비디오 상태에 따라 화면에 표시되는 이미지 다르게 해야 함 */}
                {roomInfo.isMicMuted ? (
                  <MicVideoImg src={MicMute} alt="mic" />
                ) : null}
                {roomInfo.isVideoOn ? (
                  <MicVideoImg src={VideoWhite} alt="video" />
                ) : null}
              </InServer>
            ) : (
              <div>
                <OutofServer>접속중인 방이 없습니다.</OutofServer>
              </div>
            )}

            <ServerMenu ref={serverRef}>
              <button onClick={showServerList}>
                <NavIcon src={IMac} alt="server" />
              </button>
              {isServerOpen && <ServerDropDownList />}
            </ServerMenu>
            <EnvelopMenu onClick={messageModalHandler}>
              <EnvelopeIcon className="w-8 h-8" />
              {userInfo.user.unreadNoteCount !== 0 ? (
                <UnreadCount>{userInfo.user.unreadNoteCount}</UnreadCount>
              ) : null}
              <ModalPortal>
                {messageModal === true ? (
                  <Modal
                    toggleModal={messageModalHandler}
                    option="message"
                  ></Modal>
                ) : null}
              </ModalPortal>
            </EnvelopMenu>
            <ProfileMenu>
              <Link to="/mypage">
                <NavIcon src={BasicProfile} alt="profile" />
              </Link>
            </ProfileMenu>
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
      </RightContainer>
    </NavBarContainer>
  );
};

//NavBarContainer: 네비게이션바 전체 틀
const NavBarContainer = tw.div`
    bg-[#282828]
    h-14
    text-white
    flex
    items-center
    justify-between
    px-24
    text-lg
`;

const LeftContainer = tw.div`
  flex
  justify-start
  items-end
  space-x-8
`;

const RightContainer = tw.div`
  flex
  justify-start
  items-end
  space-x-6
`;

const RoomSearch = tw.div`
  hover:text-purple-400
  transition-colors
`;
//Logo: 로고 메뉴
const Logo = tw.div`
`;

//Menu: 방 찾기, 커뮤니티 메뉴 그룹
const LeftMenu = tw.div`
    flex
    space-x-7
`;
const CommunityMenu = tw.div`
  hover:text-purple-400
  transition-colors
`;

const ServerMenu = tw.div`
  relative
  flex
  items-center
  justify-center
`;
const NavIcon = tw.img`
h-8
w-8
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

const ProfileMenu = tw.div`
`;

const EnvelopMenu = tw.div`
  relative
`;

const UnreadCount = tw.div`
absolute
top-4
left-5
rounded-full
bg-red-500
text-sm
h-6
w-6
flex
items-center
justify-center
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

//LoginSignup: 로그인, 회원가입 메뉴
const LoginSignup = tw.div`
    ml-2
    mr-3
    `;

//InServer: 서버 표시하는 상태바
const InServer = tw.div`
    h-9
    flex
    items-center
    justify-center
    p-1
    border-purple-400
    border-[1px]
    rounded-md
    text-[14px]
`;

const OutofServer = tw.div`
min-w-40
h-8
flex
items-center
justify-center
p-2
border-gray-400
text-gray-400
border-[1px]
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
