import React from "react";
import BasicProfile from "../assets/img/basic-profile.svg";

import tw from "tailwind-styled-components";

//css

//StyleMemberOne: 하나의 멤버
const StyleMemberOne = tw.div`
    flex
    items-center
    p-2

`;

//StyleNicTimeBoth: 닉네임, 시간 그래프, 시간 블럭
const StyleNicTimeBoth = tw.div`
`;

//StyleMemberProfileImg: 멤버 프로필이미지
const StyleMemberProfileImg = tw.img`
    bg-white
    rounded-full
    w-10
    h-10
    mr-3
`;

//StyleMemberNicName: 멤버 닉네임
const StyleMemberNicName = tw.p`
    font-semibold
    text-sm
`;

//StyleMemberTime: 멤버의 공부 시간
const StyleMemberTime = tw.p`
    text-xs
`;

export const Member = () => {
  //변수들 전부 예시
  const profileImg = BasicProfile;
  const nickName = "망곰이";
  const timeGraph = 150;
  const time = 150; //분 기준

  return (
    <div>
      <StyleMemberOne>
        {/* 프로필 사진 */}
        <StyleMemberProfileImg src={profileImg} alt="프로필이미지" />

        <StyleNicTimeBoth>
          {/* 닉네임 */}
          <StyleMemberNicName>{nickName}</StyleMemberNicName>

          {/* 시간 그래프 */}
          <p className="text-xs">(그래프------------)</p>

          {/* 시간 표시 */}
          <StyleMemberTime>
            {Math.floor(time / 60)}시간 {time - Math.floor(time / 60) * 60}분
          </StyleMemberTime>
        </StyleNicTimeBoth>
      </StyleMemberOne>
      <hr className="h-0.2" />
    </div>
  );
};
