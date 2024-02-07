import { OpenVidu } from "openvidu-browser";
import { useCallback, useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import {
  ArrowRightStartOnRectangleIcon,
  CameraIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
  VideoCameraSlashIcon,
  VideoCameraIcon,
  SignalIcon,
  SignalSlashIcon,
  SparklesIcon,
  BellAlertIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { createSession, createToken } from "../api/OvSession";
import ChannelButton from "../components/Room/ChannelButton";
import { useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { RoomNotice } from "components/RoomNotice";
import ModalPortal from "utils/Portal";
import Modal from "components/Common/Modal";
import { IChannel } from "models/Channel.interface";
import { CreateLoungeParams, ILounge } from "models/Lounge.interface";
import { createChannel, deleteChannel } from "api/Channel";
import { createLounge, deleteLounge } from "api/Lounge";
import LoungeButton from "components/Room/LoungeButton";
import Channel from "components/Room/Channel";
import Lounge from "components/Room/Lounge";
import { enterRoom, leaveRoom } from "api/Room";
import { EnterRoomResponse, LeaveRoomParams } from "models/Room.interface";
import { IFilter } from "models/Filter.interface";
import { filterType } from "constants/Filter";
import { useDispatch } from "react-redux";
import {
  setEnterRoom,
  setIsRoomIn,
  setLeaveRoom,
  setMicStatus,
  setVideoStatus,
} from "store/reducers/roomSlice";

export const Room = () => {
  const { roomId } = useParams();

  const userInfo = useSelector((state: any) => state.user);
  const [noticeClicked, setNoticeClicked] = useState<boolean>(false);
  const [sideToggle, setSideToggle] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<EnterRoomResponse | null>(null);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [lounges, setLounges] = useState<ILounge[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Lounge
  const [inLounge, setInLounge] = useState<boolean>(true);
  const [currentLounge, setCurrentLounge] = useState<ILounge | null>(null);

  // Openvidu states
  const [mySessionId, setMySessionId] = useState<string>("");
  const [mySessionName, setMySessionName] = useState<string>("");
  const [session, setSession] = useState<any>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<any>(undefined);
  const [publisher, setPublisher] = useState<any>(undefined);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<any>(null);
  const [speakerIds, setSpeakerIds] = useState<string[]>([]);

  // Control Panel
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isVideoDisabled, setIsVideoDisabled] = useState<boolean>(true);
  const [isScreenShared, setIsScreenShared] = useState<boolean>(false);
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  const [filter, setFilter] = useState<IFilter | null>(null);
  const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);

  const stompClient = useRef<any>(null);

  const OV = useRef(new OpenVidu());

  const dispatch = useDispatch();

  useEffect(() => {
    enterRoomHandler();
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
          stompClient.current.subscribe(`/room/info/${roomId}`, (e: any) =>
            handleUpdateInfo(JSON.parse(e.body))
          );
        },
        (e: any) => alert("에러발생!!!!!!")
      );
    }

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() =>
          console.log("방 웹소켓 연결 끊김!")
        );
        stompClient.current = null;
        leaveRoomHandler();
      }
    };
  }, []);

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

  const moveChannel = (sessionId: string, sessionName: string) => {
    setInLounge(false);
    if (sessionId !== mySessionId) {
      setIsLoading(true);
      leaveSession();
      setMySessionId(sessionId);
      setMySessionName(sessionName);
      joinSession();
    }
  };

  const moveLounge = (lounge: ILounge) => {
    setInLounge(true);
    setCurrentLounge(lounge);
  };

  const handleMainVideoStream = useCallback(
    (stream: any) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  const joinSession = useCallback(() => {
    setInLounge(false);
    const mySession = OV.current.initSession();
    OV.current.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 100, // Frequency of the polling of audio streams in ms (default 100)
        threshold: -50, // Threshold volume in dB (default -50)
      },
    });

    mySession.on("streamCreated", (event) => {
      const subscriber: any = mySession.subscribe(event.stream, undefined);
      subscriber.updatePublisherSpeakingEventsOptions({
        interval: 100, // Frequency of the polling of audio streams in ms
        threshold: -50, // Threshold volume in dB
      });
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });
    mySession.on("streamDestroyed", (event) =>
      deleteSubscriber(event.stream.streamManager)
    );
    mySession.on("reconnecting", () => console.warn("재접속 시도중입니다...."));
    mySession.on("reconnected", () => console.log("재접속에 성공했습니다."));
    mySession.on("sessionDisconnected", (event) => {
      if (event.reason === "networkDisconnect") {
        console.warn("네트워크 연결이 끊어졌습니다.");
      } else {
        console.warn("세션 연결이 끊어졌습니다", event);
      }
    });
    mySession.on("exception", (exception) => {
      if (exception.name === "ICE_CONNECTION_FAILED") {
        console.warn("ICE 연결이 실패했습니다.");
      } else if (exception.name === "ICE_CONNECTION_DISCONNECTED") {
        console.warn("ICE 연결이 끊겼습니다.");
      }
      console.warn(exception);
    });

    mySession.on("publisherStartSpeaking", (event: any) => {
      console.log("User " + event.connection.connectionId + " start speaking");
      setSpeakerIds((prev) => [...prev, event.connection.connectionId]);
    });

    mySession.on("publisherStopSpeaking", (event: any) => {
      console.log("User " + event.connection.connectionId + " stop speaking");
      setSpeakerIds((prev) =>
        prev.filter((id) => id !== event.connection.connectionId)
      );
    });

    setSession(mySession);
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: userInfo.user.nickname });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: !isMuted,
            publishVideo: !isVideoDisabled,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: true,
          });
          publisher.subscribeToRemote();
          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } catch (error: any) {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        }
      });
    }
  }, [session, userInfo.user.nickname]);

  const leaveSession = useCallback(() => {
    setInLounge(true);
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("");
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            audioSource: undefined,
            publishAudio: !isMuted,
            publishVideo: !isVideoDisabled,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: true,
          });

          if (session) {
            await session.unpublish(mainStreamManager);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager]);

  useEffect(() => {
    if (publisher) {
      setIsLoading(false);
    }
  }, [publisher]);

  const deleteSubscriber = useCallback((streamManager: any) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      leaveSession();
      leaveRoomHandler();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const getToken = useCallback(async () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }, [mySessionId]);

  useEffect(() => {
    if (publisher) {
      publisher.publishAudio(!isMuted);
      dispatch(setMicStatus(isMuted));
    } else {
    }
  }, [isMuted]);

  useEffect(() => {
    if (publisher) {
      publisher.publishVideo(!isVideoDisabled);
      
      dispatch(setVideoStatus(!isVideoDisabled));
    }
  }, [isVideoDisabled]);

  useEffect(() => {
    if (session) {
      if (isScreenShared) {
        startScreenShare();
      } else {
        stopScreenShare();
      }
    }
  }, [isScreenShared]);

  useEffect(() => {
    if (publisher) {
      if (filterApplied && filter) {
        publisher.stream.applyFilter("GStreamerFilter", {
          command: filter.command,
        });
      } else {
        publisher.stream.removeFilter();
        setFilter(null);
      }
    }
  }, [filterApplied]);

  useEffect(() => {
    if (filter) {
      setFilterMenuOpen(false);
      setFilterApplied(true);
    }
  }, [filter]);

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
      await session.unpublish(mainStreamManager);
      await session.publish(publisherScreen);
      setMainStreamManager(publisherScreen);
      setPublisher(publisherScreen);
    }
  };

  const stopScreenShare = async () => {
    let publisher = await OV.current.initPublisherAsync(undefined, {
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
      await session.unpublish(mainStreamManager);
      await session.publish(publisher);
      setMainStreamManager(publisher);
      setPublisher(publisher);
    }
  };

  const toggleNotice = () => {
    setNoticeClicked(!noticeClicked);
  };

  const toggleSideBar = () => {
    setSideToggle(!sideToggle);
  };

  const handleModal = () => {
    setModal(!modal);
    console.log("modal:", modal);
  };

  //여기에 채널 추가, 삭제 함수 추가
  const addChannel = async (props: string) => {
    try {
      const res = await createChannel({
        roomId: parseInt(roomId!),
        name: props,
      });
      const newChannel: IChannel = {
        channelId: res,
        name: props,
      };
      // 동시성 이벤트
      const event = {
        eventType: "CHANNEL_CREATE",
        roomId: parseInt(roomId!),
        data: newChannel,
      };
      console.log("보내는 이벤트", event);
      stompClient.current.send(
        `/app/room/info/send`,
        {},
        JSON.stringify(event)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const removeChannel = async (id: number) => {
    try {
      await deleteChannel({ channelId: id });
      // 동시성 이벤트
      const event = {
        eventType: "CHANNEL_DELETE",
        roomId: parseInt(roomId!),
        data: { channelId: id },
      };
      console.log("보내는 이벤트", event);
      stompClient.current.send(
        `/app/room/info/send`,
        {},
        JSON.stringify(event)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const addLounge = async (props: string) => {
    try {
      const data: CreateLoungeParams = {
        roomId: parseInt(roomId!),
        name: props,
      };
      const res = await createLounge(data);
      const newLounge: ILounge = {
        loungeId: res,
        name: props,
      };
      // 동시성 이벤트
      const event = {
        eventType: "LOUNGE_CREATE",
        roomId: parseInt(roomId!),
        data: newLounge,
      };
      console.log("보내는 이벤트", event);
      stompClient.current.send(
        `/app/room/info/send`,
        {},
        JSON.stringify(event)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const removeLounge = async (id: number) => {
    try {
      await deleteLounge({ loungeId: id });
      // 동시성 이벤트
      const event = {
        eventType: "LOUNGE_DELETE",
        roomId: parseInt(roomId!),
        data: { loungeId: id },
      };
      console.log("보내는 이벤트", event);
      stompClient.current.send(
        `/app/room/info/send`,
        {},
        JSON.stringify(event)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const leaveSessionHandler = () => {
    leaveSession();
  };

  const enterRoomHandler = async () => {
    const res = await enterRoom({ roomId: parseInt(roomId!), password: "" });
    setRoomData(res);
    setChannels(res.channels);
    setLounges(res.lounges);
    dispatch(setEnterRoom(res));
    dispatch(setIsRoomIn(true));
  };

  const leaveRoomHandler = () => {
    const data: LeaveRoomParams = {
      roomId: parseInt(roomId!),
      keywords: undefined,
    };
    try {
      console.log("나갈게~");
      const res = leaveRoom(data);
      dispatch(setIsRoomIn(false));
      dispatch(setLeaveRoom());
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (roomData) {
      if (roomData!.channels.length > 0) {
        setChannels(roomData!.channels);
      }
      if (roomData!.lounges.length > 0) {
        setLounges(roomData!.lounges);
        setCurrentLounge(roomData!.lounges[0]);
      }
    }
  }, [roomData]);

  return (
    <RoomContainer>
      <RoomHeader>
        <RoomTitleContainer>
          <RoomTitleImgBorder>
            <RoomTitleImg
              style={{
                backgroundImage:
                  "url(https://i.pinimg.com/736x/52/8a/4f/528a4f1570bf735b7a772d17562723f1.jpg)",
              }}
            />
          </RoomTitleImgBorder>
          <RoomTitle>{roomData?.title}</RoomTitle>
          <RoomNoticeButton onClick={toggleNotice}>
            <BellAlertIcon />
            {noticeClicked ? <RoomNotice></RoomNotice> : null}
          </RoomNoticeButton>
        </RoomTitleContainer>
        <RoomButtonContainer>
          <RoomButton onClick={leaveSessionHandler}>
            <ArrowRightStartOnRectangleIcon className="w-8 h-8" />
          </RoomButton>
          <RoomButton onClick={switchCamera}>
            <CameraIcon className="w-8 h-8" />
          </RoomButton>
        </RoomButtonContainer>
      </RoomHeader>

      <RoomContent>
        <RoomSidebar>
          <SideBarToggler onClick={toggleSideBar}>
            {sideToggle ? (
              <ChevronDoubleLeftIcon />
            ) : (
              <ChevronDoubleRightIcon />
            )}
          </SideBarToggler>
          {sideToggle ? (
            <SideWrapper>
              <SideContent>
                <SideTitle>라운지</SideTitle>
                {lounges.map((l) => (
                  <LoungeButton
                    key={l.loungeId}
                    active={inLounge && currentLounge?.loungeId === l.loungeId}
                    disabled={
                      isLoading ||
                      (inLounge && currentLounge?.loungeId === l.loungeId)
                    }
                    lounge={l}
                    moveLounge={moveLounge}
                  />
                ))}
                <SideTitle>채널</SideTitle>
                {channels.map((c) => (
                  <ChannelButton
                    key={c.channelId}
                    active={mySessionId === c.channelId.toString()}
                    disabled={
                      isLoading ||
                      (!inLounge && mySessionId === c.channelId.toString())
                    }
                    id={c.channelId.toString()}
                    name={c.name}
                    moveChannel={moveChannel}
                  />
                ))}
              </SideContent>
              <RoomAddButton onClick={handleModal}>
                <PlusIcon className="w-6 h-6 "></PlusIcon>
                <ModalPortal>
                  {modal ? (
                    <Modal
                      channels={channels}
                      removeChannel={removeChannel}
                      addChannel={addChannel}
                      toggleModal={handleModal}
                      option="channelCreate"
                      lounges={lounges}
                      addLounge={addLounge}
                      removeLounge={removeLounge}
                    ></Modal>
                  ) : null}
                </ModalPortal>
              </RoomAddButton>
            </SideWrapper>
          ) : null}
        </RoomSidebar>

        <ChannelBorder>
          {inLounge && currentLounge ? (
            <Lounge lounge={currentLounge} />
          ) : (
            <Channel
              session={session}
              mySessionName={mySessionName}
              mySessionId={mySessionId}
              myUserName={userInfo.user.nickname}
              publisher={publisher}
              subscribers={subscribers}
              speakerIds={speakerIds}
              leaveSession={leaveSession}
              handleMainVideoStream={handleMainVideoStream}
            />
          )}
        </ChannelBorder>
      </RoomContent>
      {session !== undefined && inLounge === false && (
        <ControlPanel>
          <ControlPanelButton onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? (
              <SpeakerXMarkIcon className="w-8 h-8 text-red-400" />
            ) : (
              <SpeakerWaveIcon className="w-8 h-8" />
            )}
          </ControlPanelButton>
          <ControlPanelButton
            onClick={() => setIsVideoDisabled(!isVideoDisabled)}
          >
            {isVideoDisabled ? (
              <VideoCameraSlashIcon className="w-8 h-8 text-red-400" />
            ) : (
              <VideoCameraIcon className="w-8 h-8" />
            )}
          </ControlPanelButton>
          <ControlPanelButton
            onClick={() => setIsScreenShared(!isScreenShared)}
          >
            {isScreenShared ? (
              <SignalIcon className="w-8 h-8" />
            ) : (
              <SignalSlashIcon className="w-8 h-8 text-red-400" />
            )}
          </ControlPanelButton>
          <ControlPanelButton>
            {filterApplied ? (
              <SparklesIcon
                className="w-8 h-8 text-yellow-400"
                onClick={() => setFilterApplied(false)}
              />
            ) : (
              <SparklesIcon
                className="w-8 h-8"
                onClick={() => setFilterMenuOpen(true)}
              />
            )}
            {filterMenuOpen && (
              <FilterMenu onMouseLeave={() => setFilterMenuOpen(false)}>
                {filterType.map((f) => (
                  <FilterMenuList
                    key={f.name}
                    disabled={filter === f}
                    onClick={() => {
                      setFilter(f);
                    }}
                  >
                    {f.name}
                  </FilterMenuList>
                ))}
              </FilterMenu>
            )}
          </ControlPanelButton>
        </ControlPanel>
      )}
    </RoomContainer>
  );
};

const RoomContainer = tw.div`
w-full
h-[calc(100vh-48px)]
flex
flex-col
relative
bg-gradient-to-b
from-[#0A031C]
from-80%
to-[#100530]

`;

const RoomHeader = tw.div`
w-full
h-20
px-2
pl-10
flex
justify-between
items-center
`;

const RoomTitleContainer = tw.div`
flex
items-end
gap-2
`;

const RoomTitleImgBorder = tw.div`
w-12
h-12
flex
justify-center
items-center
rounded-full
bg-gradient-to-r
from-[#c840cb]
from-1%
via-[#9eaed6]
to-99%
to-[#972da0]
`;

const RoomTitleImg = tw.div`
w-11
h-11
rounded-full
bg-contain
bg-no-repeat
bg-center
shadow-md
`;

const RoomTitle = tw.h1`
font-semibold
text-3xl
text-slate-100
tracking-wide
pl-4
`;
const RoomNoticeButton = tw.button`
w-6
h-6
text-white
`;
//오른쪽 위 카메라 &
const RoomButtonContainer = tw.div`
h-full
flex
items-center
space-x-5
`;

const RoomButton = tw.button`
cursor-pointer
text-slate-200
w-10
h-10
font-medium
text-lg
`;

const RoomContent = tw.div`
w-auto
h-auto
flex
flex-grow-[1]
pr-4
pb-4
`;

const RoomSidebar = tw.div`
mx-4
pt-4
h-full
space-y-3
flex
flex-col
items-end
justify-start
`;

const SideContent = tw.div`
w-20
h-full
gap-6
flex
flex-col
items-center
`;

const SideBarToggler = tw.button`
w-4
h-4
text-white
flex
`;

const SideTitle = tw.div`
  text-white
  font-bold
  text-xl
`;

const SideWrapper = tw.div`
h-full
flex
flex-col
justify-between
items-center
`;

const RoomAddButton = tw.button`
flex
justify-center
mb-1
w-full
h-6
rounded-md
text-white
hover:bg-slate-800
`;

const ChannelBorder = tw.div`
w-full
h-full
p-[1px]
bg-gradient-to-r
from-[#9e8caa]
via-60%
via-[#a8ad98]
to-90%
to-[#cfb2ba]
rounded-md
relative
box-border
`;

const ControlPanel = tw.div`
min-w-80
h-16
bottom-6
left-1/2
-translate-x-1/2
absolute
rounded-xl
bg-[#171717]
shadow-xl
flex
items-center
justify-around
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

const FilterMenu = tw.div`
bg-[#3f3f3f]
absolute
bottom-1/2
-translate-1/2
left-1/2
w-32
rounded-lg
shadow-lg
flex
flex-col
justify-between
overflow-hidden
space-y-1
`;

const FilterMenuList = tw.button`
w-full
h-9
bg-[#2f2f2f]
hover:bg-slate-400
disabled:bg-slate-400
`;
