import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import Modal from "../Common/Modal";
import BasicRoom from "assets/img/basic-room.png";
import Video from "../assets/img/video.png";
import Screen from "../assets/img/screen.png";
import NoAudio from "../assets/img/no-audio.png";
import { RoomItemProps } from "../../types";
import { SearchRoomContent } from "models/Room.interface";
import {
  SpeakerXMarkIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  VideoCameraSlashIcon,
  UsersIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { set } from "react-hook-form";

export default function RoomItem(props: SearchRoomContent) {
  // function RoomItem(props: RoomItemProps) {
  const [modal, setModal] = React.useState<boolean>(false);
  const [isMute, setIsMute] = React.useState<boolean>(false);
  const [isVideo, setIsVideo] = React.useState<boolean>(false);

  const optionHandler = () => {
    const option = props.constraints;
    if (option === "VIDEOONMICOFF") {
      setIsMute(true);
      setIsVideo(true);
    } else if (option === "VIDEOON") {
      setIsVideo(true);
    } else if (option === "MICOFF") {
      setIsMute(true);
    }
  };

  useEffect(() => {
    optionHandler();
  }, []);

  const modalHandler = () => {
    setModal(!modal);
  };
  return (
    <Wrapper onClick={modalHandler}>
      <Column>
        <ProfileImg
          style={{
            backgroundImage: `url(
            ${props.roomImage ? props.roomImage : BasicRoom})`,
          }}
        />
      </Column>
      <Column className="flex-grow-[1] max-w-[30rem]">
        <TitleContainer>
          <Title>{props.title}</Title>
          <Manager>{props.managerNickname}</Manager>
        </TitleContainer>
        <Description>{props.description}</Description>
        <KeywordContainer>
          {props.keywords.map((keyword) => {
            return <Keyword>{keyword.name}</Keyword>;
          })}
        </KeywordContainer>
      </Column>
      <Column>
        <OptionContainer>
          {isMute ? (
            <SpeakerXMarkIcon className="w-6 h-6 text-slate-700" />
          ) : (
            <SpeakerWaveIcon className="w-6 h-6 text-slate-700" />
          )}
          {isVideo ? (
            <VideoCameraIcon className="w-6 h-6 text-slate-700" />
          ) : (
            <VideoCameraSlashIcon className="w-6 h-6 text-slate-700" />
          )}
          {props.isLocked && (
            <LockClosedIcon className="w-6 h-6 text-slate-700" />
          )}
        </OptionContainer>
      </Column>
      <Column>
        <CountContainer>
          {/* <CountTitle>인원</CountTitle> */}
          <UsersIcon className="w-6 h-6 text-slate-700" />
          <Count>
            {props.currentMcount} / {props.capacity}
          </Count>
        </CountContainer>
      </Column>

      {modal && (
        <Modal
          toggleModal={modalHandler}
          option="confirm"
          setting={props}
        ></Modal>
      )}
    </Wrapper>
  );
}

const Wrapper = tw.div`
border-purple-400
border-2
flex  
justify-between
items-center
bg-slate-100
p-4 
rounded-md 
cursor-pointer 
hover:bg-purple-50
shadow-md
h-40
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
bg-white
border
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
text-xs
`;

const KeywordContainer = tw.div`
w-40
flex
gap-1
`;

const Keyword = tw.div`
rounded-md
p-1
px-2
text-xs
shadow-md
bg-purple-800
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
