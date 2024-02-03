import { UserGroupIcon } from "@heroicons/react/24/solid";
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
  return (
    <ChannelButtonContainer>
      <IconButton
        disabled={disabled}
        onClick={() => {
          moveChannel(id, name);
        }}
      >
        <UserGroupIcon className="text-white w-8 h-8" />
      </IconButton>
      <ChannelButtonTitle>{name}</ChannelButtonTitle>
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

`;

const ChannelButtonContainer = tw.div`
flex
flex-col
items-center
`;

const ChannelButtonTitle = tw.h1`
text-sm
text-slate-200
`;
