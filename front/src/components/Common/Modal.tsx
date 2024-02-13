import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import Login from "../Auth/Login";
import RoomConfirm from "../RoomConfirm";
import { RoomItemProps } from "../../types";
import Signup from "components/Auth/Signup";
import { set } from "react-hook-form";
import CreateChannel from "components/Room/CreateChannel";
import { IChannel } from "models/Channel.interface";
import { ILounge } from "models/Lounge.interface";
import FollowList from "components/Mypage/Follow/FollowList";
import MessageList from "components/Message/MessageList";
import MessageWrite from "components/Message/MessageWrite";
import MessageRead from "components/Message/MessageRead";

type ModalProps = {
  toggleModal: () => void;
  option: string;
  setting?: any;
  channels?: IChannel[];
  addChannel?: (name: string) => void;
  removeChannel?: (id: number) => void;

  lounges?: ILounge[];
  addLounge?: (name: string) => void;
  removeLounge?: (id: number) => void;
};

function Modal(props: ModalProps) {
  const {
    toggleModal,
    option,
    setting,
    channels,
    removeChannel,
    addChannel,
    lounges,
    addLounge,
    removeLounge,
  } = props;

  const [noteState, setNoteState] = React.useState<string>("list");
  const [noteNo, setNoteNo] = React.useState<number>(0);
  const [writer, setWriter] = React.useState<string>("");

  const modalToggleHandler = () => {
    toggleModal();
  };

  const setNoteStateHandler = (state: string, no: number) => {
    setNoteState(state);
    if (no) {
      setNoteNo(no);
    }
  };

  const setWriterHandler = (writerId: string) => {
    setWriter(writerId);
  };

  return (
    <Wrapper onClick={modalToggleHandler}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {option === "login" ? <Login></Login> : null}
        {option === "confirm" ? (
          <RoomConfirm {...setting!}></RoomConfirm>
        ) : null}
        {option === "signup" ? <Signup></Signup> : null}
        {option === "channelCreate" ? (
          <CreateChannel
            channels={channels}
            removeChannel={removeChannel}
            addChannel={addChannel}
            lounges={lounges}
            addLounge={addLounge}
            removeLounge={removeLounge}
          />
        ) : null}
        {option === "follower" ? (
          <FollowList option={option}></FollowList>
        ) : null}
        {option === "following" ? (
          <FollowList option={option}></FollowList>
        ) : null}
        {option === "message" && noteState === "list" ? (
          <MessageList swapState={setNoteStateHandler}></MessageList>
        ) : null}
        {option === "message" && noteState === "write" ? (
          <MessageWrite
            swapState={setNoteStateHandler}
            writer={writer}
            setWriter={setWriterHandler}
          />
        ) : null}
        {option === "message" && noteState === "read" ? (
          <MessageRead
            noteNo={noteNo}
            swapState={setNoteStateHandler}
            setWriter={setWriterHandler}
          />
        ) : null}
      </ModalContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center
shadow-md
`;

const ModalContainer = tw.div`
  rounded-md 
  shadow-lg
`;
export default Modal;
