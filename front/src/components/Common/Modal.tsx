import React from "react";
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
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const [isSignup, setIsSignup] = React.useState<boolean>(false);
  const [isRoomConfirm, setIsRoomConfirm] = React.useState<boolean>(true);
  const [isRoomCreate, setIsRoomCreate] = React.useState<boolean>(false);
  const [isChannelCreate, setIsChannelCreate] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log(option);
    if (option === "login") {
      // 로그인 모달
      console.log("login");
      setIsLogin(true);
      setIsRoomConfirm(false);
      setIsRoomCreate(false);
      setIsSignup(false);
      setIsChannelCreate(false);
    } else if (option === "confirm") {
      console.log("confirm");
      setIsRoomConfirm(true);
      setIsLogin(false);
      setIsRoomCreate(false);
      setIsSignup(false);
      setIsChannelCreate(false);
    } else if (option === "signup") {
      console.log("signup");
      setIsSignup(true);
      setIsRoomConfirm(false);
      setIsLogin(false);
      setIsRoomCreate(false);
      setIsChannelCreate(false);
    } else if (option === "channelCreate") {
      console.log("roomCreate");
      setIsChannelCreate(true);
      setIsRoomCreate(false);
      setIsSignup(false);
      setIsRoomConfirm(false);
      setIsLogin(false);
    }
  }, [option]);

  const modalToggleHandler = () => {
    toggleModal();
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
      </ModalContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center
`;

const ModalContainer = tw.div`
  rounded-md 
  shadow-md
`;
export default Modal;
