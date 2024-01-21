import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import tw from "tailwind-styled-components";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

export default function App() {
  const [isJoined, setIsJoined] = useState(false);

  const [mySessionId, setMySessionId] = useState("");
  const [myUserName, setMyUserName] = useState(
    `사용자 ${Math.floor(Math.random() * 100)}`
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  const OV = useRef(new OpenVidu());

  const moveChannel = (sessionId) => {
    leaveSession();
    setMySessionId(sessionId);
    joinSession();
  };

  const handleChangeSessionId = useCallback((e) => {
    setMySessionId(e.target.value);
  }, []);

  const handleChangeUserName = useCallback((e) => {
    setMyUserName(e.target.value);
  }, []);

  const handleMainVideoStream = useCallback(
    (stream) => {
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
      setSubscribers((subscribers) => [...subscribers, subscriber]);
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
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

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
        } catch (error) {
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
    setMyUserName("사용자 " + Math.floor(Math.random() * 100));
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
            publishAudio: true,
            publishVideo: true,
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

  const deleteSubscriber = useCallback((streamManager) => {
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
    const handleBeforeUnload = (event) => {
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

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  return (
    <Container>
      {isJoined === false ? (
        <JoinContainer>
          <JoinForm
            onSubmit={() => {
              setIsJoined(true);
            }}
          >
            <UsernameInput
              type="text"
              id="userName"
              value={myUserName}
              onChange={handleChangeUserName}
              required
            />
            <JoinBtn name="commit" type="submit" value="입장" />
          </JoinForm>
        </JoinContainer>
      ) : null}

      {isJoined === true ? (
        <RoomContainer>
          <RoomHeader>
            <RoomTitleContainer>
              <RoomTitleImg
                style={{
                  backgroundImage:
                    "url(https://i.pinimg.com/736x/52/8a/4f/528a4f1570bf735b7a772d17562723f1.jpg)",
                }}
              />
              <RoomTitle>싸피 10기</RoomTitle>
            </RoomTitleContainer>
            <RoomButtonContainer>
              <RoomButton
                type="button"
                onClick={() => {
                  leaveSession();
                  setIsJoined(false);
                }}
                value="나가기"
              />
              <RoomButtonContainer
                type="button"
                onClick={switchCamera}
                value="캠전환"
              />
            </RoomButtonContainer>
          </RoomHeader>
          <RoomContent>
            <RoomSidebar>
              <ChannelButtonContainer>
                <ChannelButton
                  onClick={() => {
                    moveChannel("channel1");
                  }}
                >
                  🧑🏻‍💻
                </ChannelButton>
                <ChannelButtonTitle>채널 1</ChannelButtonTitle>
              </ChannelButtonContainer>
              <ChannelButtonContainer>
                <ChannelButton
                  onClick={() => {
                    moveChannel("channel2");
                  }}
                >
                  🧑🏻‍💻
                </ChannelButton>
                <ChannelButtonTitle>채널 2</ChannelButtonTitle>
              </ChannelButtonContainer>
              <ChannelButtonContainer>
                <ChannelButton
                  onClick={() => {
                    moveChannel("channel3");
                  }}
                >
                  🧑🏻‍💻
                </ChannelButton>
                <ChannelButtonTitle>채널 3</ChannelButtonTitle>
              </ChannelButtonContainer>
            </RoomSidebar>
            <ChannelContent>
              {session !== undefined && (
                <ChannelHeader>
                  <ChannelTitle>🧑🏻‍💻 {mySessionId}</ChannelTitle>
                  <ChannelHeaderButtonContainer>
                    <ChannelHeaderButton onClick={leaveSession}>
                      ✕
                    </ChannelHeaderButton>
                  </ChannelHeaderButtonContainer>
                </ChannelHeader>
              )}
              <VideoContainer>
                {session !== undefined && <ChatContainer>채팅</ChatContainer>}
                {/* 클릭시 나오는 확대 영상 */}
                {/* {mainStreamManager !== undefined ? (
                  <div id="main-video" className="col-md-6">
                    <UserVideoComponent streamManager={mainStreamManager} />
                  </div>
                ) : null} */}
                <GridContainer>
                  {publisher !== undefined ? (
                    <StreamContainer
                      onClick={() => handleMainVideoStream(publisher)}
                    >
                      <UserVideoComponent streamManager={publisher} />
                    </StreamContainer>
                  ) : null}
                  {subscribers.map((sub, i) => (
                    <StreamContainer
                      key={sub.id}
                      onClick={() => handleMainVideoStream(sub)}
                    >
                      <UserVideoComponent streamManager={sub} />
                    </StreamContainer>
                  ))}
                </GridContainer>
              </VideoContainer>
            </ChannelContent>
          </RoomContent>
        </RoomContainer>
      ) : null}
    </Container>
  );
}

const Container = tw.div`
w-screen
h-screen
bg-slate-400
realtive
overflow-hidden
`;

const JoinContainer = tw.div`
absolute
w-96
h-44
left-1/2
top-1/2
-translate-x-1/2
-translate-y-2/3
bg-slate-300
rounded-lg
shadow-md
flex
justify-center
items-center
`;

const JoinForm = tw.form`
flex
flex-col
space-y-3
`;

const UsernameInput = tw.input`
w-60
h-10
rounded-sm
p-3
shadow-sm
`;

const JoinBtn = tw.input`
w-60
h-8
rounded-sm
bg-slate-200
`;

const RoomContainer = tw.div`
w-screen
h-screen
flex
flex-col
bg-[#3b3b3b]
`;

const RoomHeader = tw.div`
w-full
h-24
px-10
flex
justify-between
items-center
`;

const RoomTitleContainer = tw.div`
flex
items-center
space-x-6
`;

const RoomTitleImg = tw.div`
w-12
h-12
bg-slate-500
rounded-full
bg-contain
bg-no-repeat
bg-center
shadow-md
`;

const RoomTitle = tw.h1`
font-medium
text-3xl
text-slate-100
`;

const RoomButtonContainer = tw.div`
h-full
flex
items-center
space-x-5
`;

const RoomButton = tw.input`
cursor-pointer
text-slate-200
w-20
h-10
font-medium
text-lg
`;

const RoomContent = tw.div`
w-auto
h-auto
flex
flex-grow-[1]
p-4
`;

const RoomSidebar = tw.div`
w-32
h-full
space-y-6
flex
flex-col
items-center
p-10
`;

const ChannelButton = tw.a`
w-14
h-14
flex
justify-center
items-center
bg-slate-800
rounded-full
text-3xl
cursor-pointer
`;

const ChannelButtonContainer = tw.div`
flex
flex-col
items-center
`;

const ChannelButtonTitle = tw.h1`
text-slate-200
text-sm
`;

const ChannelContent = tw.div`
w-full
h-full
bg-[#282828]
rounded-3xl
p-3
flex
flex-col
self-end
`;

const ChannelHeader = tw.div`
w-full
h-16
border-b-2
border-gray-900
flex
items-center
px-4
justify-between
`;

const ChannelTitle = tw.h1`
text-slate-100
text-2xl
`;

const ChannelHeaderButtonContainer = tw.div`
`;

const ChannelHeaderButton = tw.div`
w-8
h-8
flex
justify-center
items-center
text-white
rounded-full
bg-red-500
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
rounded-md
text-white
flex
justify-center
items-center
bg-[#333333]
`;
