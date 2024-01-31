import { OpenVidu, Session, Subscriber, Publisher, Device } from "openvidu-browser";

import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "./room/UserVideoComponent";
import tw from "tailwind-styled-components";
import Chat from "./room/Chat";

import {
  UserGroupIcon,
  XMarkIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
  VideoCameraSlashIcon,
  VideoCameraIcon,
  SignalIcon,
  SignalSlashIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

const APPLICATION_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;

export default function Channel() {
  //const [isJoined, setIsJoined] = useState(false);

  const [mySessionId, setMySessionId] = useState<number>(-1);
  const [myUserName, setMyUserName] = useState(`사용자 ${Math.floor(Math.random() * 100)}`);
  const [session, setSession] = useState<Session | null>(null);
  const [mainStreamManager, setMainStreamManager] = useState<Publisher | Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[] | never[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isVideoDisabled, setIsVideoDisabled] = useState(true);
  const [isScreenShared, setIsScreenShared] = useState(false);

  const OV = useRef(new OpenVidu());

  const moveChannel = (sessionId: number) => {
    leaveSession();
    setMySessionId(sessionId);
    joinSession();
  };

  // const handleChangeSessionId = useCallback((e) => {
  //   setMySessionId(e.target.value);
  // }, []);

  const handleChangeUserName = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setMyUserName(e.target.value);
    },
    []
  );

  const handleMainVideoStream = useCallback(
    (stream: Publisher | Subscriber) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers: Subscriber[]) => [...subscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
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
            mirror: false,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter((device) => device.kind === "videoinput");
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice: any = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } catch (error: any) {
          console.log("There was an error connecting to the session:", error.code, error.message);
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
    setSession(null);
    setSubscribers([]);
    setMySessionId(0);
    // setMyUserName("사용자 " + Math.floor(Math.random() * 100));
    setMainStreamManager(null);
    setPublisher(null);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice?.deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (session) {
            await session.unpublish(publisher!);
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

  const deleteSubscriber = useCallback((streamManager: any) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager as never);
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
    const handleBeforeUnload = () => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const getToken = useCallback(async () => {
    const mySessionIdString = mySessionId.toString();
    return createSession(mySessionIdString).then((sessionId) => createToken(sessionId));
  }, [mySessionId]);

  const createSession = async (sessionId: string) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId: string) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
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
    if (isScreenShared) {
      startScreenShare();
    } else {
      stopScreenShare();
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
      await session.unpublish(publisher!);
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
      mirror: false,
    });

    if (session) {
      await session.unpublish(publisher!);
      await session.publish(publisher);
      setMainStreamManager(publisher);
      setPublisher(publisher);
    }
  };

  return (
    <RoomContainer>
      <RoomHeader>
        <RoomTitleImg
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/736x/52/8a/4f/528a4f1570bf735b7a772d17562723f1.jpg)",
          }}
        />
        <RoomTitle>싸피 10기(제목)</RoomTitle>
      </RoomHeader>

      <RoomContent>
        <RoomSidebar>
          <button className="self-end">
            <ChevronDoubleRightIcon className="text-white w-6 h-6 mr-3" />
          </button>
          <ChannelButtonContainer>
            <ChannelButton
              onClick={() => {
                moveChannel(111);
              }}
            >
              <UserGroup className="w-6 h-6" />
            </ChannelButton>
            <ChannelButtonTitle>채널 1</ChannelButtonTitle>
          </ChannelButtonContainer>
          <ChannelButtonContainer>
            <ChannelButton
              onClick={() => {
                moveChannel(222);
              }}
            >
              <UserGroup />
            </ChannelButton>
            <ChannelButtonTitle>채널 2</ChannelButtonTitle>
          </ChannelButtonContainer>
          <ChannelButtonContainer>
            <ChannelButton
              onClick={() => {
                moveChannel(333);
              }}
            >
              <UserGroup />
            </ChannelButton>
            <ChannelButtonTitle>채널 3</ChannelButtonTitle>
          </ChannelButtonContainer>
        </RoomSidebar>

        <ChannelContent>
          {session !== undefined && (
            <ChannelHeader>
              <ChannelTitle>
                <UserGroup />
                {mySessionId}
              </ChannelTitle>
              <ChannelHeaderButtonContainer>
                <ChannelHeaderButton onClick={leaveSession}>
                  <XMarkIcon className="text-gray-300 w-6 h-6" />
                </ChannelHeaderButton>
              </ChannelHeaderButtonContainer>
            </ChannelHeader>
          )}
          <VideoContainer>
            {/* {session !== undefined && (
              <Chat chatId={mySessionId} username={myUserName} />
            )} */}

            {/* {mainStreamManager !== undefined ? (
                  <div id="main-video" className="col-md-6">
                    <UserVideoComponent streamManager={mainStreamManager} />
                  </div>
                ) : null} */}
            <GridContainer>
              {publisher !== null && (
                <StreamContainer onClick={() => handleMainVideoStream(publisher)}>
                  <UserVideoComponent streamManager={publisher} />
                </StreamContainer>
              )}
              {subscribers.map((sub, i) => (
                <StreamContainer key={sub.id} onClick={() => handleMainVideoStream(sub)}>
                  <UserVideoComponent streamManager={sub} />
                </StreamContainer>
              ))}
            </GridContainer>
          </VideoContainer>
        </ChannelContent>
      </RoomContent>

      {/* 옵션 컨트롤러 */}
      {session !== undefined && (
        <ControlPanel>
          <ControlPanelButton onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? (
              <SpeakerXMarkIcon className="w-8 h-8 text-red-400" />
            ) : (
              <SpeakerWaveIcon className="w-8 h-8" />
            )}
          </ControlPanelButton>
          <ControlPanelButton onClick={() => setIsVideoDisabled(!isVideoDisabled)}>
            {isVideoDisabled ? (
              <VideoCameraSlashIcon className="w-8 h-8 text-red-400" />
            ) : (
              <VideoCameraIcon className="w-8 h-8" />
            )}
          </ControlPanelButton>
          <ControlPanelButton onClick={() => setIsScreenShared(!isScreenShared)}>
            {isScreenShared ? (
              <SignalIcon className="w-8 h-8" />
            ) : (
              <SignalSlashIcon className="w-8 h-8 text-red-400" />
            )}
          </ControlPanelButton>
        </ControlPanel>
      )}
    </RoomContainer>
  );
}

