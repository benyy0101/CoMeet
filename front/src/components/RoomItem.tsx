import React from "react";
import tw from "tailwind-styled-components";
import Modal from "./Modal";

type RoomItemProps = {
  title: string;
  roomId: string;
  managerId: string;
  description: string;
  url: string;
  roomImage: string;
  maxcount: number;
  isLocked: boolean;
  password: string;
  constraint: string;
};

const Wrapper = tw.div`
    flex
    flex-col
    justify-center
    items-center
    gap-5
`;

function RoomItem(props: RoomItemProps) {
  const [modal, setModal] = React.useState<boolean>(false);
  const modalHandler = () => {
    setModal(!modal);
  };
  return (
    <Wrapper>
      <div onClick={modalHandler}>
        <h1>{props.title}</h1>
        <img src={props.roomImage} alt="room thumbnail" />
        <p>{props.description}</p>
        <div> 30 / 45 </div>
      </div>
      {modal && <Modal toggleModal={modalHandler}></Modal>}
    </Wrapper>
  );
}

export default RoomItem;
