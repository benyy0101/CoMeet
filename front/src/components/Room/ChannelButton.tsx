import { UserGroupIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import tw from "tailwind-styled-components";

interface IProps {
  id: string;
  name: string;
  disabled: boolean;
  moveChannel: (channelId: string, channelName: string) => void;
}

export default function ChannelButton({
  id,
  name,
  disabled,
  moveChannel,
}: IProps) {
  const [isIn, setIsIn] = useState<boolean>(false);
  const isInHandler = () => {
    setIsIn(!isIn);
    console.log("isIn!!!!");
  };
  return (
    <ChannelButtonContainer>
      <IconButton
        disabled={disabled}
        onClick={() => {
          moveChannel(id, name);
        }}
        onMouseEnter={isInHandler}
        onMouseLeave={isInHandler}
      >
        <UserGroupIcon className="text-white w-8 h-8" />
        {isIn ? <ChannelButtonTitle>{name}</ChannelButtonTitle> : null}
      </IconButton>
    </ChannelButtonContainer>
  );
}

const IconButton = tw.button`
w-10
h-10
flex
justify-center
items-center
bg-slate-800
disabled:bg-slate-500
rounded-full
text-3xl
cursor-pointer
disabled:cursor-default
relative
z-20
`;

const ChannelButtonContainer = tw.div`
flex
flex-col
items-center
`;

const ChannelButtonTitle = tw.h1`
absolute
left-12
text-sm
min-w-16
z-10
h-10
text-slate-200
bg-[#170f2a]
py-2
rounded-md
border
border-[#d9e5db]
`;
