import React, { useState } from "react";
import tw from "tailwind-styled-components";

import { BoardDetailHeader } from "./BoardDetailHeader";
import { BoardDetailRoomInfo } from "./BoardDetailRoomInfo";

import StarFill from "../assets/img/star-fill.svg";
import StarEmpty from "../assets/img/star-empty.svg";
import { KeywordComponent } from "./KeywordComponent";

export const BoardDetailWritingTotal = () => {
  //임시
  //방 조회시 받아오는 데이터들
  //작성자 닉네임
  const nickname: string = "마스터";
  //제목
  const title: string = "알고리즘 스터디 ";
  //본문
  const context: string = "서울 5반 알고리즘 스터디 들어오세여";
  //좋아요 수
  const likecount: number = 20;

  //게시글 타입 - 모집/자유
  const boardType: string = "recruit";

  //자유게시판의 카테고리 - CHAT/TIP/QUESTION/PROMOTION
  const cateogory: string = "";

  //방 Id
  const roomId: string = "10";
  //모집중 여부
  const valid: boolean = true;
  //작성 날짜
  const createdAt: string = "2024-01-26";
  //글을 보는 유저가 해당 글을 좋아요 했는지 유무
  const like: boolean = false;
  //여기까지가 방 조회시 받아오는 데이터들

  //키워드 가져와야 함 -
  let roomKeyword: number[] = [];

  //방 번호 있으면
  if (roomId.length != 0) {
    //키워드는 키워드 인덱스로 받아옴
    roomKeyword = [123, 123123];
  }

  const keywordList = roomKeyword.map((keyword) => (
    <KeywordComponent keyword={keyword} />
  ));

  //좋아요 했는지
  const [isLiked, setIsLiked] = useState<boolean>(like);

  //좋아요 누르면 +1 해서 렌더링 되게 (임시)
  const [likecountPlus, setLikecountPlus] = useState<number>(likecount);

  const handleLike = () => {
    if (isLiked == true) {
      console.log("좋아요");
      setLikecountPlus((current) => current - 1);
    } else {
      setLikecountPlus((current) => current + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <WritingTotalContainer>
      <BoardDetailHeader
        nickname={nickname}
        title={title}
        likecount={likecountPlus}
        category={cateogory}
        valid={valid}
        createdAt={createdAt}
        isLiked={isLiked}
      />
      {/* 게시글 타입이 모집게시판일 경우에만 방 정보 보여줌 */}
      {boardType === "recruit" ? <BoardDetailRoomInfo roomId={roomId} /> : null}

      <ContentContainer>{context}</ContentContainer>

      {/* 모집게시판이면 방 키워드 가져옴 */}
      {boardType === "recruit" ? (
        <KeywordContainer>{keywordList}</KeywordContainer>
      ) : null}

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

const KeywordContainer = tw.div`
flex
ml-10
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
