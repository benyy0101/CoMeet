import React from "react";
import tw from "tailwind-styled-components";
import Login from "./Login";
import RoomConfirm from "./RoomConfirm";

const Wrapper = tw.div`
fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center
`;

const ModalContainer = tw.div`
bg-white p-20 rounded-md shadow-md
`;

function Modal({ toggleModal }: { toggleModal: () => void }) {
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const [isRoomConfirm, setIsRoomConfirm] = React.useState<boolean>(true);
  const [roomCreator, setRoomCreator] = React.useState<boolean>(false);

  const modalToggleHandler = () => {
    toggleModal();
  };

  return (
    <Wrapper onClick={modalToggleHandler}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {isLogin ? <Login></Login> : null}
        {isRoomConfirm ? <RoomConfirm></RoomConfirm> : null}
      </ModalContainer>
    </Wrapper>
  );
}
export default Modal;
