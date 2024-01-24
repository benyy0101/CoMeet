import React from "react";

import tw from "tailwind-styled-components";

import ProifleImg from "../assets/img/test-user.jpeg";
import ProifleModify from "../assets/img/profile-modify.svg";

export const MyProfile = () => {
  //임시 데이터들
  const followingNum = 152;
  const followerNum = 20;
  const nickName = "망곰이";
  const message = "프론트엔드 지망생입니다! 잘 부탁드려용";
  const url = "http://github.com/mangmang";
  const recentTime = "2024-01-23";

  return (
    <TotalContainer>
      <ProfileModButton>
        <ProfileModImg src={ProifleModify} alt="" />
      </ProfileModButton>
      <FullContainer>
        <LeftContainer>
          <StyleProfileImg src={ProifleImg} alt="" />
        </LeftContainer>
        <RightContainer>
          <FollowContainer>
            <SytleFollowing>
              <FollowText>팔로잉</FollowText>
              <FollowNumber>{followingNum}</FollowNumber>
            </SytleFollowing>
            <StyleFllower>
              <FollowText>팔로워</FollowText>
              <FollowNumber>{followerNum}</FollowNumber>
            </StyleFllower>
          </FollowContainer>
          <StyleNickName>{nickName}</StyleNickName>
          <StyleMessage>{message}</StyleMessage>
          <SytleUrl>
            <StyleA href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </StyleA>
          </SytleUrl>
        </RightContainer>
      </FullContainer>
      <RecentIn>최근 접속 시간: {recentTime}</RecentIn>
    </TotalContainer>
  );
};

//전체 컨테이너
const TotalContainer = tw.div`
w-full
h-full
text-white
flex
flex-col
`;

//수정 버튼
const ProfileModButton = tw.button`
self-end
mb-auto
`;

//수정 버튼 이미지
const ProfileModImg = tw.img`
w-7
h-7
pr-2
pt-2
`;

//정보 수정 버튼, 접속 시간 제외한 모든 컨테이너
const FullContainer = tw.div`
flex
flex-grow
`;

//프로필 이미지 보여주는 왼쪽 컨테이너
const LeftContainer = tw.div`
    ml-16
    mr-10
`;

//프로필 이미지
const StyleProfileImg = tw.img`
    bg-white
    rounded-full
    w-36
    h-36
    
    
`;

//팔로잉, 팔로우, 닉네임, 메세지, url 들어있는 오른쪽 컨테이너
const RightContainer = tw.div`
flex
flex-col
mt-3
`;

//팔로잉, 팔로우 나타내는 컨테이너
const FollowContainer = tw.div`
flex
mb-2
`;

//팔로잉
const SytleFollowing = tw.div`
flex
mr-3
`;

//팔로우
const StyleFllower = tw.div`
flex`;

//팔로잉, 팔로우 글씨
const FollowText = tw.div`
text-xs
mr-2
mt-1
`;

//팔로잉, 팔로우 숫자
const FollowNumber = tw.div`
font-semibold
text-sm
`;

//닉네임
const StyleNickName = tw.div`
font-extrabold
text-xl
mb-2
`;

//메세지
const StyleMessage = tw.div`
text-sm
mb-2
`;

//url
const SytleUrl = tw.div`
text-sm
`;

//url의 A태그
const StyleA = tw.a`
border-b
`;

//최근 접속 시간
const RecentIn = tw.div`
self-end
text-xs
pb-2
pr-2
text-[#9E9E9E]
`;
