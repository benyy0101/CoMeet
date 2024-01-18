//여기에 openvidu를 통해서 영상을 띄우는 컴포넌트를 만들어야함
//일단 더미데이터로 만들어놓고 나중에 수정하자

import React from "react";
import tw from "tailwind-styled-components";

const Wrapper = tw.section`
    h-screen
    flex
    flex-col
    justify-center
    items-center
    gap-5
`;

const ImageContainer = tw.div`
    flex
    gap-2
    items-center
`;

function ConditionBox() {
  const [video, setVideo] = React.useState<boolean>(true);
  const [screen, setScreen] = React.useState<boolean>(true);
  const [audio, setAudio] = React.useState<number>(50);
  const [isMute, setIsMute] = React.useState<boolean>(false);
  const [lastAudio, setLastAudio] = React.useState<number>(0);

  const videoHandler = () => {
    setVideo(!video);
  };
  const screenHandler = () => {
    setScreen(!screen);
  };
  const audioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAudio(Number(event.target.value));
    if (audio === 0) {
      setIsMute(true);
      console.log(isMute);
    } else setIsMute(false);
  };

  const muteHandler = () => {
    setIsMute(!isMute);
    if (isMute) {
      setLastAudio(audio);
      setAudio(0);
    } else {
      setAudio(lastAudio);
    }
  };
  return (
    <Wrapper>
      <h1>입장하기전에 상태를 확인해 주세요</h1>
      <div>
        <img src="https://picsum.photos/400/300?blur=2" alt="your face" />
      </div>
      <section>
        <ImageContainer>
          <button onClick={screenHandler}>
            {screen ? (
              <img src="../assets/img/video.png" alt="screen" />
            ) : (
              <img src="../assets/img/no-video.png" alt="no-screen" />
            )}
          </button>
          <button onClick={videoHandler}>
            {video ? (
              <img src="../assets/img/video.png" alt="video" />
            ) : (
              <img src="../assets/img/no-video.png" alt="no-video" />
            )}
          </button>
          <button onClick={muteHandler}>
            {isMute ? (
              <img src="../assets/img/no-audio.png" alt="mute" />
            ) : (
              <img src="../assets/img/audio.png" alt="audio" />
            )}
          </button>

          <input
            type="range"
            onChange={audioHandler}
            min="0"
            max="100"
            value={audio}
          />
          {audio}
        </ImageContainer>
      </section>

      <button>입장하기</button>
    </Wrapper>
  );
}

export default ConditionBox;
