import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Video from "../../assets/img/video.png";
import Audio from "../../assets/img/audio.png";
import Lock from "../../assets/img/lock.png";
import {
  LockClosedIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/solid";
import { ROOM_CONSTRAINTS } from "models/Enums.type";

interface IProps {
  setSortByLatest: React.Dispatch<React.SetStateAction<boolean>>;
  sortByLatest: boolean;
  // setPage: React.Dispatch<React.SetStateAction<number>>;
  setConstraints: React.Dispatch<
    React.SetStateAction<ROOM_CONSTRAINTS | "ALL">
  >;
  setIsLockedHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterMenu({
  setSortByLatest,
  sortByLatest,
  // setPage,
  setConstraints,
  setIsLockedHandler,
}: IProps) {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [maxcount, setMaxcount] = useState<number>(0);

  const [sortby, setSortby] = useState<boolean>(false);

  useEffect(() => {
    // setPage(0);
  }, [isLocked, isMuted, isVideoOff, maxcount]);

  const dropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConstraints(e.target.value as ROOM_CONSTRAINTS);
  };

  return (
    <Wrapper>
      <SortButton onClick={() => setSortByLatest(!sortByLatest)}>
        {sortByLatest ? "최신순" : "오래된순"}
      </SortButton>
      <SearchOptionContainer>
        <CheckBoxContainer>
          <Title>방 기본 설정</Title>
          <SearchForm>
            <DropDowns onChange={dropDownHandler}>
              <DropdownOption value="ALL">모두</DropdownOption>
              <DropdownOption value="VIDEOONMICOFF">
                캠/화면공유 필수, 음소거 필수
              </DropdownOption>
              <DropdownOption value="VIDEOON">캠/화면공유 필수</DropdownOption>
              <DropdownOption value="MICOFF">음소거 필수</DropdownOption>
              <DropdownOption value="FREE">자유</DropdownOption>
            </DropDowns>
          </SearchForm>
        </CheckBoxContainer>
      </SearchOptionContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex
flex-col
items-center
fixed
space-y-10
w-52
`;

const SearchOptionContainer = tw.div`
w-full
bg-gray-50
border-[1px]
border-slate-200
rounded-md
shadow-sm
flex
flex-col
items-center
divide-y
divide-slate-200
overflow-hidden
`;
const SearchForm = tw.form`
flex
items-center
space-x-2
`;

const DropDowns = tw.select`
h-10
p-2
focus:outline-none
bg-transparent
text-black
`;

const SearchInputContainer = tw.div`
flex
h-10
items-center
justify-end
relative
border-b-[1px]
`;

const SearchBar = tw.input`
w-full
h-full
focus:outline-none
p-2
pr-6
bg-transparent
text-slate-300
`;

const DropdownOption = tw.option`
text-black
`;

const Img = tw.img`
w-5
`;

const CheckBox = tw.div`
flex
items-center
space-x-2
`;

const CheckBoxContainer = tw.div`
p-6
w-full
flex
flex-col
gap-3
`;

const RangeContainer = tw.div`
flex
gap-2
w-full
`;
const CheckBoxOption = tw.div`
flex
gap-3
`;
const Title = tw.div`
font-bold
`;

const RangeWrapper = tw.div`
w-full
p-6
`;

const SortButton = tw.button`
w-full
p-2
border-2
border-gray-300
rounded-md
bg-gray-200
hover:bg-gray-500
hover:text-white
transition
`;
