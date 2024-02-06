import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { ILounge } from "models/Lounge.interface";
import { useState } from "react";
import tw from "tailwind-styled-components";

interface IProps {
  lounge: ILounge;
  disabled: boolean;
  moveLounge: (lounge: ILounge) => void;
}

export default function LoungeButton({ lounge, disabled, moveLounge }: IProps) {
  const [isIn, setIsIn] = useState<boolean>(false);
  const isInHandler = () => {
    setIsIn(!isIn);
  };
  return (
    <LoungeButtonContainer>
      <IconButton
        disabled={disabled}
        onClick={() => {
          moveLounge(lounge);
        }}
        onMouseEnter={isInHandler}
        onMouseLeave={isInHandler}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="text-white w-8 h-8" />
        {isIn ? <LoungeButtonTitle>{lounge.name}</LoungeButtonTitle> : null}
      </IconButton>
    </LoungeButtonContainer>
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

const LoungeButtonContainer = tw.div`
flex
flex-col
items-center
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
`;
