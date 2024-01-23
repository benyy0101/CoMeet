import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";

export default function Chat({ username }) {
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState("");
  const websocket = useRef(null);

  useEffect(() => {
    if (!websocket.current) {
      websocket.current = new WebSocket("ws://localhost:5000/ws/chat");
      websocket.current.onmessage = onMessage;
      // websocket.current.onopen = onOpen;
      // websocket.current.onclose = onClose;
    }
  }, []);

  const send = (e) => {
    e.preventDefault();

    console.log(username + " : " + message);
    websocket.current.send(username + ":" + message);
    setMessage("");
  };

  //채팅창에서 나갔을 때
  const onClose = (evt) => {
    let str = username + " : 님이 방을 나가셨습니다.";
    websocket.current.send(str);
  };

  //채팅창에 들어왔을 때
  const onOpen = (evt) => {
    let str = username + " : 님이 입장하셨습니다.";
    console.log(str);
    websocket.current.send(str);
  };

  const onMessage = (msg) => {
    let data = msg.data;
    // let sessionId = null;
    // //데이터를 보낸 사람
    // let message = null;
    // let arr = data.split(":");

    // sessionId = arr[0];
    // message = arr[1];

    setRows((prev) => [...prev, data]);
  };

  useEffect(() => {
    const chatcontent = document.getElementById("chatcontent");
    const position = chatcontent.scrollHeight;
    chatcontent.scrollTop = position;
  }, [rows]);

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <ChatContainer>
      <ChatInputContainer onSubmit={send}>
        <ChatInput onChange={onChangeMessage} value={message} />
      </ChatInputContainer>
      <ChatContentContainer id="chatcontent">
        <ChatContent>
          {rows.map((r, i) => (
            <ChatRow key={i}>{r}</ChatRow>
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
h-14
rounded-full
relative
p-2
`;

const ChatInput = tw.input`
w-full
h-full
rounded-full
text-slate-800
p-3
`;

const ChatContentContainer = tw.div`
overflow-y-scroll
h-20
flex-grow-[1]
`;

const ChatContent = tw.div`
px-4
`;

const ChatRow = tw.div`
w-full
h-10
`;
