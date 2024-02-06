import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import ChannelItem from "./ChannelItem";
import { IChannel } from "models/Channel.interface";
import { ILounge } from "models/Lounge.interface";

interface CreateChannelProps {
  channels?: IChannel[];
  removeChannel?: (id: number) => void;
  addChannel?: (name: string) => void;

  lounges?: ILounge[];
  addLounge?: (name: string) => void;
  removeLounge?: (id: number) => void;
}

function CreateChannel(props: CreateChannelProps) {
  const {
    channels,
    removeChannel,
    addChannel,
    lounges,
    addLounge,
    removeLounge,
  } = props;
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
      <ButtonContainer>
        <ChannelButton
          onClick={isChannelFocusedHandler}
          $option={isChannelFocused}
        >
          채널
        </ChannelButton>
        <LoungeButton
          onClick={isLoungeFocusedHandler}
          $option={!isChannelFocused}
        >
          라운지
        </LoungeButton>
      </ButtonContainer>

      <ContentContainer>
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
      </ContentContainer>

      <NewContainer>
        {!isAddBtnFocused ? (
          <AddButton onClick={isAddBtnFocusedHandler}>+</AddButton>
        ) : (
          <form onSubmit={submitHandler}>
            <NewChannel
              value={title}
              onChange={titleHandler}
              onBlur={isAddBtnFocusedHandler}
              ref={inputRef}
            ></NewChannel>
          </form>
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

const ContentContainer = tw.div`
  flex
  flex-col
  space-y-1
`;

const NewContainer = tw.div`
`;

const AddButton = tw.button`
bg-slate-500
w-full
h-10
rounded-md
hover:bg-slate-400
`;

const NewChannel = tw.input`
bg-slate-500
focus:bg-slate-400
h-10
w-full
p-2
rounded-md
focus:outline-none
`;

export default CreateChannel;
