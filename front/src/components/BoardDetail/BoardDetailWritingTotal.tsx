import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";

import { BoardDetailHeader } from "./BoardDetailHeader";
import { BoardDetailRoomInfo } from "./BoardDetailRoomInfo";

import StarFill from "assets/img/star-fill.svg";
import StarEmpty from "assets/img/star-empty.svg";
import { KeywordComponent } from "./KeywordComponent";
import { BOARD_TYPE, FREE_BOARD_CATEGORY, RECRUIT_BOARD_CATEGORY } from "models/Enums.type";
import { EnterBoardResponse } from "models/Board.interface";
import { useQuery } from "@tanstack/react-query";
import { enterBoard } from "api/Board";

type BoardDetailProps = {
  boardId: number;
};

export const BoardDetailWritingTotal = (props: BoardDetailProps) => {
  const [likecount, setLikecount] = useState<number>(0);
  const dummy: EnterBoardResponse = {
    id: 0,
    title: "title",
    content: "내용",
    likeCount: 0,
    type: "RECRUIT",
    category: null,
    isValid: true,
    roomKeywords: [],
    roomTitle: "이건 테스d트",
    roomDescription: "요요",
    roomMcount: 1,
    roomCapacity: 10,
    roomImage: "default_room_image_letsgo",
    isLocked: false,
    writerNickname: "nickname2",
    writerImage: "",
    isLike: false,
    createdAt: "2024-02-10 03:42",
    updatedAt: "2024-02-10 03:42",
  };
  const [boardDetail, setBoardDetail] = useState<EnterBoardResponse>(dummy);
  //키워드는 이름만 있어도 된다
  const [keywordArr, setKeywordArr] = useState<string[]>([]);

  const { data: boardDetailData } = useQuery<EnterBoardResponse, Error>({
    queryKey: ["boardDetail", JSON.stringify(props.boardId)],
    queryFn: () => {
      const { boardId } = props;
      return enterBoard({ boardId });
    },
  });

  useEffect(() => {
    if (boardDetailData) {
      console.log("if query ended", boardDetailData);
      setBoardDetail(boardDetailData);
      setKeywordArr(boardDetailData.roomKeywords.map((data) => data.name));
    }
  }, [boardDetailData]);

  //여기까지가 방 조회시 받아오는 데이터들
  //키워드 가져와야 함 -
  // let roomKeyword: number[] = [];

  //방 번호 있으면
  // if (roomId.length != 0) {
  //   //키워드는 키워드 인덱스로 받아오나
  //   roomKeyword = [123, 123123];
  // }

  // const keywordList = roomKeyword.map((keyword) => <KeywordComponent keyword={keyword} />);

  //좋아요 했는지
  // const [isLiked, setIsLiked] = useState<boolean>(like);

  //좋아요 누르면 +1 해서 렌더링 되게 (임시)
  const [likecountPlus, setLikecountPlus] = useState<number>(likecount);

  //쁠마만 하고, 매번 api 날리는 걸로 하자
  const handleLike = () => {
    if (boardDetail.isLike) {
      setLikecountPlus((current) => current - 1);
    } else {
      setLikecountPlus((current) => current + 1);
    }
    boardDetail.isLike = !boardDetail.isLike;

    // setIsLiked(!boardDetail.isLike);
  };

  return (
    <WritingTotalContainer>
      <BoardDetailHeader
        nickname={boardDetail.writerNickname}
        title={boardDetail.title}
        likecount={likecountPlus}
        category={boardDetail.category}
        valid={boardDetail.isValid}
        createdAt={boardDetail.createdAt}
        isLiked={boardDetail.isLike}
      />
      {/* 게시글 타입이 모집게시판일 경우에만 방 정보 보여줌 */}
      {boardDetail.type === "RECRUIT" ? (
        <BoardDetailRoomInfo
          roomTitle={boardDetail.roomTitle}
          roomDescription={boardDetail.roomDescription}
          roomMCount={boardDetail.roomMcount!}
          roomCapacity={boardDetail.roomCapacity}
          roomLink={boardDetail.roomLink!}
        ></BoardDetailRoomInfo>
      ) : null}

      <ContentContainer>{boardDetail.content}</ContentContainer>

      {/* 모집게시판이면 방 키워드 가져옴 */}
      {boardDetail.type === "RECRUIT" ? <KeywordContainer>{keywordArr}</KeywordContainer> : null}

      <LikeButtonContainer>
        <LikeButton onClick={handleLike}>
          {boardDetail.isLike ? (
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
