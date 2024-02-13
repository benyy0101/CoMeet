import { BoltIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { createRoom } from "api/Room";
import { ROOM_CONSTRAINTS, ROOM_TYPE } from "models/Enums.type";
import { CreateRoomParams } from "models/Room.interface";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRoom } from "store/reducers/userSlice";
import tw from "tailwind-styled-components";

export default function RoomCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [maxPeople, setMaxPeople] = React.useState<number>(10);
  const [option, setOption] = React.useState<ROOM_CONSTRAINTS>("FREE");
  const [type, setType] = React.useState<ROOM_TYPE>("DISPOSABLE");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: CreateRoomParams = {
      title,
      description,
      capacity: maxPeople,
      constraints: option,
      type: type,
    };

    const res = await createRoom(data);
    if (type === "PERMANENT") {
      dispatch(addRoom(res));
    }

    navigate(`/room/${res.roomId}`, { replace: true });
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
      <CreateRoomContainer>
        <TitleContainer>
          <Title>스터디 방 만들기</Title>
          <Description>새로운 스터디 방을 만듭니다.</Description>
        </TitleContainer>
        <CreateRoomForm onSubmit={submitHandler}>
          <InputUnit className="w-1/2">
            <Label>방 이름 *</Label>
            <TextInput value={title} onChange={titleHandler} />
          </InputUnit>
          <InputUnit>
            <Label>
              방 설명 <LabelSpan>(optional)</LabelSpan>
            </Label>
            <TextInput value={description} onChange={descriptionHandler} />
          </InputUnit>
          <RadioSelect>
            <RadioContainer onClick={() => setType("DISPOSABLE")}>
              <RadioInput type="radio" checked={type === "DISPOSABLE"} readOnly />
              <BoltIcon className="w-10 h-10" />
              <RadioTitleContainer>
                <RadioTitle>일회성 스터디 방</RadioTitle>
                <RadioDescription>
                  일회성으로 스터디를 할 수 있으며 방 인원이 모두 나가게 되는 경우 방이 사라집니다.
                </RadioDescription>
              </RadioTitleContainer>
            </RadioContainer>
            <RadioContainer onClick={() => setType("PERMANENT")}>
              <RadioInput type="radio" checked={type === "PERMANENT"} readOnly />
              <BuildingOffice2Icon className="w-10 h-10" />
              <RadioTitleContainer>
                <RadioTitle>지속 스터디 방</RadioTitle>
                <RadioDescription>
                  지속적으로 스터디를 할 수 있으며 가입된 인원만 스터디 방에 참여할 수 있습니다.
                </RadioDescription>
              </RadioTitleContainer>
            </RadioContainer>
          </RadioSelect>
          <SubTitle>방 설정:</SubTitle>
          <OptionContainer>
            <InputUnit className="w-1/3">
              <Label>방 옵션</Label>
              <SelectOption value={option} onChange={optionHandler}>
                <option value="FREE">자유</option>
                <option value="MICOFF">음소거 필수</option>
                <option value="VIDEOON">캠/화면공유 필수</option>
                <option value="VIDEOONMICOFF">캠/화면공유 필수, 음소거 필수</option>
              </SelectOption>
            </InputUnit>
            <InputUnit className="w-1/3 justify-around">
              <Label>
                최대 인원: <LabelSpan>{maxPeople}명</LabelSpan>
              </Label>
              <input
                type="range"
                id="volume"
                min="1"
                max="30"
                value={maxPeople}
                onChange={maxPeopleHandler}
              />
            </InputUnit>
          </OptionContainer>
          <SubmitButtonContainer>
            <SubmitButton>방 생성하기</SubmitButton>
          </SubmitButtonContainer>
        </CreateRoomForm>
      </CreateRoomContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex
flex-col
items-center
w-full
py-10
`;

const CreateRoomContainer = tw.div`
w-[60rem]
flex
flex-col
space-y-4
`;

const TitleContainer = tw.div`
flex
flex-col
space-y-2
border-b-2
border-slate-900
p-2
`;

const Title = tw.h1`
text-2xl
font-bold
`;

const Description = tw.p`
font-medium
`;

const CreateRoomForm = tw.form`
p-2
flex
flex-col
space-y-2
`;

const InputUnit = tw.div`
w-full
h-20
flex
flex-col
space-y-2
justify-center
`;

const Label = tw.label`
text-md
font-semibold
`;

const LabelSpan = tw.span`
text-md
font-medium
`;

const TextInput = tw.input`
text-md
border-[1px]
h-10
border-slate-300
rounded-lg
focus:outline-none
p-2
focus:ring-2
focus:ring-purple-900
`;

const RadioSelect = tw.div`
w-full
border-y-[1px]
px-2
py-4
border-slate-400
flex
flex-col
justify-around
`;

const RadioContainer = tw.div`
flex
space-x-4
items-center
w-full
h-20
cursor-pointer
`;

const RadioTitleContainer = tw.div`
flex
flex-col
space-y-2
`;

const RadioTitle = tw.h1`
text-md
font-semibold
`;

const RadioDescription = tw.p`
text-sm
font-light
`;

const RadioInput = tw.input`
`;

const SubTitle = tw.h1`
py-4
text-md
font-semibold
`;

const SelectOption = tw.select`
bg-slate-100
p-2
rounded-lg
border-[1px]
border-slate-300
focus:outline-none
`;

const SubmitButtonContainer = tw.div`
w-full
h-10
flex
justify-end
py-8
border-t-[1px]
border-slate-400
`;

const OptionContainer = tw.div`
w-full
flex
justify-around
items-center
pb-6
`;

const SubmitButton = tw.button`
bg-green-700
p-4
flex
justify-center
items-center
rounded-lg
text-white
font-semibold
shadow-md
`;
