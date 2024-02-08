import { modifyRoom } from "api/Room";
import { ROOM_CONSTRAINTS } from "models/Enums.type";
import { EnterRoomResponse } from "models/Room.interface";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import { CameraIcon } from "@heroicons/react/24/outline";

export default function RoomModify() {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const roomData: EnterRoomResponse | null = location.state.data;

  const [title, setTitle] = React.useState<string>(roomData?.title || "");
  const [description, setDescription] = React.useState<string>(roomData?.description || "");
  const [maxPeople, setMaxPeople] = React.useState<number>(roomData?.capacity || 10);
  const [option, setOption] = React.useState<ROOM_CONSTRAINTS>(roomData?.constraints || "FREE");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: any = {
      roomId,
      title,
      description,
      capacity: maxPeople,
      constraints: option,
    };

    await modifyRoom(data);

    navigate(`/room/${roomId}`, { replace: true });
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
          <Title>스터디 방 설정</Title>
          <Description>스터디 방의 설정을 변경합니다.</Description>
        </TitleContainer>
        <ThumbLabel htmlFor="file">
          <ThumbContainer>
            <ThumbImg
              id="profile"
              src={
                roomData?.room_image === "" || roomData?.room_image === "default_room_image_letsgo"
                  ? "https://cdn1.iconfinder.com/data/icons/line-full-package/150/.svg-15-512.png"
                  : roomData?.room_image
              }
              alt="thumb"
            />
            <ThumbHover>
              <CameraIcon className="w-8 h-8 text-slate-200" />
              <ThumbDescription>사진 변경</ThumbDescription>
            </ThumbHover>
          </ThumbContainer>
        </ThumbLabel>
        <input
          className="hidden"
          type="file"
          name="file"
          id="file"
          // @change="onChangeImage"
        />
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
          <Block />
          <SubTitle>방 제한:</SubTitle>
          <InputUnit className="w-1/3">
            <Label>
              비밀번호 <LabelSpan>(optional)</LabelSpan>
            </Label>
            <TextInput type="password" />
          </InputUnit>
          <InputUnit>
            <Label>키워드</Label>
            <TextInput />
          </InputUnit>
          <Block />
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
            <SubmitButton>변경사항 저장</SubmitButton>
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

const ThumbLabel = tw.label`
px-8
py-4
w-40
`;

const ThumbContainer = tw.div`
w-32
h-32
relative
flex
items-center
justify-center
`;

const ThumbImg = tw.img`
absolute
left-0
top-0
cursor-pointer
w-32
h-32
bg-slate-700
rounded-full
flex
justify-center
items-center
bg-cover
bg-center
`;

const ThumbHover = tw.div`
cursor-pointer
z-10
opacity-0
hover:opacity-100
bg-black/60
w-32
h-32
flex-col
rounded-full
flex
justify-center
items-center
`;

const ThumbDescription = tw.h4`
text-slate-200
font-semibold
text-sm
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
border
h-10
border-slate-300
rounded-lg
focus:outline-none
p-2
focus:ring-2
focus:ring-purple-900
`;

const Block = tw.div`
w-full
h-8
border-b
border-slate-400
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
border
border-slate-300
focus:outline-none
`;

const SubmitButtonContainer = tw.div`
w-full
h-10
flex
justify-end
py-8
border-t
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
