import React from "react";
import tw from "tailwind-styled-components";
import Modal from "./Common/Modal";
import Video from "../assets/img/video.png";
import Screen from "../assets/img/screen.png";
import NoAudio from "../assets/img/no-audio.png";
import { RoomItemProps } from "../types";
import { SearchRoomContent } from "models/Room.interface";

const Wrapper = tw.div`
flex  
justify-between
items-center 
gap-5 
bg-gray-200 
p-4 
rounded-md 
cursor-pointer 
hover:bg-gray-300
shadow-md
`;

const LeftContainer = tw.div`
flex
gap-5
items-center
`;

const RightContainer = tw.div`
flex
items-center
justify-center
gap-5
`;

const Title = tw.h1`
text-3xl 
font-bold 
mb-2`;

const TitleContainer = tw.div`
flex
items-end
gap-3
`;

const InfoContainer = tw.div`
flex
flex-col
`;

const CountContainer = tw.div`
flex
flex-col
items-center
`;

const Manager = tw.div`text-gray-500 mb-2 text-sm`;

const Image = tw.img` mb-2 rounded-full`;

const Description = tw.p`text-gray-700 mb-2`;

const CountTitle = tw.div`text-gray-800 mb-2 text-sm`;

const Count = tw.div`text-gray-500`;

const KeywordContainer = tw.div`
flex
gap-2
`;

const Keyword = tw.div`
  border-2
  border-gray-300
  rounded-md
  p-1
  px-2
  text-sm
  shadow-md
  bg-gray-700
  text-white
`;
const OptionContainer = tw.div`
flex
flex-col
gap-2
`;

const Img = tw.img`w-6`;

function RoomItem(props: SearchRoomContent) {
  // function RoomItem(props: RoomItemProps) {
  const [modal, setModal] = React.useState<boolean>(false);
  const modalHandler = () => {
    setModal(!modal);
  };
  return (
    <Wrapper onClick={modalHandler}>
      <LeftContainer>
        <Image src={props.roomImage} alt="room thumbnail" />
        <InfoContainer>
          <TitleContainer>
            <Title>{props.title}</Title>
            <Manager>{props.managerId}</Manager>
          </TitleContainer>
          <Description>{props.description}</Description>
        </InfoContainer>
      </LeftContainer>
      <RightContainer>
        <KeywordContainer>
          <Keyword>C++</Keyword>
          <Keyword>JAVA</Keyword>
          <Keyword>PYTHON</Keyword>
        </KeywordContainer>
        <OptionContainer>
          <Img src={Video} alt="video" />
          <Img src={NoAudio} alt="audio" />
        </OptionContainer>
        <CountContainer>
          <CountTitle>인원</CountTitle>
          <Count>30 / {props.capacity}</Count>
        </CountContainer>
      </RightContainer>

      {modal && (
        <Modal
          toggleModal={modalHandler}
          option="confirm"
          // setting={props}
        ></Modal>
      )}
    </Wrapper>
  );
}

export default RoomItem;
