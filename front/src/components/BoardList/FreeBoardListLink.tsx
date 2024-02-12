import React from "react";
import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import { BoardListProps } from "types";

import StarFill from "assets/img/star-fill.svg";
import HotBoardIcon from "assets/img/hot-board.svg";
import TipBoardIcon from "assets/img/tip-board.svg";
import PromBoardIcon from "assets/img/promotion-board.svg";
import AskBoardIcon from "assets/img/ask-board.svg";
import { SearchBoardContent } from "models/Board.interface";

export const FreeBoardListLink = (props: SearchBoardContent) => {
  let category = "";
  let icon = "";
  switch (props.category) {
    case "CHAT":
      category = "잡담";
      icon = TipBoardIcon;
      break;
    case "TIP":
      category = "팁";
      icon = TipBoardIcon;
      break;
    case "PROMOTION":
      category = "구인구직";
      icon = PromBoardIcon;
      break;
    case "QUESTION":
      category = "질문하기";
      icon = AskBoardIcon;
      break;
  }

  return (
    <Link to="/free-board/1">
      <TotalContainer>
        <CenterContainer>
          <TitleAndCategoryContainer>
            <BoardTitle>{props.title}</BoardTitle>
            <CategoryImgIcon src={icon} alt="" />
            <div className="text-sm mr-4">{category}</div>
          </TitleAndCategoryContainer>
          <div className="flex">
            <WriterContainer>
              <WriterImg src={props.writerImage} alt="wrtierImg" />
              <WriterNicname>{props.writerNickname}</WriterNicname>
            </WriterContainer>
            <WriteDate>{props.createdAt}</WriteDate>
            <LikeContatiner>
              <LikeImg src={StarFill} alt="" />
              {/* {props.isLiked ? (
        ) : (
          <LikeImg src={StarEmpty} alt="" />
        )} */}
              {/* useState로 likecount 관리 */}
              {props.likeCount}
            </LikeContatiner>
          </div>
        </CenterContainer>
      </TotalContainer>
    </Link>
  );
};

//전체
const TotalContainer = tw.div`
flex
border-b
border-gray-600
h-[106px]
`;

//모든 값 다 들어 있는 가운데 컨테이너
const CenterContainer = tw.div`
flex
flex-col
flex-grow
items-start

m-3
justify-between

`;

//글 제목 컨테이너
const TitleAndCategoryContainer = tw.div`
flex
ml-1
items-center
`;

// 글 제목
const BoardTitle = tw.div`
text-[18px]
font-bold
mr-5
`;

//카테고리 이미지 아이콘
const CategoryImgIcon = tw.img`
w-6
h-6
mr-2
`;

// 작성자 프로필 컨테이너
const WriterContainer = tw.div`
flex
items-center
`;

// 작성자 프로필 이미지
const WriterImg = tw.img`
w-6
h-6
rounded-full
mr-2
`;

// 작성자 닉네임
const WriterNicname = tw.div`
text-[14px]
mr-5
`;

// 작성 날짜
const WriteDate = tw.div`
py-1
`;

//좋아요 컨테이너
const LikeContatiner = tw.div`
ml-5
flex
items-center
`;

const LikeImg = tw.img`
w-[17px]
h-[17px]
mr-1
`;
