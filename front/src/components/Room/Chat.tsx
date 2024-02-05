import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import TextareaAutosize from "react-textarea-autosize";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import usePressEnterFetch from "../../hooks/usePressEnterFetch";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface IProps {
  channelId: string;
  username: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
}

export default function Chat({
  channelId,
  username,
  setMessage,
  message,
}: IProps) {
  const [rows, setRows] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const chatStompClient = useRef<any>(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_WEBSOCKET_SERVER_URL}chat/channel/messages?channelId=${channelId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        setRows(response.data);

        if (chatStompClient.current === null) {
          chatStompClient.current = Stomp.over(() => {
            const sock = new SockJS(
              `${process.env.REACT_APP_WEBSOCKET_SERVER_URL}stomp`
            );
            return sock;
          });

          chatStompClient.current.connect(
            {},
            () => {
              chatStompClient.current.subscribe(
                `/chat/channel/${channelId}`,
                (e: any) => showMessage(JSON.parse(e.body)),
                { id: "chat" }
              );
            },
            (e: any) => alert("에러발생!!!!!!")
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      if (chatStompClient.current) {
        chatStompClient.current.disconnect(() =>
          console.log("방 웹소켓 연결 끊김!")
        );
        chatStompClient.current = null;
      }
    };
  }, [channelId]);

  //화면에 메시지를 표시하는 함수
  function showMessage(data: any) {
    console.log(data);
    setRows((prev) => [...prev, data]);
  }

  //메시지 브로커로 메시지 전송
  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const data = {
      channelId,
      memberId: "heeyeon3050",
      nickname: username,
      message,
      imageUrl: "",
      createdAt: new Date().toString(),
    };
    // send(destination,헤더,페이로드)
    chatStompClient.current.send(
      "/app/chat/channel/send",
      {},
      JSON.stringify(data)
    );
    setMessage("");
  };
  const { handlePressEnterFetch } = usePressEnterFetch({
    handleSubmit,
    isSubmitting,
  });

  useEffect(() => {
    const chatcontent = document.getElementById("chatcontent");
    if (chatcontent) {
      const position = chatcontent.scrollHeight;
      chatcontent.scrollTop = position;
    }
  }, [rows]);

  const onChangeMessage: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setMessage(e.target.value);
  };

  return (
    <ChatContainer>
      <ChatInputContainer onSubmit={handleSubmit}>
        <ChatInput
          minRows={2}
          maxRows={6}
          onChange={onChangeMessage}
          value={message}
          onKeyDown={handlePressEnterFetch}
        />
        <ChatSubmitButton type="submit">
          <PaperAirplaneIcon className="w-3 h-3" />
        </ChatSubmitButton>
      </ChatInputContainer>
      <ChatContentContainer id="chatcontent">
        <ChatContent>
          {rows.map((r, i) => (
            <ChatRow key={i}>{`${r.nickname} : ${r.message}`}</ChatRow>
          ))}
        </ChatContent>
      </ChatContentContainer>
    </ChatContainer>
  );
}

const ChatContainer = tw.div`
w-full
h-full
flex
flex-col-reverse
`;

const ChatInputContainer = tw.form`
rounded-full
relative
p-2
`;

const ChatInput = tw(TextareaAutosize)`
w-full
h-full
text-slate-800
rounded-lg
p-3
resize-none
outline-none
`;

const ChatContentContainer = tw.div`
overflow-y-scroll
h-20
flex-grow-[1]
`;

const ChatContent = tw.div`
px-4
`;

const ChatRow = tw.pre`
w-full
min-h-10
text-wrap
`;

const ChatSubmitButton = tw.button`
absolute
right-3
bottom-4
flex
justify-center
items-center
bg-red-800
h-6
w-10
rounded-lg
`;
