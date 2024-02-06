import { UserGroupIcon } from "@heroicons/react/24/solid";
import tw from "tailwind-styled-components";

interface IProps {
  id: string;
  name: string;
  active: boolean;
  disabled: boolean;
  moveChannel: (channelId: string, channelName: string) => void;
}

export default function ChannelButton({ id, name, active, disabled, moveChannel }: IProps) {
  return (
    <ChannelButtonContainer>
      <IconButton
        $active={active}
        disabled={disabled}
        onClick={() => {
          moveChannel(id, name);
        }}
      >
        <UserGroupIcon className="text-white w-8 h-8" />
        <ChannelButtonTitle>{name}</ChannelButtonTitle>
      </IconButton>
    </ChannelButtonContainer>
  );
}

const IconButton = tw.button<{ $active: boolean }>`
w-10
h-10
flex
justify-center
items-center
${(p) => (p.$active ? "bg-purple-600" : "bg-slate-800")}
rounded-full
text-3xl
cursor-pointer
disabled:cursor-default
relative
z-20
`;

const ChannelButtonContainer = tw.div`
group
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
hidden
group-hover:block
`;
