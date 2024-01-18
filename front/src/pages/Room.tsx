import { useState, useEffect } from "react";
import { RoomLounge } from "../components/RoomLounge";
import RoomSubNavBar from "../components/RoomSubNavBar";
import RoomChannel from "../components/RoomChannel";
import { Routes, Route, useParams } from "react-router-dom";

import tw from "tailwind-styled-components";
import { TailwindComponent } from "tailwind-styled-components/dist/tailwind";

type styledType = TailwindComponent<React.HTMLAttributes<HTMLDivElement>, {}>;

//css 스타일 컴포넌트 - 높이, 넓이 나중에 다시 다 고쳐야할 듯
//StyleRoomOutline: 룸의 가장 바깥라인 - 높이 다시 고쳐야함!!
const StyleRoomOutline: styledType = tw.div`
    flex
    justify-center
    h-[95vh]
`;

//StyleRoomLayout: 룸의 레이아웃
const StyleRoomLayout: styledType = tw.div`
    w-[98%]
    border-black-200
    border
    rounded-xl`;

//StyleRoomHead: 룸의 헤더 (방 이름, 공지버튼, 멤버보기버튼, 환경설정버튼)
const StyleRoomHead: styledType = tw.div`
    flex justify-between
    `;

//StyleRoomBoth: 네비바 & RTC 부분의 레이아웃
const StyleRoomBoth: styledType = tw.div`
    flex
    h-[95%]
    `;

//StyleRoomNavBar: 룸의 네비바
const StyleRoomNavBar: styledType = tw.div`
    w-[8%]
    `;

//StyleRoomRTCLayout: 룸의 RTC 레이아웃
const StyleRoomRTCLayout: styledType = tw.div`
    w-full
    h-[95%]
    flex
    items-center
    justify-center

`;

//StyleRoomRTC: 룸의 RTC 부분(라운지와 채널이 보이는 부분)
const StyleRoomRTC: styledType = tw.div`
    w-[95%]
    h-[95%]
    border
    flex
    items-center
    justify-center
    `;

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

  return (
    <div>
      <StyleRoomOutline>
        <StyleRoomLayout>
          <StyleRoomHead>
            <div>
              SSAFY 10기 (방 이름) <button>!공지 버튼!</button>
            </div>
            <div>
              <button>멤버보기</button> | <button>환경설정</button>
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
              </StyleRoomRTC>
            </StyleRoomRTCLayout>
          </StyleRoomBoth>
        </StyleRoomLayout>
      </StyleRoomOutline>
    </div>
  );
};
