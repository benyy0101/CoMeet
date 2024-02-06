import { createRoom } from "api/Room";
import { ROOM_CONSTRAINTS, ROOM_TYPE } from "models/Enums.type";
import { CreateRoomParams } from "models/Room.interface";
import React from "react";
import tw from "tailwind-styled-components";

function RoomCreate() {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [maxPeople, setMaxPeople] = React.useState<number>(0);
  const [option, setOption] = React.useState<ROOM_CONSTRAINTS>("VIDEOONMICOFF");
  const [type, setType] = React.useState<ROOM_TYPE>("DISPOSABLE");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: CreateRoomParams = {
      title,
      description,
      capacity: maxPeople,
      constraints: option,
      type: type,
    };

    const res = createRoom(data);
    console.log(res);
  };

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const maxPeopleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPeople(Number(e.target.value));
  };

  const optionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value as ROOM_CONSTRAINTS);
  };

  return (
    <Wrapper>
      <Form onSubmit={submitHandler}>
        <Title>방 만들기</Title>
        <InputUnit>
          <Label>방 이름</Label>
          <TextInput
            type="text"
            placeholder="방 이름을 입력해주세요"
            value={title}
            onChange={titleHandler}
          />
        </InputUnit>
        <InputUnit>
          <Label>방 특징</Label>
          <TextInput
            type="text"
            placeholder="간단한 설명을 적어주세요"
            value={description}
            onChange={descriptionHandler}
          />
        </InputUnit>
        <InputUnit>
          <Label>최대 인원</Label>
          <TextInput
            type="number"
            placeholder="최대 인원을 설정해 주세요"
            value={maxPeople}
            onChange={maxPeopleHandler}
          />
        </InputUnit>
        <InputUnit>
          <Label>방 옵션</Label>
          <select value={option} onChange={optionHandler}>
            <option value="VIDEOONMICOFF">VIDEOONMICOFF</option>
            <option value="VIDEOON">VIDEOON</option>
            <option value="MICOFF">MICOFF</option>
            <option value="FREE">FREE</option>
          </select>
        </InputUnit>
        <InputUnit>
          <Label>방 타입</Label>
          <select value={option} onChange={optionHandler}>
            <option value="DISPOSABLE">DISPOSABLE</option>
            <option value="PERMANENT">PERMANENT</option>
          </select>
        </InputUnit>
        <SubmitButton>방 생성하기</SubmitButton>
      </Form>
    </Wrapper>
  );
}

const Wrapper = tw.div`
    w-full
    h-[calc(100vh-3rem)]
    bg-slate-500
    flex
    justify-center
    items-center
`;
const Title = tw.h1`
    text-4xl
    text-white
    mb-4
`;
const Form = tw.form`
w-1/3
space-y-4
`;

const InputUnit = tw.div`
flex
flex-col
gap-2

`;

const Label = tw.label`
text-white

`;

const TextInput = tw.input`
p-2
mr-2
bg-transparent
focus:outline-none
`;

const SubmitButton = tw.button``;

export default RoomCreate;
