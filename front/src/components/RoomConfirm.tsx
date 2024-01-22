import React from "react";
import tw from "tailwind-styled-components";
import { RoomItemProps } from "../types";

const Wrapper = tw.div`
    flex
    flex-col  
    justify-between
    items-center 
    gap-5
    rounded-md 
    cursor-pointer
`;

const Thumbnail = tw.img`
    w-1/2
    h-1/2
    rounded-full  
`;

const Start = tw.button`
    shadow-md
    border-2
    border-blue-500
    rounded-md
    px-4
    py-2
    bg-blue-500
    text-white
    hover:bg-blue-600
`;

const Title = tw.h1`
    text-2xl
    font-bold
    mb-2
`;
function RoomConfirm(props: RoomItemProps) {
  return (
    <Wrapper>
      <Title> {props.title}</Title>
      <Thumbnail src={props.roomImage} alt="room thumbnail"></Thumbnail>
      <p> {props.description}</p>
      <div> 30 / {props.maxcount}</div>
      <Start>입장하기</Start>
    </Wrapper>
  );
}

export default RoomConfirm;
