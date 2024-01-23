import React, { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { StreamManager } from "openvidu-browser";

export default function OpenViduVideoComponent({
  streamManager,
}: {
  streamManager: StreamManager;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (streamManager && !!videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <StreamVideo autoPlay={true} ref={videoRef} />;
}

const StreamVideo = tw.video`
w-78
`;
