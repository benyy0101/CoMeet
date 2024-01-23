import React, { ChangeEventHandler } from "react";

import tw from "tailwind-styled-components";

import VideoBlack from "../assets/img/video-black.svg";
import MicMute from "../assets/img/mic-mute.svg";
import LockSvg from "../assets/img/lock-svg.svg";
import Unlock from "../assets/img/unlock.svg";
import Search from "../assets/img/search.svg";

//css

//SettingAll: setting 리스트 전체
const SettingAll = tw.div``;

//Title: title...
const Title = tw.div`
    font-semibold
    text-sm
    mb-2
`;

//SettingContainer: 기본 설정 (타이틀 + 기본 설정)
const SettingContainer = tw.div`
    my-5
`;

//SettingCore: 기본 설정 핵심
const SettingCore = tw.div`
    flex
    bg-[#EDEDED]
    rounded-xl
    p-3
`;

//SettingButton: 버튼
const SettingButton = tw.button`
    flex
    bg-[#EDEDED]
    rounded-xl
    p-3
    w-full
    items-center
    justify-center
    text-black

`;

//BasicVideo: 기본 설정 중 비디오 설정
const BasicVideo = tw.div`
    flex
    items-center
    justify-center
    w-1/2
`;

//BasicMic: 기본 설정 중 마이크 음소거 설정
const BasicMic = tw.div`
    flex
    items-center
    justify-center
    w-1/2
`;

//BasicSelect: 기본 설정 중 카메라 셀렉트 박스
const VideoSelect = tw.select`
    bg-[#442880]
    data-te-select-init
    
`;

//MicSelect: 기본 설정 중 마이크 셀렉트 박스
const MicSelect = tw.select`
    bg-[#442880]
    data-te-select-init
    
`;

//SettingImg: 이미지
const SettingImg = tw.img`
    w-5
    h-5
    mr-3
`;

const LockButton = tw.button`
  flex
  text-black
  mx-3
`;

const LockInput = tw.input`
w-[30%]
text-black
bg-gray-300
text-center
`;

//CountRange: 최대 인원 바
const CountRange = tw.input`
w-[90%]
`;

const CountMaxNumber = tw.p`
text-black
ml-2
`;

const SearchKeyword = tw.div`
relative
flex w-full

`;

const SearchInput = tw.input`
relative
m-0
block
min-w-0
flex-auto
rounded
border
border-solid
border-neutral-300
bg-transparent
bg-clip-padding
px-3
py-[0.25rem]
text-base
font-normal
leading-[1.6]
text-neutral-700
outline-none
transition
duration-200
ease-in-out
focus:z-[3]
focus:border-primary
focus:text-neutral-700
focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)]
focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary
`;

//저장버튼
const SaveButton = tw.button`
w-full

text-white
bg-gradient-to-r
from-purple-500
to-pink-500
hover:bg-gradient-to-l
focus:ring-4
focus:outline-none
focus:ring-purple-200
dark:focus:ring-purple-800
font-medium
rounded-lg
text-sm
px-5
py-2.5
text-center
me-2
mb-2
mt-3
`;

export const Setting = () => {
  //videoOn: 비디오 필수/선택
  const [videoOn, setVideoOn] = React.useState<string>("1");

  //micMuteOn: 마이크 뮤트 필수/선택
  const [micMuteOn, setmicMuteOn] = React.useState<string>("1");

  //isLock: 방 잠금 유무
  const [isLock, setIsLock] = React.useState<boolean>(false);

  //lockPwd: 방 잠금시 패스워드
  const [lockPwd, setLockPwd] = React.useState<string>("");

  //maxCount: 최대 인원
  const [maxCount, setMaxCount] = React.useState<number>(30);

  const [keyword, setKeyword] = React.useState<string>("");

  const handleVideoSelect: React.ChangeEventHandler<HTMLSelectElement> =
    function (e) {
      setVideoOn(e.target.value);
    };

  const handleMicSelect: React.ChangeEventHandler<HTMLSelectElement> =
    function (e) {
      setmicMuteOn(e.target.value);
    };

  const handleIsLock = function () {
    setIsLock(!isLock);
  };

  const handleLockPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLockPwd(e.target.value);
  };

  const handlermaxCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxCount(Number(e.target.value));
  };

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleTmpCheck = function () {
    console.log("video :" + videoOn);
    console.log("micMute :" + micMuteOn);
    console.log("잠금 유무 :" + isLock);
    console.log("패스워드:" + lockPwd);
    console.log("최대인원:" + maxCount);
  };

  const handleTmpCheck2 = function () {
    console.log("키워드 검색: " + keyword);
  };

  return (
    <SettingAll>
      {/* 방 기본 설정 - 카메라, 마이크 */}
      <SettingContainer>
        <Title>방 기본 설정</Title>
        <SettingCore className="justify-between">
          <BasicVideo>
            <SettingImg src={VideoBlack} alt="비디오유무" />
            <VideoSelect value={videoOn} onChange={handleVideoSelect}>
              <option value="1">필수</option>
              <option value="2">선택</option>
            </VideoSelect>
          </BasicVideo>
          <BasicMic>
            <SettingImg src={MicMute} alt="마이크음소거유무" />
            <MicSelect value={micMuteOn} onChange={handleMicSelect}>
              <option value="1">필수</option>
              <option value="2">선택</option>
            </MicSelect>
          </BasicMic>
        </SettingCore>
      </SettingContainer>

      {/* 방 잠금 설정 */}
      <SettingContainer>
        <Title>방 잠금 설정</Title>
        {isLock ? (
          <SettingCore>
            <LockButton onClick={handleIsLock}>
              <SettingImg src={LockSvg} />
              비밀번호 설정
            </LockButton>
            <LockInput type="text" value={lockPwd} onChange={handleLockPwd} />
          </SettingCore>
        ) : (
          <SettingButton onClick={handleIsLock}>
            <SettingImg src={Unlock} />
            잠금 안 함
          </SettingButton>
        )}
      </SettingContainer>

      {/* 방 최대 인원수 설정 */}
      <SettingContainer>
        <Title>방 최대 인원수 설정</Title>
        <SettingCore>
          <CountRange
            type="range"
            onChange={handlermaxCount}
            min="0"
            max="30"
          />
          <CountMaxNumber>{maxCount}</CountMaxNumber>
        </SettingCore>
      </SettingContainer>

      {/* 방 키워드 설정 */}
      <SettingContainer>
        <Title>방 키워드 설정</Title>
        <SettingCore>
          <SearchKeyword>
            <SearchInput
              type="search"
              placeholder="검색"
              value={keyword}
              onChange={handleKeyword}
            />
            <button onClick={handleTmpCheck2}>
              <SettingImg src={Search} className="ml-2" />
            </button>
          </SearchKeyword>
        </SettingCore>
      </SettingContainer>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <SaveButton type="button" onClick={handleTmpCheck}>
          저장
        </SaveButton>
      </div>
    </SettingAll>
  );
};
