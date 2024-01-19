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
  });
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession);
    return () => {
      window.removeEventListener("beforeunload", leaveSession);
    };
  }, []);

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
    setSubscribers((prev) => prev.filter((sub) => sub.id !== streamManager.id));
  };

  const joinSession = async () => {
    const newOv = await new OpenVidu();
    const mySession = await newOv.initSession();
    setOv(newOv);

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prev) => [...prev, subscriber]);
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
    setSubscribers([]);
    setRtcState({
      session: undefined,
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  };

  const switchCamera = async () => {
    try {
      const devices = await ov.getDevices();
      let videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        let newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== rtcState.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          let newPublisher = ov.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          await rtcState.session.unpublish(rtcState.mainStreamManager);

          await rtcState.session.publish(newPublisher);

          setRtcState((prev) => ({
            ...prev,
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

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

  console.log(subscribers);

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
          <div id="session-header">
            <h1 id="session-title">{rtcState.mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(300px, auto)" }}>
            {rtcState.publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                style={{ width: "300px" }}
                onClick={() => handleMainVideoStream(rtcState.publisher)}
              >
                <UserVideoComponent streamManager={rtcState.publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={sub.id}
                className="stream-container col-md-6 col-xs-6"
                style={{ width: "300px" }}
                onClick={() => {
                  handleMainVideoStream(sub);
                }}
              >
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
