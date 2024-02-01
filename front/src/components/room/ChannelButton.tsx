import { UserGroupIcon } from "@heroicons/react/24/solid";
import tw from "tailwind-styled-components";

interface IProps {
  id: string;
  name: string;
  moveChannel: (channelId: string) => void;
}

export default function ChannelButton({ id, name, moveChannel }: IProps) {
  return (
    <ChannelButtonContainer>
      <IconButton
        onClick={() => {
          moveChannel(id);
        }}
      >
        <UserGroupIcon className="text-white w-8 h-8" />
      </IconButton>
      <ChannelButtonTitle>{name}</ChannelButtonTitle>
    </ChannelButtonContainer>
  );
}

const IconButton = tw.a`
w-14
h-14
flex
justify-center
items-center
bg-slate-800
rounded-full
text-3xl
cursor-pointer
`;

const ChannelButtonContainer = tw.div`
flex
flex-col
items-center
`;

const ChannelButtonTitle = tw.h1`
text-slate-200
text-sm
`;
