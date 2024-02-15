import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import tw from "tailwind-styled-components";

import BasicProfile from "assets/img/basic-profile.svg";
import BasicRoom from "assets/img/basic-room.png";

import { ServerDropDownList } from "./ServerDropDownList";
import useOutsideClick from "hooks/useOutsideClick";
import ModalPortal from "utils/Portal";
import Modal from "components/Common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ComputerDesktopIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { RoomResponse } from "models/Room.interface";
import { handleMember } from "api/Member";
import {
  PowerIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/solid";
import logo from "../../../assets/logo.svg";
import { logout } from "store/reducers/userSlice";
import { handleLogout } from "api/Login";
import defaultProfile from "../../../assets/default_profile.svg";
import { updateUserImg } from "store/reducers/userSlice";

interface IProps {
  roomData: RoomResponse | null;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsVideoDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isVideoDisabled: boolean;
  publisher: any;
}

export const NavBar = ({
  roomData,
  setIsMuted,
  isMuted,
  setIsVideoDisabled,
  isVideoDisabled,
  publisher,
}: IProps) => {
  const navigate = useNavigate();

  //memberId 가져오기
  const [loginModal, setLoginModal] = React.useState<boolean>(false);
  const [signupModal, setSignupModal] = React.useState<boolean>(false);
  const [messageModal, setMessageModal] = React.useState<boolean>(false);
  const [isUserInRoom, setIsUserInRoom] = useState<boolean>(true);
  const [transparent, setTransparent] = useState<boolean>(true);

  useEffect(() => {
    function scrollHandler() {
      setTransparent(window.scrollY < 100);
    }
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const loginModalHandler = () => {
    setLoginModal(!loginModal);
  };
  const signupModalHandler = () => {
    setSignupModal(!signupModal);
  };
  const messageModalHandler = () => {
    setMessageModal(!messageModal);
  };

  const roomInfo = useSelector((state: any) => state.room);
  const userInfo = useSelector((state: any) => state.user);

  //서버 이모티콘 클릭시
  const [isServerOpen, setIsServerOpen] = useState<boolean>(false);

  const showServerList = () => {
    setIsServerOpen(!isServerOpen);
  };

  //외부 클릭시 서버 드롭다운 닫힘
  const serverRef = useRef(null);
  useOutsideClick<HTMLDivElement>(serverRef, () => {
    if (isServerOpen) {
      setIsServerOpen(false);
    }
  });

  //처음에 memeberId로 다 들고와
  const fetchData = async () => {
    const res = await handleMember(userInfo.user.memberId);
    //setUserImg(res.profileImage); // 데이터 상태로 설정
  };

  // useEffect(() => {
  //   setUserImg(userInfo.user.profileImage);
  // }, [userInfo.user.profileImage]);

  //시작할 때 데이터 다 들고와
  // useEffect(() => {
  //   console.log(userImg);
  //   console.error(userInfo);
  //   if (userInfo.isLoggedIn) {
  //     fetchData();
  //     dispatch(updateUserImg({ img: userImg }));
  //   }
  //   console.log(roomData);
  // }, [userInfo.isLoggedIn]);

  // useEffect(() => {
  //   if (roomData) {
  //     const isUserIn =
  //       roomData.members &&
  //       roomData.members.some((member: any) => member.memberId === memberId);
  //     console.log("isUserIn " + isUserIn);
  //     setIsUserInRoom(isUserIn);
  //     console.log(isUserInRoom);
  //     console.log(roomData);
  //     console.log(roomData && isUserInRoom);
  //   }
  // }, [roomData, userInfo.user.meemberId]);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    console.log("handle logout");
    handleLogout().then(() => {
      dispatch(logout());
      console.log("success");
      navigate("/", { replace: true });
    });
  };

  console.log(userInfo.user.profileImage);
  return (
    <NavBarContainer $transparent={transparent}>
      <LeftContainer>
        <Logo>
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} className="w-14" alt="" />
            <h1 className="text-md font-thin mt-1">COMEET</h1>
          </Link>
        </Logo>
        {/*로그인 하면 서버, 프로필 메뉴 나오고 로그인 안 하면 회원가입, 로그인 메뉴 나옴*/}
        {userInfo.isLoggedIn ? (
          <LeftMenu>
            <RoomSearch>
              <Link to="/roomlist">방 찾기</Link>
            </RoomSearch>
            <CommunityMenu>
              <CommunityButton>커뮤니티</CommunityButton>
              <DropDownCommunity>
                <Link to="/recruit-board">
                  <ComDropDownBUtton>모집 게시판</ComDropDownBUtton>
                </Link>
                <Link to="/free-board">
                  <ComDropDownBUtton>자유 게시판</ComDropDownBUtton>
                </Link>
              </DropDownCommunity>
            </CommunityMenu>
          </LeftMenu>
        ) : null}
      </LeftContainer>

      <RightContainer>
        {userInfo.isLoggedIn ? (
          <>
            {/* {roomData && isUserInRoom ? ( */}
            {roomData ? (
              <ServerContainer $active={true}>
                <Link to={`/room/${roomInfo.roomId}`} className="w-full h-full">
                  <ServerTitleContainer>
                    <RoomThumbnail
                      style={{
                        backgroundImage: `url(${roomData?.room_image ? roomData.room_image : BasicRoom})`,
                      }}
                    />
                    <ServerText>{roomData.title}</ServerText>
                  </ServerTitleContainer>
                </Link>
                {/* 마이크 상태, 비디오 상태에 따라 화면에 표시되는 이미지 다르게 해야 함 */}
                {publisher && (
                  <ControlPanelContainer>
                    <ControlPanelButton onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? (
                        <SpeakerXMarkIcon className="w-6 h-6 text-red-400" />
                      ) : (
                        <SpeakerWaveIcon className="w-6 h-6" />
                      )}
                    </ControlPanelButton>
                    <ControlPanelButton onClick={() => setIsVideoDisabled(!isVideoDisabled)}>
                      {isVideoDisabled ? (
                        <VideoCameraSlashIcon className="w-6 h-6 text-red-400" />
                      ) : (
                        <VideoCameraIcon className="w-6 h-6" />
                      )}
                    </ControlPanelButton>
                  </ControlPanelContainer>
                )}
              </ServerContainer>
            ) : (
              <ServerContainer $active={false}>접속중인 방이 없습니다.</ServerContainer>
            )}

            <ServerMenu ref={serverRef}>
              <CustomButton onClick={showServerList}>
                <ComputerDesktopIcon className="w-8 h-8" />
              </CustomButton>
              {isServerOpen && <ServerDropDownList setIsServerOpen={setIsServerOpen} />}
            </ServerMenu>
            <EnvelopMenu onClick={messageModalHandler}>
              <EnvelopeIcon className="w-8 h-8" />
              {userInfo.user.unreadNoteCount !== 0 ? (
                <UnreadCount>{userInfo.user.unreadNoteCount}</UnreadCount>
              ) : null}
              <ModalPortal>
                {messageModal === true ? (
                  <Modal toggleModal={messageModalHandler} option="message" />
                ) : null}
              </ModalPortal>
            </EnvelopMenu>
            <ProfileMenu>
              <Link to={`/userpage/${userInfo.user.memberId}`}>
                <NavIcon src={userInfo.user.profileImage || defaultProfile} alt={BasicProfile} />
              </Link>
            </ProfileMenu>
            <button onClick={logoutHandler}>
              <PowerIcon className="w-8 h-8 text-red-700 text-bold hover:text-red-800 transition-colors" />
            </button>
          </>
        ) : (
          <LoginContainer>
            <LoginSignup>
              <CustomButton onClick={signupModalHandler}>회원가입</CustomButton>
              <ModalPortal>
                {signupModal === true ? (
                  <Modal toggleModal={signupModalHandler} option="signup" setting={null} />
                ) : null}
              </ModalPortal>
            </LoginSignup>
            <LoginSignup>
              <CustomButton onClick={loginModalHandler}>로그인</CustomButton>
              {loginModal === true ? (
                <ModalPortal>
                  <Modal toggleModal={loginModalHandler} option="login" setting={null} />
                </ModalPortal>
              ) : null}
            </LoginSignup>
          </LoginContainer>
        )}
      </RightContainer>
    </NavBarContainer>
  );
};

