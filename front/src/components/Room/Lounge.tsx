import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from "@heroicons/react/24/solid";

import tw from "tailwind-styled-components";
import Chat from "./Chat";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ILounge } from "models/Lounge.interface";

interface IProps {
  lounge: ILounge;
}

export default function Lounge({ lounge }: IProps) {
  const [message, setMessage] = useState<string>("");

  return (
    <ChannelContent>
      <ChannelHeader>
        <ChannelTitle>
          <ChatBubbleOvalLeftEllipsisIcon className="text-white w-8 h-8 mr-3" />
          {lounge.name}
        </ChannelTitle>
      </ChannelHeader>
      <Divider></Divider>
      <ChatContainer>
        <Chat
          chatDomain={"lounge"}
          id={lounge.loungeId.toString()}
          setMessage={setMessage}
          message={message}
        />
      </ChatContainer>
    </ChannelContent>
  );
}

const ChannelContent = tw.div`
w-full
h-full
bg-[#282828]
rounded-md
flex
flex-col
self-end
`;

const ChannelHeader = tw.div`
w-full
h-16
flex
items-center
px-4
justify-between
`;

const ChannelTitle = tw.h1`
text-slate-100
text-xl
flex
items-end
`;

const Divider = tw.div`
h-[1px]
w-[95%]
bg-gradient-to-r
self-center
via-[#4b5082]
from-[#c5c7bd]
to-[#972da0]
`;

const ChannelHeaderButtonContainer = tw.div`
`;

const ChannelHeaderButton = tw.div`
w-7
h-7
flex
justify-center
items-center
bg-red-100
rounded-full
cursor-pointer
`;

const ChatContainer = tw.div`
w-full
h-full
flex
p-2
`;
