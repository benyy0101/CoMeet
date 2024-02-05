import React from "react";
import tw from "tailwind-styled-components";
import Login from "../Auth/Login";
import RoomConfirm from "../RoomConfirm";
import { RoomItemProps } from "../../types";
import Signup from "components/Auth/Signup";
import { ImageModify } from "components/Mypage/ImageModify";

type ModalProps = {
  toggleModal: () => void;
  option: string;
  setting?: RoomItemProps | null;
};

function Modal(props: ModalProps) {
  const { toggleModal, option, setting } = props;
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const [isSignup, setIsSignup] = React.useState<boolean>(false);
  const [isRoomConfirm, setIsRoomConfirm] = React.useState<boolean>(true);
  const [isRoomCreate, setIsRoomCreate] = React.useState<boolean>(false);
  const [isModifyProfileImg, setIsModifyProfileImg] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (option === "login") {
      // 로그인 모달
      console.log("login");
      setIsLogin(true);
      setIsRoomConfirm(false);
      setIsRoomCreate(false);
      setIsSignup(false);
    } else if (option === "confirm") {
      // 로그인 모달
      setIsRoomConfirm(true);
      setIsLogin(false);
      setIsRoomCreate(false);
      setIsSignup(false);
    } else if (option === "signup") {
      setIsSignup(true);
      setIsRoomConfirm(false);
      setIsLogin(false);
      setIsRoomCreate(false);
    } else if (option === "modifyProfile") {
      setIsModifyProfileImg(true);
      setIsSignup(false);
      setIsRoomConfirm(false);
      setIsLogin(false);
      setIsRoomCreate(false);
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
        {isModifyProfileImg ? <ImageModify></ImageModify> : null}
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
