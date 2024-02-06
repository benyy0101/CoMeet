import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Video from "../assets/img/video.png";
import Audio from "../assets/img/audio.png";
import Lock from "../assets/img/lock.png";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/solid";

export default function FilterMenu() {
  const [sortByLatest, setSortByLatest] = useState<boolean>(true);

  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [maxcount, setMaxcount] = useState<number>(0);
  const maxcountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxcount(Number(e.target.value));
  };
  useEffect(() => {
    console.log(maxcount);
  }, [maxcount]);
  return (
    <Wrapper>
      <SortButton onClick={() => setSortByLatest(!sortByLatest)}>
        {sortByLatest ? "최신순" : "오래된순"}
      </SortButton>
      <SearchOptionContainer>
        <CheckBoxContainer>
          <Title>방 기본 설정</Title>
          {/* TODO: 체크박스 커스텀하기 */}
          <CheckBoxOption>
            <CheckBox>
              <Img src={Lock} alt="" />
              <input type="checkbox" checked={isLocked} onChange={() => setIsLocked(!isLocked)} />
            </CheckBox>
            <CheckBox>
              <Img src={Audio} alt="" />
              <input type="checkbox" checked={isMuted} onChange={() => setIsMuted(!isMuted)} />
            </CheckBox>
            <CheckBox>
              <Img src={Video} alt="" />
              <input
                type="checkbox"
                checked={isVideoOff}
                onChange={() => setIsVideoOff(!isVideoOff)}
              />
            </CheckBox>
          </CheckBoxOption>
        </CheckBoxContainer>

        <RangeWrapper>
          <Title>최대인원 설정</Title>
          <RangeContainer>
            <input type="range" onChange={maxcountHandler} />
            {maxcount}
          </RangeContainer>
        </RangeWrapper>
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
`;

const SearchOptionContainer = tw.div`
bg-gray-50
border-[1px]
border-slate-200
rounded-md
shadow-sm
flex
flex-col
divide-y
divide-slate-200
overflow-hidden
`;

const Img = tw.img`
w-5
`;

const CheckBox = tw.div`
flex
gap-1
`;

const CheckBoxContainer = tw.div`
p-5
flex
flex-col
gap-3
`;

const RangeContainer = tw.div`
flex
gap-2
`;
const CheckBoxOption = tw.div`
flex
gap-3
`;
const Title = tw.div`
font-bold
`;

const RangeWrapper = tw.div`
p-5
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
