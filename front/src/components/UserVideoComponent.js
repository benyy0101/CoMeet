import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import tw from "tailwind-styled-components";

export default function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <UserVideoContainer>
      {streamManager !== undefined ? (
        <StreamContainer>
          <OpenViduVideoComponent streamManager={streamManager} />
          <NickNameTagContainer>
            <NicknameTag>{getNicknameTag()}</NicknameTag>
          </NickNameTagContainer>
        </StreamContainer>
      ) : null}
    </UserVideoContainer>
  );
}

const UserVideoContainer = tw.div`
rounded-lg
overflow-hidden
shadow-2xl
`;

const StreamContainer = tw.div`
relative
`;

const NickNameTagContainer = tw.div`
absolute
left-4
top-2
py-1
px-4
rounded-xl
bg-green-500
`;

const NicknameTag = tw.p`
text-slate-100
`;
