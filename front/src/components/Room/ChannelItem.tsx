import React from "react";
import tw from "tailwind-styled-components";
interface IChannel {
  id: number;
  roomId: number;
  name: string;
}
interface IChannelItem {
  name: string;
  idx: number;
  removeChannel: (id: number) => void;
}

function ChannelItem(props: IChannelItem) {
  const { name, idx, removeChannel } = props;
  const removeHandler = () => {
    removeChannel(idx);
  };
  return (
    <Wrapper>
      <LeftContainer>
        <Thumbnail />
        <Title>{name}</Title>
      </LeftContainer>
      <RightContainer>
        <Destroy onClick={removeHandler}>채널 삭제</Destroy>
      </RightContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
    bg-slate-500
    w-96
    h-full
    p-4
    rounded-md
    flex
    justify-between
`;

const LeftContainer = tw.div`
    flex
    gap-4
`;

const Thumbnail = tw.div`
    w-8
    h-8
    bg-gray-300
    rounded-full
`;

const Title = tw.div`
    flex
    items-center
    gap-1
`;

const RightContainer = tw.div`
    flex
    gap-4
`;

const Destroy = tw.button`
  bg-red-600
  rounded-md
  p-2
`;

export default ChannelItem;
