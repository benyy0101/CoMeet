import React from "react";
import tw from "tailwind-styled-components";
import Login from "./Login";
import RoomConfirm from "./RoomConfirm";
import { RoomItemProps } from "../types";

type ModalProps = {
  toggleModal: () => void;
  option?: string;
  otherProps: RoomItemProps;
};

function Modal(props: ModalProps) {
  const { toggleModal, option, otherProps } = props;
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const [isRoomConfirm, setIsRoomConfirm] = React.useState<boolean>(true);
  const [isRoomCreate, setIsRoomCreate] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (option === "login") {
      // 로그인 모달
      setIsLogin(true);
      setIsRoomConfirm(false);
      setIsRoomCreate(false);
    } else if (option === "confirm") {
      // 로그인 모달
      setIsRoomConfirm(true);
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
        {isRoomConfirm ? <RoomConfirm {...otherProps}></RoomConfirm> : null}
      </ModalContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center
`;

const ModalContainer = tw.div`
bg-white p-20 rounded-md shadow-md
`;
export default Modal;
