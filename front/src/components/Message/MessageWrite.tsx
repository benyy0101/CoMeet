import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { createNote } from "api/Note";
import { CreateNoteParams } from "models/Note.interface";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import tw from "tailwind-styled-components";

function MessageWrite(props: {
  swapState: (state: string, no: number) => void;
  writer: string;
  setWriter: (writerId: string) => void;
}) {
  const { swapState, writer, setWriter } = props;
  const [content, setContent] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [res, setRes] = useState<any>(null);
  const [status, setStatus] = useState<string>("");

  const contentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const receiverChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver(e.target.value);
  };

  const sendNote = (e: React.FormEvent) => {
    e.preventDefault();
    const req: CreateNoteParams = {
      context: content,
      receiverId: receiver || writer,
    };
    try {
      const response = createNote(req);
      setIsSending(true);
      setRes(response);
    } catch (e) {
      console.error(e);
      setStatus("fail");
    }
  };

  useEffect(() => {
    //console.log("res", res);
    if (res) {
      setIsSending(false);
      setStatus("success");
    }
  }, [res]);

  const leaveHandler = () => {
    swapState("list", 0);
    setWriter("");
  };

  return (
    <Wrapper onSubmit={sendNote}>
      <Header>
        <LeaveButton onClick={leaveHandler}>
          <ArrowLeftIcon className="w-6 h-6" />
        </LeaveButton>
      </Header>
      <Body>
        <ReceiverInput
          placeholder="받는 사람"
          value={receiver || writer}
          onChange={receiverChangeHandler}
          disabled={status === "success" || writer !== "" ? true : false}
          required
        />
        <Content
          value={content}
          onChange={contentChangeHandler}
          disabled={status === "success"}
          required
        />
      </Body>
      <Footer>
        {isSending ? (
          <SubmitButton>전송중</SubmitButton>
        ) : (
          <SubmitButton disabled={status === "success"}>보내기</SubmitButton>
        )}
        {!isSending && status === "success" ? (
          <ResponseText className="text-emerald-700 font-bold">
            전송 완료!
          </ResponseText>
        ) : (
          status === "fail" && (
            <ResponseText className="text-red-700 font-bold">
              전송 실패
            </ResponseText>
          )
        )}
      </Footer>
    </Wrapper>
  );
}

const Wrapper = tw.form`
min-h-96
min-w-96
bg-gradient-to-b
from-sky-950
to-indigo-950
rounded-md
p-5
text-indigo-50
flex
flex-col
space-y-2
`;
const Header = tw.div``;
const LeaveButton = tw.button``;
const Body = tw.div`
flex  
flex-col
space-y-2
`;

const Content = tw.textarea`
bg-white
bg-opacity-10
shadow-lg
rounded-md
p-3
min-h-52
mb-3
focus:outline-none
`;

const ReceiverTitle = tw.div`
`;
const ReceiverContainer = tw.div`
flex
space-x-2
items-end
`;
const ReceiverInput = tw.input`
w-1/2
focus:outline-none
bg-transparent
border-b-[1px]
border-zinc-100
`;
const Footer = tw.div`
flex
flex-row-reverse
justify-between
items-end
`;

const ResponseText = tw.div`
`;

const SubmitButton = tw.button`
w-20
h-10
bg-gradient-to-r
from-indigo-400
to-indigo-500
rounded-md
p-2
self-end
font-bold
hover:from-indigo-500
hover:to-indigo-600
transition-all
shadow-lg
text-cyan-50
`;

export default MessageWrite;
