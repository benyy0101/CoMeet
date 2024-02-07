import React from "react";
import tw from "tailwind-styled-components";
import Login from "../Auth/Login";
import RoomConfirm from "../RoomConfirm";
import { RoomItemProps } from "../../types";
import Signup from "components/Auth/Signup";
import { set } from "react-hook-form";
import Follower from "components/Mypage/Follower";
import Following from "components/Mypage/Following";
import CreateChannel from "components/Room/CreateChannel";
import { IChannel } from "models/Channel.interface";
import { ILounge } from "models/Lounge.interface";

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
  const [isFollower, setIsFollower] = React.useState<boolean>(false);
  const [isFollowing, setIsFollowing] = React.useState<boolean>(false);
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
      setIsFollower(false);
      setIsFollowing(false);
      setIsChannelCreate(false);
    } else if (option === "confirm") {
      console.log("confirm");
      setIsRoomConfirm(true);
      setIsLogin(false);
      setIsRoomCreate(false);
      setIsSignup(false);
      setIsFollower(false);
      setIsFollowing(false);
      setIsChannelCreate(false);
    } else if (option === "signup") {
      console.log("signup");
      setIsSignup(true);
      setIsRoomConfirm(false);
      setIsLogin(false);
      setIsRoomCreate(false);
      setIsFollower(false);
      setIsFollowing(false);
    } else if (option === "follower") {
      setIsFollower(true);
      setIsSignup(false);
      setIsRoomConfirm(false);
      setIsLogin(false);
      setIsRoomCreate(false);
      setIsFollowing(false);
    } else if (option === "following") {
      setIsFollowing(true);
      setIsFollower(false);
      setIsSignup(false);
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
        {isLogin ? <Login></Login> : null}
        {isRoomConfirm ? <RoomConfirm {...setting!}></RoomConfirm> : null}
        {isSignup ? <Signup></Signup> : null}
        {isFollower ? <Follower /> : null}
        {isFollowing ? <Following /> : null}
        {isChannelCreate ? (
          <CreateChannel
            channels={channels}
            removeChannel={removeChannel}
            addChannel={addChannel}
            lounges={lounges}
            addLounge={addLounge}
            removeLounge={removeLounge}
          />
        ) : null}
      </ModalContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center
`;

const ModalContainer = tw.div`
rounded-md 
shadow-md
`;
export default Modal;
