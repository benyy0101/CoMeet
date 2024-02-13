import OpenViduVideoComponent from "./OvVideo";
import tw from "tailwind-styled-components";

interface IProps {
  streamManager: any;
  speaking: boolean;
  isMain: boolean;
}

export default function UserVideoComponent({
  streamManager,
  speaking,
  isMain,
}: IProps) {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    if (streamManager?.stream?.connection?.data) {
      return JSON.parse(streamManager.stream.connection.data).clientData;
    }
  };

  return (
    <UserVideoContainer $speaking={speaking} $isMain={isMain}>
      {streamManager !== undefined ? (
        <StreamContainer $isMain={isMain}>
          <OpenViduVideoComponent
            streamManager={streamManager}
            isMain={isMain}
          />
          <NickNameTagContainer>
            <NicknameTag>{getNicknameTag()}</NicknameTag>
          </NickNameTagContainer>
        </StreamContainer>
      ) : null}
    </UserVideoContainer>
  );
}

const UserVideoContainer = tw.div<{ $speaking: boolean; $isMain: boolean }>`
rounded-lg
overflow-hidden
shadow-2xl
box-content
relative
${(p) => (p.$speaking ? "border-2 border-green-400" : "")}
${(p) => (p.$isMain ? "h-full max-h-full" : "aspect-4/3 bg-black flex items-center")}
`;

const StreamContainer = tw.div<{ $isMain: boolean }>`
bg-black
${(p) => (p.$isMain ? "h-full max-h-full flex flex-col items-center justify-center overflow-hidden" : "")}
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
