import React, { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

interface IProps {
  streamManager: any;
}

export default function OpenViduVideoComponent({ streamManager }: IProps) {
  const videoRef = useRef(null);

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
