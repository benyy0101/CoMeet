import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import ChannelItem from "./ChannelItem";
import { IChannel } from "models/Channel.interface";
import { ILounge } from "models/Lounge.interface";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface CreateChannelProps {
  channels?: IChannel[];
  removeChannel?: (id: number) => void;
  addChannel?: (name: string) => void;

  lounges?: ILounge[];
  addLounge?: (name: string) => void;
  removeLounge?: (id: number) => void;
}

function CreateChannel(props: CreateChannelProps) {
  const { channels, removeChannel, addChannel, lounges, addLounge, removeLounge } = props;
  const [isAddBtnFocused, setIsAddBtnFocused] = useState<boolean>(false);
  const [isChannelFocused, setIsChannelFocused] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const isAddBtnFocusedHandler = () => {
    setIsAddBtnFocused(!isAddBtnFocused);
  };

  const isChannelFocusedHandler = () => {
    setIsChannelFocused(true);
  };

  const isLoungeFocusedHandler = () => {
    setIsChannelFocused(false);
  };

  useEffect(() => {
    console.log(isChannelFocused);
  }, [isChannelFocused]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && isChannelFocused) {
      console.log("channel");
      addChannel!(title);
      setTitle("");
      setIsAddBtnFocused(false);
    } else if (title && !isChannelFocused) {
      console.log("lounge");
      addLounge!(title);
      setTitle("");
      setIsAddBtnFocused(false);
    }
  };

  useEffect(() => {
    if (isAddBtnFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddBtnFocused]);
  return (
    <Wrapper>
      <ModalHeader>
        <ButtonContainer>
          <ChannelButton onClick={isChannelFocusedHandler} $option={isChannelFocused}>
            채널
          </ChannelButton>
          <LoungeButton onClick={isLoungeFocusedHandler} $option={!isChannelFocused}>
            라운지
          </LoungeButton>
        </ButtonContainer>
        <AddButton onClick={isAddBtnFocusedHandler}>+ 추가하기</AddButton>
      </ModalHeader>

      <ContentContainer>
        <Content>
          {isChannelFocused &&
            channels?.map((channel) => {
              return (
                <ChannelItem
                  key={channel.channelId}
                  name={channel.name}
                  idx={channel.channelId}
                  remove={removeChannel!}
                ></ChannelItem>
              );
            })}

          {!isChannelFocused &&
            lounges?.map((lounge) => {
              return (
                <ChannelItem
                  key={lounge.loungeId}
                  name={lounge.name}
                  idx={lounge.loungeId}
                  remove={removeLounge!}
                ></ChannelItem>
              );
            })}
        </Content>
      </ContentContainer>

      <NewContainer>
        {isAddBtnFocused && (
          <NewForm onSubmit={submitHandler}>
            <NewChannel
              value={title}
              onChange={titleHandler}
              onBlur={isAddBtnFocusedHandler}
              ref={inputRef}
            />
            <InputButton>
              <CancelButton onClick={() => setIsAddBtnFocused(false)} />
            </InputButton>
            <input type="submit">
              <ConfirmButton />
            </input>
          </NewForm>
        )}
      </NewContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
    text-white
    bg-gray-100
    bg-opacity-10
    w-full
    h-full
    p-4
    rounded-md
    flex
    flex-col
    space-y-4
`;

const ModalHeader = tw.div`
flex
justify-between
px-2
`;

const ButtonContainer = tw.div`
flex
space-x-4
`;

const ChannelButton = tw.button<{ $option: boolean }>`
  ${(props) => (props.$option ? "border-b-2 border-slate-500" : "")}
`;

const LoungeButton = tw.button<{ $option: boolean }>`
  ${(props) => (props.$option ? "border-b-2 border-slate-500" : "")}
`;

const AddButton = tw.button`
font-light
text-slate-300
text-xs
focus:outline-none
`;

const ContentContainer = tw.div`
overflow-y-scroll
scrollbar-hide
h-48
`;

const Content = tw.div`
flex
flex-col
space-y-1
`;

const NewContainer = tw.div`
h-10
w-full
flex
flex-end
relative
`;

const NewForm = tw.form`
h-14
w-full
relative
py-2
border-t
border-slate-400/50
`;

const NewChannel = tw.input`
bg-slate-200
h-10
w-full
py-2
px-4
pr-14
rounded-md
focus:outline-none
text-slate-800
`;

const InputButton = tw.button`
`;

const CancelButton = tw(XMarkIcon)`
absolute
w-4
h-4
right-8
top-1/2
-translate-y-1/2
text-red-400
`;

const ConfirmButton = tw(CheckIcon)`
absolute
w-4
h-4
right-2
top-1/2
-translate-y-1/2
text-green-400
`;

export default CreateChannel;