//NavBarContainer: 네비게이션바 전체 틀
const NavBarContainer = tw.div<{ $transparent: boolean }>`
${(p) => (p.$transparent ? "bg-transparent" : "bg-[#1f1227]")}
h-16
text-white
flex
items-center
justify-between
px-5
text-lg
transition-colors
ease-in-out
`;

const LeftContainer = tw.div`
flex
justify-start
items-center
space-x-8
h-full
`;

const RightContainer = tw.div`
flex
justify-start
items-center
space-x-6
`;

const RoomSearch = tw.div`
hover:text-purple-400
transition-colors
`;
//Logo: 로고 메뉴
const Logo = tw.div`
w-48  
flex
items-center
justify-center
space-x-2
`;

//Menu: 방 찾기, 커뮤니티 메뉴 그룹
const LeftMenu = tw.div`
flex
space-x-7
h-full
items-center
`;
const CommunityMenu = tw.div`
h-full
flex
items-center
hover:text-purple-400
transition-colors
group
`;

const CommunityButton = tw.button`
cursor-default
focus:outline-none
`;

const ServerMenu = tw.div`
relative
flex
items-center
justify-center
`;
const NavIcon = tw.img`
h-10
w-10
rounded-full
bg-white
border-purple-400
border-2
`;

//커뮤니티 드롭다운
const DropDownCommunity = tw.div`
flex-col
absolute
top-11
bg-[#3B3B3B]
text-white
mt-1
shadow-lg
z-50
rounded-md
overflow-hidden
hidden
group-hover:flex
`;