const RoomContainer = tw.div`
w-full
h-full
flex
flex-col
relative
bg-[#3b3b3b]
pb-3
pr-3
text-[#EFF0FF]
`;

const RoomHeader = tw.div`
m-3
ml-6
flex
items-end
gap-3
`;

const RoomTitleContainer = tw.div`
flex
items-center
space-x-6
`;

const RoomTitleImg = tw.div`
w-10
h-10
bg-slate-500
rounded-full
bg-contain
bg-no-repeat
bg-center
shadow-md
`;

const RoomTitle = tw.h1`
font-medium
text-2xl
text-slate-100
`;

const RoomContent = tw.div`
w-full
h-full
flex
`;

const RoomSidebar = tw.div`
w-[5%]
h-full
pt-3
space-y-6
flex
flex-col
items-center
`;

const UserGroup = tw(UserGroupIcon)`
text-white
w-6
h-6
`;

const ChannelButton = tw.a`
w-10
h-10
flex
justify-center
items-center
bg-slate-800
rounded-full
cursor-pointer
`;

const ChannelButtonContainer = tw.div`
flex
flex-col
items-center
`;

const ChannelButtonTitle = tw.h1`
text-gray-200
text-sm
`;

const ChannelContent = tw.div`
w-[95%]
h-full
bg-gradient-to-r
from-[#050110]
to-[#0E032C]
rounded-xl
flex
flex-col
self-end
`;

const ChannelHeader = tw.div`
p-2
flex
items-center
mx-3
justify-between
`;

const ChannelTitle = tw.h1`
text-slate-100
text-2xl
flex
items-center

`;

const ChannelHeaderButtonContainer = tw.div`
`;

const ChannelHeaderButton = tw.div`
w-6
h-6
flex
justify-center
items-center
text-white
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
gap-1
px-6
`;

const StreamContainer = tw.div`
flex
justify-center
items-center
`;

const ControlPanel = tw.div`
w-80
h-16
bottom-10
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

const ControlPanelButton = tw.button`
w-10
text-slate-100
cursor-pointer
flex
justify-center
items-center
`;
