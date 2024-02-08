import React, { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

interface IProps {
  streamManager: any;
  isMain: boolean;
}

export default function OpenViduVideoComponent({ streamManager, isMain }: IProps) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <StreamVideo $isMain={isMain} autoPlay={true} ref={videoRef} />;
}

const StreamVideo = tw.video<{ $isMain: boolean }>`
${(p) => (p.$isMain ? "h-full object-contain" : "w-78")}
`;
