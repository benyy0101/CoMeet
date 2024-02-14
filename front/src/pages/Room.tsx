import { OpenVidu } from "openvidu-browser";
import { useCallback, useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import {
  ArrowRightStartOnRectangleIcon,
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
  CameraIcon,
} from "@heroicons/react/24/solid";
import { createSession, createToken } from "../api/OvSession";
import ChannelButton from "../components/Room/ChannelButton";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import { RoomResponse, LeaveRoomParams } from "models/Room.interface";
import { IFilter } from "models/Filter.interface";
import { filterType } from "constants/Filter";
import { useDispatch } from "react-redux";
import { setEnterRoom, setLeaveRoom } from "store/reducers/roomSlice";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import BasicRoom from "assets/img/basic-room.png";

interface IProps {
  setRoomData: React.Dispatch<React.SetStateAction<RoomResponse | null>>;
  roomData: RoomResponse | null;
  setChannels: React.Dispatch<React.SetStateAction<IChannel[]>>;
  channels: IChannel[];
  setLounges: React.Dispatch<React.SetStateAction<ILounge[]>>;
  lounges: ILounge[];
  setSideToggle: React.Dispatch<React.SetStateAction<boolean>>;
  sideToggle: boolean;
  setFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterMenuOpen: boolean;
  setInLounge: React.Dispatch<React.SetStateAction<boolean>>;
  inLounge: boolean;
  setCurrentLounge: React.Dispatch<React.SetStateAction<ILounge | null>>;
  currentLounge: ILounge | null;
  setMySessionId: React.Dispatch<React.SetStateAction<string>>;
  mySessionId: string;
  setMySessionName: React.Dispatch<React.SetStateAction<string>>;
  mySessionName: string;
  setSession: React.Dispatch<React.SetStateAction<any>>;
  session: any;
  setMainStreamManager: React.Dispatch<React.SetStateAction<any | null>>;
  mainStreamManager: any | null;
  setPublisher: React.Dispatch<React.SetStateAction<any | null>>;
  publisher: any | null;
  setSubscribers: React.Dispatch<React.SetStateAction<any[]>>;
  subscribers: any[];
  setCurrentVideoDevice: React.Dispatch<React.SetStateAction<any>>;
  currentVideoDevice: any;
  setSpeakerIds: React.Dispatch<React.SetStateAction<string[]>>;
  speakerIds: string[];
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsVideoDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isVideoDisabled: boolean;
  setIsScreenShared: React.Dispatch<React.SetStateAction<boolean>>;
  isScreenShared: boolean;
  setFilter: React.Dispatch<React.SetStateAction<IFilter | null>>;
  filter: IFilter | null;
  stompClient: any;
  OV: React.MutableRefObject<OpenVidu>;
  leaveRoomHandler: () => Promise<any>;
  leaveSession: () => void;
}

export const Room = ({
  setRoomData,
  roomData,
  setChannels,
  channels,
  setLounges,
  lounges,
  setSideToggle,
  sideToggle,
  setFilterMenuOpen,
  filterMenuOpen,
  setInLounge,
  inLounge,
  setCurrentLounge,
  currentLounge,
  setMySessionId,
  mySessionId,
  setMySessionName,
  mySessionName,
  setSession,
  session,
  setMainStreamManager,
  mainStreamManager,
  setPublisher,
  publisher,
  setSubscribers,
  subscribers,
  setCurrentVideoDevice,
  currentVideoDevice,
  setSpeakerIds,
  speakerIds,
  setIsMuted,
  isMuted,
  setIsVideoDisabled,
  isVideoDisabled,
  setIsScreenShared,
  isScreenShared,
  setFilter,
  filter,
  stompClient,
  OV,
  leaveRoomHandler,
  leaveSession,
}: IProps) => {
  const { roomId } = useParams();
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user);
  const roomInfo = useSelector((state: any) => state.room);

  const [noticeClicked, setNoticeClicked] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!roomInfo.isRoomIn) {
      enterRoomHandler();
    } else {
      if (roomInfo.roomId !== roomId || searchParams.get("modify")) {
        leaveRoomHandler().then((_) => {
          enterRoomHandler();
        });
      }
    }
  }, [roomId]);

  const enterRoomHandler = async () => {
    const res = await enterRoom({ roomId: parseInt(roomId!), password: "" });
    setRoomData(res);
    setLounges(res.lounges);
    setChannels(res.channels);
    setCurrentLounge(res.lounges[0]);
    dispatch(setEnterRoom(roomId!));
  };

  const onClickLeaveRoom = () => {
    leaveRoomHandler()
      .then((_) => {
        dispatch(setLeaveRoom());
        navigate("/");
      })
      .catch((error: any) => {
        dispatch(setLeaveRoom());
        navigate("/");
      });
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
    if (session !== null && publisher === null) {
      console.error("토큰 가져오기!");
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
            await session.unpublish(publisher);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
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
      return prevSubscribers.filter((sub) => sub !== streamManager);
    });
  }, []);

  const getToken = useCallback(async () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }, [mySessionId]);

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

  //기본 이미지
  const defaultRoomImg = `https://cdn1.iconfinder.com/data/icons/line-full-package/150/.svg-15-512.png`;

  return (
    <RoomContainer>
      <RoomHeader>
        <RoomTitleContainer>
          <RoomTitleImgBorder>
            <RoomTitleImg
              style={{
                backgroundImage: `url(${roomData?.room_image ? roomData.room_image : BasicRoom})`,
              }}
            />
          </RoomTitleImgBorder>
          <RoomTitle>{roomData?.title}</RoomTitle>
          <RoomNoticeButton onClick={toggleNotice}>
            <BellAlertIcon />
            {noticeClicked ? <RoomNotice text={roomData?.notice} /> : null}
          </RoomNoticeButton>
        </RoomTitleContainer>
        <RoomButtonContainer>
          <Link to={`/room-modify/${roomId}`} state={{ data: roomData }}>
            <RoomButton>
              <Cog6ToothIcon className="w-8 h-8" />
            </RoomButton>
          </Link>
          <RoomButton onClick={onClickLeaveRoom}>
            <ArrowRightStartOnRectangleIcon className="w-8 h-8" />
          </RoomButton>
        </RoomButtonContainer>
      </RoomHeader>

      <RoomContent>
        <RoomSidebar>
          <ToggleButtonContainer onClick={toggleSideBar}>
            <SideBarToggler>
              {sideToggle ? (
                <ChevronDoubleLeftIcon className="w-6 h-6" />
              ) : (
                <ChevronDoubleRightIcon className="w-6 h-6" />
              )}
            </SideBarToggler>
          </ToggleButtonContainer>
          {sideToggle ? (
            <SideWrapper>
              <SideTitle>라운지</SideTitle>
              <SideContentContainer>
                <SideContent>
                  {lounges.map((l) => (
                    <LoungeButton
                      key={l.loungeId}
                      active={
                        inLounge && currentLounge?.loungeId === l.loungeId
                      }
                      disabled={
                        isLoading ||
                        (inLounge && currentLounge?.loungeId === l.loungeId)
                      }
                      lounge={l}
                      moveLounge={moveLounge}
                    />
                  ))}
                </SideContent>
              </SideContentContainer>
              <SideTitle>채널</SideTitle>
              <SideContentContainer>
                <SideContent>
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
              </SideContentContainer>
            </SideWrapper>
          ) : null}
          <RoomAddButton onClick={handleModal}>
            <PlusIcon className="w-6 h-6"></PlusIcon>
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
        </RoomSidebar>
        {currentLounge && (
          <ChannelBorder>
            {inLounge ? (
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
                mainStreamManager={mainStreamManager}
                handleMainVideoStream={handleMainVideoStream}
              />
            )}
          </ChannelBorder>
        )}
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
            {filter ? (
              <SparklesIcon
                className="w-8 h-8 text-yellow-400"
                onClick={() => setFilter(null)}
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
          <ControlPanelButton onClick={switchCamera}>
            <CameraIcon className="w-8 h-8" />
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
bg-white
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
px-4
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
flex
flex-col
items-center
justify-start
space-y-4
`;

const ToggleButtonContainer = tw.div`
flex
justify-center
mb-1
w-full
h-6
rounded-md
text-white
hover:bg-slate-800
cursor-pointer
`;

const SideContent = tw.div`
w-20
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
flex
flex-col
justify-between
items-center
h-10
flex-grow-[1]
space-y-4
`;

const SideContentContainer = tw.div`
overflow-y-auto
scrollbar-hide
h-1/2
flex
flex-col
items-center
space-y-2
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
