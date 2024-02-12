import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/Common/Navigation/NavBar";
import { RoomList } from "./pages/RoomList";
import { Mainpage } from "./pages/Mainpage";
import { Community } from "./pages/Community";
import { Mypage } from "./pages/Mypage";
import { Room } from "./pages/Room";
import ConditionCheck from "./pages/ConditionCheck";
import { RecruitBoardList } from "./pages/RecruitBoardList";
import { FreeBoardList } from "./pages/FreeBoardList";
import Board from "./pages/Board";
import { BoardDetail } from "./pages/BoardDetail";
import { useDispatch, useSelector } from "react-redux";
import ProfileEdit from "pages/ProfileEdit";
import RoomCreate from "pages/RoomCreate";
import tw from "tailwind-styled-components";
import RoomModify from "pages/RoomModify";
import WriteArticle from "pages/WriteArticle";
import { RoomResponse, LeaveRoomParams } from "models/Room.interface";
import { IChannel } from "models/Channel.interface";
import { ILounge } from "models/Lounge.interface";
import { IFilter } from "models/Filter.interface";
import { OpenVidu } from "openvidu-browser";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getRoom, leaveRoom } from "api/Room";
import { setLeaveRoom } from "store/reducers/roomSlice";

function App() {
  //임시
  const userInfo = useSelector((state: any) => state.user);
  const roomInfo = useSelector((state: any) => state.room);

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const modalHandler = () => {
    setIsModal(!isModal);
  };

  /**
   * 방 관련 state
   */
  const [roomData, setRoomData] = useState<RoomResponse | null>(null);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [lounges, setLounges] = useState<ILounge[]>([]);

  /**
   * 앱 상태변수
   */
  const [sideToggle, setSideToggle] = useState<boolean>(true);
  const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);
  // Lounge
  const [inLounge, setInLounge] = useState<boolean>(true);
  const [currentLounge, setCurrentLounge] = useState<ILounge | null>(null);
  // Openvidu states
  const [mySessionId, setMySessionId] = useState<string>("");
  const [mySessionName, setMySessionName] = useState<string>("");
  const [session, setSession] = useState<any>(null);
  const [mainStreamManager, setMainStreamManager] = useState<any | null>(null);
  const [publisher, setPublisher] = useState<any | null>(null);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<any>(null);
  const [speakerIds, setSpeakerIds] = useState<string[]>([]);

  // Control Panel
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isVideoDisabled, setIsVideoDisabled] = useState<boolean>(true);
  const [isScreenShared, setIsScreenShared] = useState<boolean>(false);
  const [filter, setFilter] = useState<IFilter | null>(null);

  const stompClient = useRef<any>(null);

  const OV = useRef(new OpenVidu());

  const dispatch = useDispatch();

  useEffect(() => {
    console.warn(currentLounge);
  }, [currentLounge]);

  useEffect(() => {
    console.error("룸아이디 변경!", roomInfo);
    if (roomInfo.isRoomIn) {
      if (roomData === null) {
        getRoomHandler(roomInfo.roomId);
      }

      if (stompClient.current === null) {
        stompClient.current = Stomp.over(() => {
          const sock = new SockJS(
            `${process.env.REACT_APP_WEBSOCKET_SERVER_URL}stomp`
          );
          return sock;
        });

        stompClient.current.connect(
          {},
          () => {
            stompClient.current.subscribe(
              `/room/info/${roomInfo.roomId}`,
              (e: any) => handleUpdateInfo(JSON.parse(e.body))
            );
          },
          (e: any) => alert("에러발생!!!!!!")
        );
      }
    }

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() =>
          console.log("방 웹소켓 연결 끊김!")
        );
        stompClient.current = null;
      }
    };
  }, [roomInfo.roomId]);

  const getRoomHandler = async (roomId: string) => {
    const res = await getRoom({ roomId: parseInt(roomId!) });
    setRoomData(res);
    setChannels(res.channels);
    setLounges(res.lounges);
  };

  const leaveRoomHandler = async () => {
    const data: LeaveRoomParams = {
      roomId: parseInt(roomInfo.roomId),
      keywords: undefined,
    };
    try {
      const res = await leaveRoom(data);
      dispatch(setLeaveRoom());
      // navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateInfo = (event: any) => {
    console.log("받은 동시성 이벤트", event);

    switch (event.eventType) {
      case "ROOM_CREATE":
        break;
      case "ROOM_DELETE":
        break;
      case "ROOM_JOIN":
        break;
      case "ROOM_WITHDRAW":
        break;
      case "CHANNEL_CREATE":
        setChannels((prev) => [...prev, event.data]);
        break;
      case "CHANNEL_UPDATE":
        break;
      case "CHANNEL_DELETE":
        setChannels((prev) =>
          prev.filter((channel) => channel.channelId !== event.data.channelId)
        );
        break;
      case "LOUNGE_CREATE":
        setLounges((prev) => [...prev, event.data]);
        break;
      case "LOUNGE_UPDATE":
        break;
      case "LOUNGE_DELETE":
        setLounges((prev) =>
          prev.filter((lounge) => lounge.loungeId !== event.data.loungeId)
        );
        break;
    }
  };

  useEffect(() => {
    if (publisher) {
      publisher.publishAudio(!isMuted);
    }
  }, [isMuted]);

  useEffect(() => {
    if (publisher) {
      publisher.publishVideo(!isVideoDisabled);
    }
  }, [isVideoDisabled]);

  useEffect(() => {
    if (publisher) {
      if (filter) {
        publisher.stream.applyFilter("GStreamerFilter", {
          command: filter.command,
        });
        setFilterMenuOpen(false);
      } else {
        if (!isScreenShared) {
          try {
            publisher.stream.removeFilter();
          } catch (error: any) {
            console.log(error);
          }
        }
      }
    }
  }, [filter]);

  useEffect(() => {
    if (session) {
      if (isScreenShared) {
        startScreenShare();
      } else {
        stopScreenShare();
      }
    }
  }, [isScreenShared]);

  const startScreenShare = async () => {
    let publisherScreen = await OV.current.initPublisherAsync(undefined, {
      videoSource: "screen",
    });

    publisherScreen.once("accessAllowed", (event) => {
      publisherScreen.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .addEventListener("ended", () => {
          console.log("사용자가 공유 중지 버튼을 눌렀습니다.");
          setIsScreenShared(false);
        });
    });

    publisherScreen.on("videoElementCreated", (event) => {
      setIsMuted(true);
    });

    publisherScreen.once("accessDenied", (event) => {
      console.error("화면공유가 거절되었습니다.");
    });

    if (session) {
      if (mainStreamManager === publisher) {
        setMainStreamManager(publisherScreen);
      }

      await session.unpublish(publisher);
      await session.publish(publisherScreen);
      setPublisher(publisherScreen);
      setFilter(null);
    }
  };

  const stopScreenShare = async () => {
    let publisherCam = await OV.current.initPublisherAsync(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: !isMuted,
      publishVideo: !isVideoDisabled,
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
      mirror: true,
    });

    if (session) {
      if (mainStreamManager === publisher) {
        setMainStreamManager(publisherCam);
      }
      await session.unpublish(publisher);
      await session.publish(publisherCam);
      setPublisher(publisherCam);
    }
  };

  return (
    <div className="App h-dvh">
      <BrowserRouter>
        <NavBarContainer>
          <NavBar
            roomData={roomData}
            setIsMuted={setIsMuted}
            isMuted={isMuted}
            setIsVideoDisabled={setIsVideoDisabled}
            isVideoDisabled={isVideoDisabled}
            publisher={publisher}
          />
        </NavBarContainer>
        <RoutesContainer>
          <Routes>
            <Route path="/" element={<Mainpage />} />

            <Route
              path="/room/:roomId/*"
              element={
                <Room
                  setRoomData={setRoomData}
                  roomData={roomData}
                  setChannels={setChannels}
                  channels={channels}
                  setLounges={setLounges}
                  lounges={lounges}
                  setSideToggle={setSideToggle}
                  sideToggle={sideToggle}
                  setFilterMenuOpen={setFilterMenuOpen}
                  filterMenuOpen={filterMenuOpen}
                  setInLounge={setInLounge}
                  inLounge={inLounge}
                  setCurrentLounge={setCurrentLounge}
                  currentLounge={currentLounge}
                  setMySessionId={setMySessionId}
                  mySessionId={mySessionId}
                  setMySessionName={setMySessionName}
                  mySessionName={mySessionName}
                  setSession={setSession}
                  session={session}
                  setMainStreamManager={setMainStreamManager}
                  mainStreamManager={mainStreamManager}
                  setPublisher={setPublisher}
                  publisher={publisher}
                  setSubscribers={setSubscribers}
                  subscribers={subscribers}
                  setCurrentVideoDevice={setCurrentVideoDevice}
                  currentVideoDevice={currentVideoDevice}
                  setSpeakerIds={setSpeakerIds}
                  speakerIds={speakerIds}
                  setIsMuted={setIsMuted}
                  isMuted={isMuted}
                  setIsVideoDisabled={setIsVideoDisabled}
                  isVideoDisabled={isVideoDisabled}
                  setIsScreenShared={setIsScreenShared}
                  isScreenShared={isScreenShared}
                  setFilter={setFilter}
                  filter={filter}
                  stompClient={stompClient}
                  OV={OV}
                />
              }
            />
            <Route path="/room-regist" element={<RoomCreate />} />
            <Route path="/room-modify/:roomId" element={<RoomModify />} />
            <Route path="/roomlist" element={<RoomList />} />

            {/* 커뮤니티인데 곧 삭제 예정... */}
            <Route path="/community" element={<Community />} />

            {/* 모집 게시판 */}
            <Route path="/recruit-board" element={<RecruitBoardList />} />

            <Route
              path="/recruit-board/edit"
              element={<Board isFree={true} isEdit={true} />}
            />
            {/* 모집게시판 글 상세보기 */}
            <Route
              path="/recruit-board/:boardId"
              element={<BoardDetail />}
            ></Route>

            {/* 자유 게시판 */}
            <Route path="/free-board" element={<FreeBoardList />}></Route>

            {/* 자유게시판 글 상세보기 */}
            <Route
              path="/free-board/:boardId"
              element={<BoardDetail />}
            ></Route>
            {/* 글 쓰기 & 글 수정 */}
            <Route path="/write-article" element={<WriteArticle />}></Route>

            {/* 마이페이지 */}
            <Route path="/userpage/:memberId" element={<Mypage />} />
            <Route path="/profile-edit" element={<ProfileEdit />}></Route>
            <Route path="/before-entrance" element={<ConditionCheck />} />
          </Routes>
        </RoutesContainer>
      </BrowserRouter>
    </div>
  );
}

const NavBarContainer = tw.div`
fixed
w-full
h-12
z-10
`;

const RoutesContainer = tw.div`
pt-12
`;

export default App;
