// 게시글 제목, 작성자 닉네임, 제목, 좋아요 수, 모집중 여부,
// 방 Id, 키워드들, 작성 날짜

import React, { useState } from "react";

import tw from "tailwind-styled-components";

import StarFill from "../assets/img/star-fill.svg";
import StarEmpty from "../assets/img/star-empty.svg";

export const BoardDetailHeader: React.FC<{
  isLiked: boolean;
}> = (props) => {
  //모두 받아오는 데이터들
  //작성자 ID
  const writerId = "movingGun";
  //작성자 닉네임
  const nickname = "마스터";
  //제목
  const title = "알고리즘 스터디 ";
  //본문
  const context = "서울 5반 알고리즘 스터디 들어오세여";
  //좋아요 수
  const likecount = 20;
  //게시글 타입 - 모집/자유
  const type = "recruit";
  //모집중 여부
  const valid = true;
  //방 Id
  const roomId = "10";
  //키워드들
  const keywords = "java springBoot";
  //작성 날짜
  const createdAt = "2024-01-26";

  //글을 보는 유저가 해당 글을 좋아요 했는지 유무
  // const like = false;

  //방 유효한지
  const [isValid, setIsValid] = useState<boolean>(valid);

  //좋아요 했는지 - 이거 user에 추가해야 하나?
  // const [isLiked, setIsLiked] = useState<boolean>(like);

  return (
    <HeaderTotalContainer>
      <TitleTotalContainer>
        <Title>{title}</Title>
        {isValid ? (
          <RecruitTrue>모집중</RecruitTrue>
        ) : (
          <RecruitFalse>모집완료</RecruitFalse>
        )}
      </TitleTotalContainer>
      <EtcContainer>
        <NicnameContainer>{nickname}</NicnameContainer>
        <DateContainer>{createdAt}</DateContainer>
        <LikeContatiner>
          {props.isLiked ? (
            <LikeImg src={StarFill} alt="" />
          ) : (
            <LikeImg src={StarEmpty} alt="" />
          )}
          {likecount}
        </LikeContatiner>
      </EtcContainer>
    </HeaderTotalContainer>
  );
};

//헤더 전체
const HeaderTotalContainer = tw.div`
flex
flex-col
h-[100px]
mb-4

`;

//제목 부분 컨테이너 (모집중 / 모집 완료 포함)
const TitleTotalContainer = tw.div`
items-end
flex-grow
flex
pb-3
px-5
border-b
`;

//제목
const Title = tw.div`
text-2xl
font-bold
`;

//모집중
const RecruitTrue = tw.div`
ml-5
text-blue-500
`;

//모집 완료
const RecruitFalse = tw.div`
ml-5
text-red-500
`;

//닉네임, 날짜, 좋아요수 나타내는 컨테이너
const EtcContainer = tw.div`
flex
items-end
ml-5
mt-2
`;

//이름
const NicnameContainer = tw.div`

`;

//날짜
const DateContainer = tw.div`
ml-10

`;

const LikeImg = tw.img`
w-[17px]
h-[17px]
mr-1
`;

//좋아요 수
const LikeContatiner = tw.div`
ml-7
flex
items-center
`;
