import { useState, useEffect } from "react";
import { RoomLounge } from "../components/RoomLounge";
import RoomSubNavBar from "../components/RoomSubNavBar";
import RoomChannel from "../components/RoomChannel";
import { RoomMemberList } from "../components/RoomMemberList";

import { Routes, Route, useParams } from "react-router-dom";

import tw from "tailwind-styled-components";
import { TailwindComponent } from "tailwind-styled-components/dist/tailwind";

import Members from "../assets/img/members.svg";
import Settings from "../assets/img/settings.svg";
import { RoomSettingList } from "../components/RoomSettingList";

type styledType = TailwindComponent<React.HTMLAttributes<HTMLDivElement>, {}>;

//css 스타일 컴포넌트 - 높이, 넓이 나중에 다시 다 고쳐야할 듯
//StyleRoomOutline: 룸의 가장 바깥라인 - 높이 다시 고쳐야함!!
//일단 텍스트 다 하얀색으로...
const StyleRoomOutline: styledType = tw.div`
    flex
    justify-center
    h-[92vh]
    mt-1
    text-white
`;

//StyleRoomLayout: 룸의 레이아웃
const StyleRoomLayout: styledType = tw.div`
    w-[98%]
    bg-[#3B3B3B]
    rounded-xl`;

//StyleRoomHead: 룸의 헤더 (방 이름, 공지버튼, 멤버보기버튼, 환경설정버튼)
const StyleRoomHead: styledType = tw.div`
    flex justify-between
    mt-3
    mx-5
    `;

//StyleRoomBoth: 네비바 & RTC 부분의 레이아웃
const StyleRoomBoth: styledType = tw.div`
    flex
    h-[95%]
    content-center
    justify-center
    `;

//StyleRoomNavBar: 룸의 네비바
const StyleRoomNavBar: styledType = tw.div`
    w-[10%]
    border
    `;

//StyleRoomRTCLayout: 룸의 RTC 레이아웃
const StyleRoomRTCLayout: styledType = tw.div`
    w-[95%]
    h-[95%]
    flex
    items-center
    justify-center
    
`;

//StyleRoomRTC: 룸의 RTC 부분(라운지와 채널이 보이는 부분)
const StyleRoomRTC: styledType = tw.div`
    w-[95%]
    h-[95%]
    flex
    items-center
    justify-center
    bg-[#282828]
    rounded-md
    
    `;

// const StyleRoomRTCCore: styledType = tw.div`
//     h-full
//     bg-black
//     flex-2
// `;

const StyleMember: styledType = tw.div`
    rounded-r-md
    overflow-auto
    h-full
    bg-[#333333]
    border-r-2
    border-y-2
    border-solid
    border-[#282828]
    text-white
    w-3/12`;

//Room 컴포넌트
export const Room = () => {
  //isChannelIn: 채널에 들어가 있는지 확인
  const [isChannelIn, setIsChannelIn] = useState(false);

  //loungeId: 라운지의 ID (일단 임시로 0번으로 지정)
  const [loungeId, setLoungeId] = useState(0);

  const handleChangeValue = () => {
    setIsChannelIn(true);
  };

  const handleChangeLoungeId = (lId: number) => {
    setLoungeId(lId);
  };

  //isFold: 접기를 클릭했나?
  const [isFold, setIsFold] = useState(false);

  const handleFold = function () {
    setIsFold(!isFold);
  };

  //isMemeber: 멤버 버튼 클릭했나?
  const [isMember, setIsMember] = useState(false);

  //환경설정 버튼 클릭한 상태로 클릭시 환경설정 닫고 member 열리는 형식
  const handleMember = function () {
    if (isMember === false && isSetting === true) {
      setIsMember(!isMember);
      setIsSetting(!isSetting);
    } else {
      setIsMember(!isMember);
    }
  };

  //isSetting: 환경 설정 버튼을 클릭했나?
  const [isSetting, setIsSetting] = useState(false);

  const handleSetting = function () {
    if (isSetting === false && isMember === true) {
      setIsSetting(!isSetting);
      setIsMember(!isMember);
    } else {
      setIsSetting(!isSetting);
    }
  };

  const StyleRoomRTCCore =
    isMember || isSetting
      ? tw.div`h-full bg-black w-9/12 overflow-auto rounded-l-md`
      : tw.div`h-full bg-black w-full overflow-auto rounded-md`;

  return (
    <div>
      <StyleRoomOutline>
        <StyleRoomLayout>
          <StyleRoomHead>
            <div>
              SSAFY 10기 (방 이름) <button>!공지 버튼!</button>
            </div>
            <div>
              <button onClick={handleMember}>
                <img src={Members} width={25} alt="members" />
              </button>
              <button onClick={handleSetting}>
                <img src={Settings} width={25} alt="settings" />
              </button>
            </div>
          </StyleRoomHead>
          <StyleRoomBoth>
            {isFold ? null : (
              <StyleRoomNavBar>
                <RoomSubNavBar
                  handleChangeLoungeId={handleChangeLoungeId}
                  handleChangeValue={handleChangeValue}
                  handleChangeFoldTrue={handleFold}
                />
              </StyleRoomNavBar>
            )}

            <StyleRoomRTCLayout>
              {isFold ? <button onClick={handleFold}>&gt;</button> : null}

              <StyleRoomRTC>
                <StyleRoomRTCCore>
                  {isChannelIn && loungeId === 0 ? (
                    <>
                      <Routes>
                        <Route
                          path="channel/:channelId"
                          element={<RoomChannel />}
                        ></Route>
                      </Routes>
                    </>
                  ) : (
                    <RoomLounge />
                  )}
                </StyleRoomRTCCore>
                {isMember || isSetting ? (
                  <StyleMember>
                    {isMember ? <RoomMemberList /> : <RoomSettingList />}
                  </StyleMember>
                ) : null}
              </StyleRoomRTC>
            </StyleRoomRTCLayout>
          </StyleRoomBoth>
        </StyleRoomLayout>
      </StyleRoomOutline>
    </div>
  );
};
