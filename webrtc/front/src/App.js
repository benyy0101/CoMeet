import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { useState, useEffect } from "react";
import UserVideoComponent from "./UserVideoComponent";

const APPLICATION_SERVER_URL = "http://localhost:5000/";

function App() {
  const [ov, setOv] = useState(null);
  const [rtcState, setRtcState] = useState({
    mySessionId: "SessionA",
    myUserName: "Participant" + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    publisher: undefined,
    subscribers: [],
  });

  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  const onbeforeunload = (event) => {
    leaveSession();
  };

  const handleChangeSessionId = (e) => {
    setRtcState((prev) => ({
      ...prev,
      mySessionId: e.target.value,
    }));
  };

  const handleChangeUserName = (e) => {
    setRtcState((prev) => ({
      ...prev,
      myUserName: e.target.value,
    }));
  };

  const handleMainVideoStream = (stream) => {
    if (rtcState.mainStreamManager !== stream) {
      setRtcState((prev) => ({
        ...prev,
        mainStreamManager: stream,
      }));
    }
  };

  const deleteSubscriber = (streamManager) => {
    let subscribers = rtcState.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setRtcState((prev) => ({
        ...prev,
        subscribers,
      }));
    }
  };

  const joinSession = async () => {
    const newOv = await new OpenVidu();
    console.log(newOv);
    setOv(newOv);
    const mySession = await newOv.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      let subscribers = rtcState.subscribers;
      subscribers.push(subscriber);
      setRtcState((prev) => ({
        ...prev,
        subscribers,
      }));
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    getToken()
      .then((token) => {
        mySession.connect(token, { clientData: rtcState.myUserName }).then(async () => {
          let publisher = await newOv.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "640x480", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          mySession.publish(publisher);

          let devices = await newOv.getDevices();
          let videoDevices = devices.filter((device) => device.kind === "videoinput");
          let currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          let currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          setRtcState((prev) => ({
            ...prev,
            currentVideoDevice: currentVideoDevice,
            mainStreamManager: publisher,
            publisher,
          }));
        });
      })
      .catch((error) => {
        console.log("There was an error connecting to the session:", error.code, error.message);
      });
    setRtcState((prev) => {
      return {
        ...prev,
        session: mySession,
      };
    });
  };

  const leaveSession = () => {
    const mySession = rtcState.session;

    if (mySession) {
      mySession.disconnect();
    }

    setOv(null);
    setRtcState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  };

  // const switchCamera = async () => {
  //   try {
  //     const devices = await ov.getDevices();
  //     let videoDevices = devices.filter((device) => device.kind === "videoinput");

  //     if (videoDevices && videoDevices.length > 1) {
  //       let newVideoDevice = videoDevices.filter(
  //         (device) => device.deviceId !== rtcState.currentVideoDevice.deviceId
  //       );

  //       if (newVideoDevice.length > 0) {
  //         let newPublisher = ov.initPublisher(undefined, {
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           mirror: true,
  //         });

  //         await rtcState.session.unpublish(rtcState.mainStreamManager);

  //         await rtcState.session.publish(newPublisher);

  //         setRtcState((prev) => ({
  //           ...prev,
  //           currentVideoDevice: newVideoDevice[0],
  //           mainStreamManager: newPublisher,
  //           publisher: newPublisher,
  //         }));
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const getToken = async () => {
    const sessionId = await createSession(rtcState.mySessionId);
    return await createToken(sessionId);
  };

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
  console.log(rtcState);
  return (
    <div className="App">
      {rtcState.session === undefined && (
        <div>
          <form className="form-group" onSubmit={joinSession}>
            <p>
              <label>Participant: </label>
              <input
                className="form-control"
                type="text"
                id="userName"
                value={rtcState.myUserName}
                onChange={handleChangeUserName}
                required
              />
            </p>
            <p>
              <label> Session: </label>
              <input
                className="form-control"
                type="text"
                id="sessionId"
                value={rtcState.mySessionId}
                onChange={handleChangeSessionId}
                required
              />
            </p>
            <p className="text-center">
              <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
            </p>
          </form>
        </div>
      )}
      <h1>webrtc</h1>
      {rtcState.session && (
        <div>
          {rtcState.publisher !== undefined ? (
            <div
              className="stream-container col-md-6 col-xs-6"
              onClick={() => handleMainVideoStream(rtcState.publisher)}
            >
              <UserVideoComponent streamManager={rtcState.publisher} />
            </div>
          ) : null}
          {rtcState.subscribers.map((sub, i) => (
            <div
              key={sub.id}
              className="stream-container col-md-6 col-xs-6"
              onClick={() => {
                handleMainVideoStream(sub);
              }}
            >
              <span>{sub.id}</span>
              <UserVideoComponent streamManager={sub} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
