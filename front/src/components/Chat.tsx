import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import SockJS from "sockjs-client";
import { Stomp, CompatClient } from "@stomp/stompjs";
import {
  PaperAirplaneIcon,
  ArrowsPointingOutIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

type chatData = {
  channelId: string;
  sender: string;
  contents: string;
};

export default function Chat({
  channelId,
  username,
}: {
  channelId: string;
  username: string;
}) {
  const [rows, setRows] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isFolded, setIsFolded] = useState<boolean>(false);
  const stompClient = useRef<CompatClient>();

  const foldHandler = () => {
    setIsFolded(!isFolded);
    console.log(isFolded);
  };

  useEffect(() => {
    setRows([]);

    stompClient.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:5000/chatting");
      return sock;
    });

    // connect(header,연결 성공시 콜백,에러발생시 콜백)
    stompClient.current.connect(
      {},
      function () {
        //subscribe(subscribe url,해당 url로 메시지를 받을때마다 실행할 함수)
        stompClient.current!.subscribe(`/topic/${channelId}`, function (e) {
          //e.body에 전송된 data가 들어있다
          showMessage(JSON.parse(e.body));
        });
      },
      function (e: any) {
        //에러 콜백
        alert("에러발생!!!!!!");
      }
    );
  }, [channelId]);

  //화면에 메시지를 표시하는 함수
  function showMessage(data: chatData) {
    const new_chat: string = data.sender + ": " + data.contents;
    setRows((prev: string[]) => [...prev, new_chat] as string[]);
  }

  //메시지 브로커로 메시지 전송
  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: chatData = {
      channelId,
      sender: username,
      contents: message,
    };
    // send(destination,헤더,페이로드)
    if (stompClient.current) {
      stompClient.current?.send("/app/chat/send", {}, JSON.stringify(data));
    }
    setMessage("");
  }

  useEffect(() => {
    const chatcontent = document.getElementById("chatcontent");
    const position = chatcontent!.scrollHeight;
    if (chatcontent?.scrollTop != null) {
      chatcontent.scrollTop = position;
    }
  }, [rows]);

  const onChangeMessage = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  return (
    <>
      {isFolded ? (
        <OptionBtn onClick={foldHandler}>
          <ChevronDoubleLeftIcon className="text-white w-5 h-5" />
        </OptionBtn>
      ) : (
        <ChatContainer>
          <InputContainer>
            <ChatInputContainer onSubmit={send}>
              <SendButton type="submit">
                <PaperAirplaneIcon className="w-3 h-3" />
              </SendButton>
              <ChatInput onChange={onChangeMessage} value={message} />
            </ChatInputContainer>
          </InputContainer>
          <Border />
          <ChatContentContainer id="chatcontent">
            <ChatContent>
              {rows.map((content, i) => (
                <ChatRow key={i}>{content}</ChatRow>
              ))}
            </ChatContent>
          </ChatContentContainer>
          <Border />
          <OptionContainer>
            <div className="flex justify-between items-center h-full">
              <OptionBtn
                className="flex justify-center items-center"
                onClick={foldHandler}
              >
                <ChevronDoubleRightIcon className="w-5 h-5" />
              </OptionBtn>
              <OptionBtn className="flex justify-center items-center">
                <ArrowsPointingOutIcon className="w-5 h-5" />
              </OptionBtn>
            </div>
          </OptionContainer>
        </ChatContainer>
      )}
    </>
  );
}

const Border = tw.div`
w-full
border-[0.2px]
border-zinc-700
mx-2
shadow-sm
`;

const OptionBtn = tw.button`
  flex
  justify-center
  items-center
  h-10
  w-12
  rounded-sm
`;

const InputContainer = tw.div`
  p-1
  flex
  w-full
`;

const SendButtonContainer = tw.div`
h-12
py-1
`;

const SendButton = tw.button`
  absolute
  right-2
  bottom-2
  flex
  justify-center
  items-center
  bg-red-800
  h-6
  w-10
  rounded-sm
`;

const OptionContainer = tw.div`
w-full
h-12
rounded-t-md
`;
const ChatInputContainer = tw.form`
relative
h-20
p-1
relative
flex-grow-[1]
`;

const ChatInput = tw.input`
w-full
h-full
rounded-sm
bg-grey-300
text-slate-800

`;

const ChatContentContainer = tw.div`
scrollbar
scrollbar-thumb-[#050110]
overflow-y-scroll
h-full
w-full
overflow-x-hidden
`;

const ChatContent = tw.div`
px-4
`;

const ChatRow = tw.div`
w-full
`;

const ChatContainer = tw.div`
mr-3
mb-3
w-1/4
min-w-[300px]
rounded-md
text-white
flex
flex-col-reverse
items-center
bg-[#181422]
max-h-[561.6px]

`;
