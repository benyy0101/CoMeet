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
        <TitleCotainer>
          <Title>{name}</Title>
        </TitleCotainer>
      </IconButton>
    </ChannelButtonContainer>
  );
}

const IconButton = tw.button<{ $active: boolean }>`
w-11
h-12
flex
justify-center
items-center
${(p) => (p.$active ? "bg-purple-600" : "bg-slate-800")}
rounded-full
text-3xl
cursor-pointer
disabled:cursor-default
z-20

`;

const ChannelButtonContainer = tw.div`
flex
items-center
group
pr-40
-mr-40
`;

const TitleCotainer = tw.div`
absolute
left-24
z-10
h-10
bg-[#170f2a]
p-2
rounded-md
border
border-[#d9e5db]
hidden
group-hover:block
`;

const Title = tw.h1`
text-sm
text-slate-200
whitespace-nowrap
`;
