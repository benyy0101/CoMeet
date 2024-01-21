import React, { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef(React.createRef());

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <StreamVideo autoPlay={true} ref={videoRef} />;
}

const StreamVideo = tw.video`
w-78
`;
