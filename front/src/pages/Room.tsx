import { OpenVidu } from "openvidu-browser";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "../components/Room/UserVideoComponent";
import tw from "tailwind-styled-components";
import {
  UserGroupIcon,
  ArrowRightStartOnRectangleIcon,
  CameraIcon,
  XMarkIcon,
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
import Chat from "../components/Room/Chat";
import ShareEditor from "../components/Room/ShareEditor";
import { createSession, createToken } from "../api/OvSession";
import ChannelButton from "../components/Room/ChannelButton";
import { useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { RoomNotice } from "components/RoomNotice";
import ModalPortal from "utils/Portal";
import Modal from "components/Common/Modal";
import { Channel, CreateChannelResponse } from "models/Channel.interface";
import { CreateLoungeParams, Lounge } from "models/Lounge.interface";
import { set } from "react-hook-form";
import { createChannel, deleteChannel } from "api/Channel";
import { useQuery } from "@tanstack/react-query";
import { create } from "domain";
import { createLounge } from "api/Lounge";

interface IFilter {
  name: string;
  command: string;
}

const filterType: IFilter[] = [
  { name: "Edgetv", command: "edgetv" },
  { name: "Revtv", command: "revtv" },
  { name: "Agingtv", command: "agingtv" },
  { name: "Optv", command: "optv" },
  { name: "Quarktv", command: "quarktv" },
  { name: "Radioactv", command: "radioactv" },
  { name: "Rippletv", command: "rippletv" },
  { name: "Shagadelictv", command: "shagadelictv" },
  { name: "Streaktv", command: "streaktv" },
  { name: "Vertigotv", command: "vertigotv" },
  { name: "Warptv", command: "warptv" },
  { name: "Bulge", command: "bulge" },
  { name: "Kaleidoscope", command: "kaleidoscope" },
  { name: "Mirror", command: "mirror" },
  { name: "Pinch", command: "pinch" },
  { name: "Stretch", command: "stretch" },
  { name: "Twirl", command: "twirl" },
  { name: "Square", command: "square" },
  { name: "Heat", command: "coloreffects preset=heat" },
  { name: "GrayScale", command: "videobalance saturation=0.0" },
  { name: "Dicetv", command: "dicetv" },
  {
    name: "Time overlay",
    command: `timeoverlay valignment=bottom halignment=right font-desc="Sans, 30"`,
  },
];

// const channels: Channel[] = [
//   { channelId: 1, name: "채널 1" },
//   { channelId: 2, name: "채널 2" },
//   { channelId: 3, name: "채널 3" },
// ];

export const Room = () => {
  const { roomId } = useParams();

  const userInfo = useSelector((state: any) => state.user);
  const [noticeClicked, setNoticeClicked] = useState<boolean>(false);
  const [sideToggle, setSideToggle] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [lounges, setLounges] = useState<Lounge[]>([]);

  const [isJoined, setIsJoined] = useState<boolean>(userInfo.isLoggedIn);
  const [inChat, setInChat] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Openvidu states
  const [mySessionId, setMySessionId] = useState<string>("");
  const [mySessionName, setMySessionName] = useState<string>("");
  const [myUserName, setMyUserName] = useState<string>(userInfo.user.nickname);
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

  const editorRef = useRef<any>(null);
  const stompClient = useRef<any>(null);

  const OV = useRef(new OpenVidu());

  useEffect(() => {
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
          stompClient.current.subscribe(`/room/${roomId}`, (e: any) =>
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
      }
    };
  }, []);

  const handleUpdateInfo = (data: any) => {
    console.log(data);
    if (data.type === "ROOM") {
      handleRoomUpdate(data);
    } else if (data.type === "LOUNGE") {
      handleLoungeUpdate(data);
    } else if (data.type === "CHANNEL") {
      handleChannelUpdate(data);
    }
  };

  const handleRoomUpdate = (data: any) => {
    if (data.action === "MODIFY") {
      // 방 수정
    } else if (data.action === "DELETE") {
      // 방 삭제
    }
  };
  const handleLoungeUpdate = (data: any) => {
    if (data.action === "CREATE") {
      // 라운지 추가
    } else if (data.action === "MODIFY") {
      // 라운지 수정
    } else if (data.action === "DELETE") {
      // 라운지 삭제
    }
  };
  const handleChannelUpdate = (data: any) => {
    if (data.action === "CREATE") {
      // 채널 생성
    } else if (data.action === "MODIFY") {
      // 채널 수정
    } else if (data.action === "DELETE") {
      // 채널 삭제
    }
  };

  const moveChannel = (sessionId: string, sessionName: string) => {
    setIsLoading(true);
    leaveSession();
    setMySessionId(sessionId);
    setMySessionName(sessionName);
    joinSession();
  };

  const handleChangeUserName: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setMyUserName(e.target.value);
    }, []);

  const handleMainVideoStream = useCallback(
    (stream: any) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  const joinSession = useCallback(() => {
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
          await session.connect(token, { clientData: myUserName });

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
  }, [session, myUserName]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("");
    // setMyUserName("사용자 " + Math.floor(Math.random() * 100));
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
    } else {
    }
  }, [isMuted]);

  useEffect(() => {
    if (publisher) {
      publisher.publishVideo(!isVideoDisabled);
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
      const newChannel: Channel = {
        channelId: res,
        name: props,
      };
      setChannels((prev) => [...prev, newChannel]);
    } catch (e) {
      console.log(e);
    }
  };

  const removeChannel = async (id: number) => {
    setChannels((prev) =>
      prev.filter((channel: { channelId: number }) => channel.channelId !== id)
    );
    try {
      await deleteChannel({ channelId: id });
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
      const temp: Lounge = {
        loungeId: res,
        name: props,
      };
      setLounges((prev) => [...prev, temp]);
    } catch (e) {
      console.log(e);
    }
  };

  const removeLounge = (id: number) => {
    setLounges((prev) => prev.filter((lounge) => lounge.loungeId !== id));
  };

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
          <RoomTitle>싸피 10기</RoomTitle>
          <RoomNoticeButton onClick={toggleNotice}>
            <BellAlertIcon />
            {noticeClicked ? <RoomNotice></RoomNotice> : null}
          </RoomNoticeButton>
        </RoomTitleContainer>
        <RoomButtonContainer>
          <RoomButton
            onClick={() => {
              leaveSession();
              setIsJoined(false);
            }}
          >
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
                {lounges.map((c) => (
                  <ChannelButton
                    key={c.loungeId}
                    disabled={
                      isLoading || mySessionId === c.loungeId.toString()
                    }
                    id={c.loungeId.toString()}
                    name={c.name}
                    moveChannel={moveChannel}
                  />
                ))}
                <SideTitle>채널</SideTitle>
                {channels.map((c) => (
                  <ChannelButton
                    key={c.channelId}
                    disabled={
                      isLoading || mySessionId === c.channelId.toString()
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
          <ChannelContent>
            {session !== undefined && (
              <>
                <ChannelHeader>
                  <ChannelTitle>
                    <UserGroupIcon className="text-white w-8 h-8 mr-3" />
                    {mySessionName}
                  </ChannelTitle>
                  <ChannelHeaderButtonContainer>
                    <ChannelHeaderButton onClick={leaveSession}>
                      <XMarkIcon className="text-red-900 w-6 h-6" />
                    </ChannelHeaderButton>
                  </ChannelHeaderButtonContainer>
                </ChannelHeader>
                <Divider></Divider>
              </>
            )}
            <VideoContainer>
              {session !== undefined && (
                <ChatContainer>
                  <ChatNavbar>
                    <ChatNavButton
                      key={"chat"}
                      disabled={inChat === true}
                      onClick={() => setInChat(true)}
                    >
                      채팅
                    </ChatNavButton>
                    <ChatNavButton
                      key={"share-editor"}
                      disabled={inChat === false}
                      onClick={() => setInChat(false)}
                    >
                      공유코드
                    </ChatNavButton>
                  </ChatNavbar>
                  {inChat ? (
                    <Chat
                      channelId={mySessionId}
                      username={myUserName}
                      setMessage={setMessage}
                      message={message}
                    />
                  ) : (
                    <ShareEditor
                      session={session}
                      username={myUserName}
                      setMessage={setMessage}
                      setInChat={setInChat}
                      editorRef={editorRef}
                    />
                  )}
                </ChatContainer>
              )}
              {/* 클릭시 나오는 확대 영상 */}
              {/* {mainStreamManager !== undefined ? (
                    <div id="main-video" className="col-md-6">
                      <UserVideoComponent streamManager={mainStreamManager} />
                    </div>
                  ) : null} */}
              <GridContainer>
                {publisher !== undefined && (
                  <StreamContainer
                    key={publisher.id}
                    onClick={() => handleMainVideoStream(publisher)}
                  >
                    <UserVideoComponent
                      streamManager={publisher}
                      speaking={speakerIds.includes(
                        publisher.stream.connection.connectionId
                      )}
                    />
                  </StreamContainer>
                )}
                {subscribers.map((sub, i) => (
                  <StreamContainer
                    key={sub.id}
                    onClick={() => handleMainVideoStream(sub)}
                  >
                    <UserVideoComponent
                      streamManager={sub}
                      speaking={speakerIds.includes(
                        sub.stream.connection.connectionId
                      )}
                    />
                  </StreamContainer>
                ))}
              </GridContainer>
            </VideoContainer>
          </ChannelContent>
        </ChannelBorder>
      </RoomContent>
      {session !== undefined && (
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
`;
const ChannelContent = tw.div`
w-full
h-full
bg-[#282828]
rounded-md
flex
flex-col
self-end
`;

const ChannelHeader = tw.div`
w-full
h-16
flex
items-center
px-4
justify-between
`;

const ChannelTitle = tw.h1`
text-slate-100
text-xl
flex
items-end
`;

const Divider = tw.div`
h-[1px]
w-[95%]
bg-gradient-to-r
self-center
via-[#4b5082]
from-[#c5c7bd]
to-[#972da0]
`;

const ChannelHeaderButtonContainer = tw.div`
`;

const ChannelHeaderButton = tw.div`
w-7
h-7
flex
justify-center
items-center
bg-red-100
rounded-full
cursor-pointer
`;

const VideoContainer = tw.div`
w-full
h-full
flex
flex-row-reverse
`;

const GridContainer = tw.div`
text-white
grid
grid-cols-3
gap-4
p-6
`;

const StreamContainer = tw.div`
flex
justify-center
items-center
`;

const ChatContainer = tw.div`
w-0
xl:min-w-96
h-full
rounded-lg
text-white
flex
flex-col
justify-between
items-center
bg-[#333333]
overflow-hidden
`;

const ChatNavbar = tw.div`
w-full
h-10
min-h-10
bg-gray-900
`;

const ChatNavButton = tw.button`
w-1/2
h-full
bg-slate-50/5
text-slate-500
disabled:bg-transparent
disabled:text-slate-200
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
