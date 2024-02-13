import React from "react";
import tw from "tailwind-styled-components";
import Modal from "./Common/Modal";
import Video from "../assets/img/video.png";
import Screen from "../assets/img/screen.png";
import NoAudio from "../assets/img/no-audio.png";
import { RoomItemProps } from "../types";
import { SearchRoomContent } from "models/Room.interface";

export default function RoomItem(props: SearchRoomContent) {
  // function RoomItem(props: RoomItemProps) {
  const [modal, setModal] = React.useState<boolean>(false);
  const modalHandler = () => {
    setModal(!modal);
  };
  return (
    <Wrapper onClick={modalHandler}>
      <Column>
        <ProfileImg
          style={{
            backgroundImage: `url(
            ${
              props.roomImage === "" || props.roomImage === "default_room_image_letsgo"
                ? "https://cdn1.iconfinder.com/data/icons/line-full-package/150/.svg-15-512.png"
                : props.roomImage
            })`,
          }}
        />
      </Column>
      <Column className="flex-grow-[1]">
        <TitleContainer>
          <Title>{props.title}</Title>
          <Manager>{props.managerNickname}</Manager>
        </TitleContainer>
        <Description>{props.description}</Description>
      </Column>
      <Column>
        <KeywordContainer>
          <Keyword>C++</Keyword>
          <Keyword>JAVA</Keyword>
          <Keyword>PYTHON</Keyword>
        </KeywordContainer>
      </Column>
      <Column>
        <OptionContainer>
          <Img src={Video} alt="video" />
          <Img src={NoAudio} alt="audio" />
        </OptionContainer>
      </Column>
      <Column>
        <CountContainer>
          <CountTitle>인원</CountTitle>
          <Count>{props.capacity} / 30</Count>
        </CountContainer>
      </Column>

      {modal && <Modal toggleModal={modalHandler} option="confirm" setting={props}></Modal>}
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex  
justify-between
items-center
bg-gray-200 
p-4 
rounded-md 
cursor-pointer 
hover:bg-gray-300
shadow-md
h-32
`;

const Column = tw.div`
flex
flex-col
justify-around
h-full
py-2
px-4
`;

const ProfileImg = tw.div`
bg-slate-300
w-20
h-20
rounded-full
bg-cover
bg-center
`;

const Title = tw.h1`
text-2xl 
font-bold 
mb-2
`;

const TitleContainer = tw.div`
flex
items-center
space-x-4
`;

const CountContainer = tw.div`
flex
flex-col
items-center
`;

const Manager = tw.div`
text-gray-400
text-sm
`;

const Description = tw.p`
text-gray-700
overflow-clip
overflow-ellipsis
break-words
line-clamp-1
font-medium
`;

const CountTitle = tw.div`
text-gray-800
mb-2
text-sm`;

const Count = tw.div`
text-gray-500
`;

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

const Img = tw.img`
w-6
`;
