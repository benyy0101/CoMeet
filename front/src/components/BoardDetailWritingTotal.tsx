import React, { useState } from "react";
import tw from "tailwind-styled-components";

import { BoardDetailHeader } from "./BoardDetailHeader";
import { BoardDetailRoomInfo } from "./BoardDetailRoomInfo";

import StarFill from "../assets/img/star-fill.svg";
import StarEmpty from "../assets/img/star-empty.svg";

export const BoardDetailWritingTotal = () => {
  //임시
  //본문
  const context = "서울 5반 알고리즘 스터디 들어오세여";

  //글을 보는 유저가 해당 글을 좋아요 했는지 유무
  const like = false;

  //좋아요 했는지 - 이거 user에 추가해야 하나?
  const [isLiked, setIsLiked] = useState<boolean>(like);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <WritingTotalContainer>
      <BoardDetailHeader isLiked={isLiked} />
      <BoardDetailRoomInfo />
      <ContentContainer>{context}</ContentContainer>
      <LikeButtonContainer>
        <LikeButton onClick={handleLike}>
          {isLiked ? (
            <LikeImg src={StarFill} alt="" />
          ) : (
            <LikeImg src={StarEmpty} alt="" />
          )}
          <LikeText>좋아요</LikeText>
        </LikeButton>
      </LikeButtonContainer>
    </WritingTotalContainer>
  );
};

//작성 글 전체
const WritingTotalContainer = tw.div`
text-white

`;

//내용 부분
const ContentContainer = tw.div`
m-10
break-words
`;

//좋아요 버튼 컨테이너
const LikeButtonContainer = tw.div`
flex
justify-end
mr-5
mb-5

`;

const LikeButton = tw.button`
flex
p-1
rounded-md
focus:bg-[#1F1C29]
hover:bg-[#282436]
focus:text-white
transition
`;

const LikeImg = tw.img`
w-5
h-5
`;

const LikeText = tw.div`
ml-1
text-sm
`;
