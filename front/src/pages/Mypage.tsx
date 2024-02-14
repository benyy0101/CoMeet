import React, { useState, useEffect } from "react";
import MyProfile from "components/Mypage/MyProfile";
import MyKeyword from "components/Mypage/MyKeyword";
import { MyStudyType } from "components/Mypage/MyStudyType";
import { MyStudyTime } from "components/Mypage/MyStudyTime";
import MyTILCalendar from "components/Mypage/MyTILCalendar";
import MySumTime from "components/Mypage/MySumTime";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import tw from "tailwind-styled-components";
import { MemberQuery } from "models/Member.interface";
import { handleMember } from "api/Member";
import { useSelector } from "react-redux";

import axios from "axios";

export const Mypage = () => {
  //id 리덕스에서 가져오고
  const userId = useSelector((state: any) => state.user.user.memberId);

  const params = useParams();

  const memberId: string = params.memberId || "";

  //들어온 게 내 페이지인지 아닌지
  const [isMe, setIsMe] = useState<boolean>(false);
  const [userData, setUserData] = useState<MemberQuery | null>(null);
  const [isChange, setisChange] = useState<boolean>(false);

  //처음에 memeberId로 다 들고와
  const fetchData = async () => {
    //console.log(memberId);
    const res = await handleMember(memberId);
    setUserData(res); // 데이터 상태로 설정
  };

  //시작할 때 데이터 다 들고와
  useEffect(() => {
    fetchData();

    if (memberId === userId) {
      setIsMe(true);
    }
  }, [memberId]);

  //프로필 이미지 바뀌면 새로 고침
  useEffect(() => {
    if (isChange) {
      fetchData();
      setisChange(false);
    }
  }, [isChange]);

  const handleChange = () => {
    setisChange(!isChange);
  };

  return (
    <AllContainer>
      {/* 왼쪽 부분 - 프로필, 키워드, 공부타입, 공부타임 */}
      <FirstContainerLeft>
        {/* 프로필 컨테이너 */}
        <ProfileContainer>
          <MyProfile
            isMe={isMe}
            profileImage={userData?.profileImage}
            followingCount={userData?.followingCount}
            followerCount={userData?.followerCount}
            nickname={userData?.nickname}
            description={userData?.description}
            link={userData?.link}
            handleChange={handleChange}
          />
        </ProfileContainer>
        {/* 프로필 밑의 컨테이너 - 키워드, 공부타입, 공부타임 */}
        <SecondContainer>
          {/* 키워드 컨테이너 */}
          <KeywordContainer>
            <MyKeyword keywords={userData?.keywords} />
          </KeywordContainer>
          {/* 키워드 오른쪽 컨테이너 - 공부타입, 공부타임 */}
          <ThirdContainer>
            {/* 공부 타입 컨테이너 */}
            <StudyTypeContainer>
              <MyStudyType feature={userData?.feature} />
            </StudyTypeContainer>
            {/* 공부 시간 컨테이너 */}
            <StudyTimeContainer>
              <MyStudyTime mostStudyTime={userData?.mostStudyTime} />
            </StudyTimeContainer>
          </ThirdContainer>
        </SecondContainer>
      </FirstContainerLeft>
      {/* 오른쪽 부분 - 캘린더, 평균 시간 */}
      <FirstContainerRight>
        {/* TIL 캘린더 컨테이너 */}
        <TILCalendarContainer>
          <MyTILCalendar isMe={isMe} memberId={memberId} />
        </TILCalendarContainer>
        {/* 공부 합계 시간 컨테이너 */}
        <SumTimeContainer>
          <MySumTime
            dayStudyHour={userData?.dayStudyHour}
            weekStudyHour={userData?.weekStudyHour}
            monthStudyHour={userData?.monthStudyHour}
          />
        </SumTimeContainer>
      </FirstContainerRight>
    </AllContainer>
  );
};

// 마이페이지 전체 컨테이너
// h 고쳐야 함
const AllContainer = tw.div`
flex
h-[120vh]
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
h-[30%]
mb-5
rounded-xl
bg-[#3C334D]
`;

// 키워드, 공부타입, 공부시간 들어 있는 컨테이너
const SecondContainer = tw.div`
flex
h-[67%]
`;

// 키워드 컨테이너
const KeywordContainer = tw.div`
bg-[#3C334D]
w-[50%]
mr-5
rounded-xl
`;

// 공부타입, 공부시간 들어있는 컨테이너
const ThirdContainer = tw.div`
w-[50%]
flex
flex-col
`;

// 공부 타입 컨테이너
const StudyTypeContainer = tw.div`
flex-1
rounded-xl
bg-[#3C334D]
mb-5
`;

// 공부 시간 컨테이너
const StudyTimeContainer = tw.div`
flex-1
rounded-xl
bg-[#3C334D]
`;

// TIL 캘린더 컨테이너
const TILCalendarContainer = tw.div`
h-[65%]
mb-5
rounded-xl
bg-[#3C334D]
`;

// 공부 합계 시간 컨테이너
const SumTimeContainer = tw.div`
h-[32%]
rounded-xl
bg-[#3C334D]
`;
