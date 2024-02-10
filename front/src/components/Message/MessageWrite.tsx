import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { createNote } from "api/Note";
import { CreateNoteParams } from "models/Note.interface";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

function MessageWrite() {

  const [content,setContent] = useState<string>("");
  const [receiver,setReceiver] = useState<string>("");
  const [isSending,setIsSending] = useState<boolean>(false);
  const [res,setRes] = useState<any>(null);

  const contentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
    setContent(e.target.value);
  }
  const receiverChangeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setReceiver(e.target.value);
  }

  const sendNote = ()=>{
    const req: CreateNoteParams = {
      context: content,
      receiverId: receiver
    }
    const res = createNote(req);
    setRes(res);
  }

  useEffect(()=>{
    if(res){
      setIsSending(false);
    }
  },[res]);

  return <Wrapper onClick={sendNote}>
    <Header>
      <LeaveButton>
        <ArrowLeftIcon className="w-6 h-6"/>
      </LeaveButton>
    </Header>
    <Body>
    <ReceiverInput placeholder="받는 사람" value={receiver} onChange={receiverChangeHandler}/>
      <Content value={content} onChange={contentChangeHandler}/>
    </Body>
    <Footer>
      {isSending ? <SubmitButton>전송중</SubmitButton> : <SubmitButton>보내기</SubmitButton>}
    </Footer>
  </Wrapper>;
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
const Header = tw.div``
const LeaveButton = tw.button``
const Body = tw.div`
flex  
flex-col
space-y-2
`

const Content = tw.textarea`
bg-white
bg-opacity-10
shadow-lg
rounded-md
p-3
min-h-52
mb-3
focus:outline-none
`

const ReceiverTitle = tw.div`
`
const ReceiverContainer = tw.div`
flex
space-x-2
items-end
`
const ReceiverInput = tw.input`
w-1/2
focus:outline-none
bg-transparent
border-b-[1px]
border-zinc-100
`
const Footer = tw.div``

const SubmitButton = tw.button``

export default MessageWrite;
