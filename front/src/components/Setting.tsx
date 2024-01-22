import React, { ChangeEventHandler, useEffect } from "react";

import tw from "tailwind-styled-components";

import VideoBlack from "../assets/img/video-black.svg";
import MicMute from "../assets/img/mic-mute.svg";
import LockSvg from "../assets/img/lock-svg.svg";
import Unlock from "../assets/img/unlock.svg";

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
    rounded-lg
    p-3
`;

//SettingButton: 버튼
const SettingButton = tw.button`
    flex
    bg-[#EDEDED]
    rounded-lg
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
    w-6
    h-6
    mr-3
`;

//CountRange: 최대 인원 바
const CountRange = tw.input`
w-[90%]
`;

const CountMaxNumber = tw.p`
text-black
ml-2
`;

export const Setting = () => {
  //videoOn: 비디오 필수/선택
  const [videoOn, setVideoOn] = React.useState<string>("1");

  //micMuteOn: 마이크 뮤트 필수/선택
  const [micMuteOn, setmicMuteOn] = React.useState<string>("1");

  //isLock: 방 잠금 유무
  const [isLock, setIsLock] = React.useState<boolean>(false);

  //lockPwd: 방 잠금시 패스워드
  const [lockPwd, setLockPwd] = React.useState<string>("0000");

  //maxCount: 최대 인원
  const [maxCount, setMaxCount] = React.useState<number>(30);

  const handleVideoSelect: React.ChangeEventHandler<HTMLSelectElement> =
    function (e) {
      setVideoOn(e.target.value);
    };

  const handleMicSelect: React.ChangeEventHandler<HTMLSelectElement> =
    function (e) {
      setmicMuteOn(e.target.value);
    };

  const handleIsLock = function () {
    setIsLock(true);
  };

  const handlermaxCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxCount(Number(e.target.value));
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
        <SettingButton>
          <SettingImg src={Unlock} />
          잠금 안 함
        </SettingButton>
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
      <div>
        <Title>방 키워드 설정</Title>
        <SettingButton>
          <p>검색</p>
        </SettingButton>
      </div>

      <button>완료</button>
    </SettingAll>
  );
};
