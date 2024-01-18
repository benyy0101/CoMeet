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
`;

function ConditionBox() {
    const [video, setVideo] = React.useState<boolean>(true);
    const [screen, setScreen] = React.useState<boolean>(true);
    const [audio, setAudio] = React.useState<boolean>(true);

    const videoHandler = () => {
        setVideo(!video);
    };
    const screenHandler = () => {
        setScreen(!screen);
    }
    const audioHandler = () => {
        setAudio(!audio);
    }
  return (
    <Wrapper>
      <h1>입장하기전에 상태를 확인해 주세요</h1>
      <div>
        <img src="https://picsum.photos/400/300?blur=2" alt="your face" />
      </div>
      <div>
        
      </div>
      <button>입장하기</button>
    </Wrapper>
  );
}

export default ConditionBox;
