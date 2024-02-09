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
      </IconButton>
      <TitleCotainer>
        <Title>{lounge.name}</Title>
      </TitleCotainer>
    </LoungeButtonContainer>
  );
}

const IconButton = tw.button<{ $active: boolean }>`
w-12
h-12
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