const ProfileMenu = tw.div`

`;

const EnvelopMenu = tw.div`
relative
cursor-pointer
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
w-30
px-4
py-2
cursor-pointer
transition-colors
hover:bg-[#282828]
focus:outline-none
`;

const LoginContainer = tw.div`
flex
space-x-4
`;
const LoginButton = tw.button`
p-1
rounded-sm
bg-transparent
border-[1px]
border-zinc-300
text-zinc-300
px-2
`;
const SignUpButton = tw.button`
p-1
px-2
rounded-sm
bg-violet-500
hover:bg-violet-600
transition-colors
`;

//LoginSignup: 로그인, 회원가입 메뉴
const LoginSignup = tw.div`
ml-2
mr-3
`;

//InServer: 서버 표시하는 상태바
const ServerContainer = tw.div<{ $active: boolean }>`
h-9
flex
items-center
justify-center
p-1
${(p) => (p.$active ? "border-purple-400" : "border-gray-400")}
border
rounded-md
text-sm
w-60
text-gray-400
`;

const ServerTitleContainer = tw.div`
w-full
h-full
px-2
flex
space-x-4
items-center
`;

const RoomThumbnail = tw.div`
w-6
h-6
min-h-6
min-w-6
rounded-full
bg-contain
bg-no-repeat
bg-center
shadow-md
bg-slate-200
`;

//ServerText: 서버 이름
const ServerText = tw.h1`
mr-3
w-full
overflow-clip
overflow-ellipsis
break-words
line-clamp-1
text-slate-200
`;

const ControlPanelContainer = tw.div`
flex
items-center
`;

const ControlPanelButton = tw.div`
w-10
text-slate-100
cursor-pointer
flex
justify-center
items-center
relative
`;

const CustomButton = tw.button`
focus:outline-none
`;
