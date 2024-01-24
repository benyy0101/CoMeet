import React from "react";
import { MyProfile } from "../components/MyProfile";
import { MyKeyword } from "../components/MyKeyword";
import { MyStudyType } from "../components/MyStudyType";
import { MyStudyTime } from "../components/MyStudyTime";
import { MyTILCalendar } from "../components/MyTILCalendar";
import { MyAvgTime } from "../components/MyAvgTime";

import tw from "tailwind-styled-components";

export const Mypage = () => {
  return (
    <AllContainer>
      {/* 왼쪽 부분 - 프로필, 키워드, 공부타입, 공부타임 */}
      <FirstContainerLeft>
        {/* 프로필 컨테이너 */}
        <ProfileContainer>
          <MyProfile />
        </ProfileContainer>
        {/* 프로필 밑의 컨테이너 - 키워드, 공부타입, 공부타임 */}
        <SecondContainer>
          {/* 키워드 컨테이너 */}
          <KeywordContainer>
            <MyKeyword />
          </KeywordContainer>
          {/* 키워드 오른쪽 컨테이너 - 공부타입, 공부타임 */}
          <ThirdContainer>
            {/* 공부 타입 컨테이너 */}
            <StudyTypeContainer>
              <MyStudyType />
            </StudyTypeContainer>
            {/* 공부 시간 컨테이너 */}
            <StudyTimeContainer>
              <MyStudyTime />
            </StudyTimeContainer>
          </ThirdContainer>
        </SecondContainer>
      </FirstContainerLeft>
      {/* 오른쪽 부분 - 캘린더, 평균 시간 */}
      <FirstContainerRight>
        {/* TIL 캘린더 컨테이너 */}
        <TILCalendarContainer>
          <MyTILCalendar />
        </TILCalendarContainer>
        {/* 평균 공부 시간 컨테이너 */}
        <AvgTimeContainer>
          <MyAvgTime />
        </AvgTimeContainer>
      </FirstContainerRight>
    </AllContainer>
  );
};

// 마이페이지 전체 컨테이너
// h 고쳐야 함
const AllContainer = tw.div`
flex
h-[93vh]
px-10
py-2
bg-[#180E2C]
`;

// 프로필/키워드/공부타입/공부시간 컨테이너
// w 값, 마진 값들 바꿔야 함
const FirstContainerLeft = tw.div`
flex-col
w-[55%]

mr-7
ml-10
my-5
`;

// TIL/평균공부시간 컨테이너
// w 값, 마진 값들 바꿔야 함
const FirstContainerRight = tw.div`
flex-col
w-[45%]

ml-7
mr-10
my-5
`;

// 프로필 컨테이너
const ProfileContainer = tw.div`
h-[33%]
mb-5
rounded-xl
bg-[#3C334D]
`;

// 키워드, 공부타입, 공부시간 들어 있는 컨테이너
const SecondContainer = tw.div`
flex
h-[64%]
`;

// 키워드 컨테이너
const KeywordContainer = tw.div`
border-2
border-blue-500
w-[50%]
mr-5
rounded-xl
`;

// 공부타입, 공부시간 들어있는 컨테이너
const ThirdContainer = tw.div`
w-[50%]
`;

// 공부 타입 컨테이너
const StudyTypeContainer = tw.div`
mb-5
h-[47.5%]
border-2
border-yellow-500
rounded-xl
`;

// 공부 시간 컨테이너
const StudyTimeContainer = tw.div`
h-[47.5%]
border-2
border-yellow-500
rounded-xl
`;

// TIL 캘린더 컨테이너
const TILCalendarContainer = tw.div`
h-[62%]
border-2
border-green-500
mb-5
rounded-xl
`;

// 공부 평균 시간 컨테이너
const AvgTimeContainer = tw.div`
h-[35%]
border-2
border-green-500
rounded-xl
`;
