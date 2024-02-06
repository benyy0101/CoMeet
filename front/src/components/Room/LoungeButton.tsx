import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { ILounge } from "models/Lounge.interface";
import tw from "tailwind-styled-components";

interface IProps {
  lounge: ILounge;
  active: boolean;
  disabled: boolean;
  moveLounge: (lounge: ILounge) => void;
}

export default function LoungeButton({ lounge, active, disabled, moveLounge }: IProps) {
  return (
    <LoungeButtonContainer>
      <IconButton
        $active={active}
        disabled={disabled}
        onClick={() => {
          moveLounge(lounge);
        }}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="text-white w-8 h-8" />
        <LoungeButtonTitle>{lounge.name}</LoungeButtonTitle>
      </IconButton>
    </LoungeButtonContainer>
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

const LoungeButtonContainer = tw.div`
flex
flex-col
items-center
group
`;

const LoungeButtonTitle = tw.h1`
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
