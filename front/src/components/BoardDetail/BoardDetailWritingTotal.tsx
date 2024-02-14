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
import { deleteBoard, enterBoard, likeBoard, unlikeBoard } from "api/Board";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

type BoardDetailProps = {
  boardId: number;
};

export const BoardDetailWritingTotal = (props: BoardDetailProps) => {
  const { boardId } = props;
  const memberNickname = useSelector((state: any) => state.user.user.nickname);
  const navigate = useNavigate();
  const [viewerContent, setViewerContent] = useState<string | undefined>(undefined);

  const dummy: EnterBoardResponse = {
    id: 0,
    writerId: "",
    title: "title",
    content: "",
    likeCount: 0,
    type: "RECRUIT",
    category: null,
    isValid: true,
    roomKeywords: [],
    roomTitle: "이건 테스d트",
    roomDescription: "요ㄴㄴ요",
    roomMcount: 1,
    roomId: 1,
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
      return enterBoard({ boardId });
    },
  });

  useEffect(() => {
    if (boardDetailData) {
      console.log("if query ended", boardDetailData);
      setBoardDetail(boardDetailData!);
      if (boardDetailData.type === "RECRUIT")
        setKeywordArr(boardDetailData.roomKeywords.map((data) => data.name));
    }
  }, [boardDetailData]);

  const handleLike = () => {
    const likeValue = !boardDetail.isLike ? 1 : -1;
    // api 매번 누를때마다 날리게 돼있음
    !boardDetail.isLike ? likeBoard({ boardId }) : unlikeBoard({ boardId });
    setBoardDetail({
      ...boardDetail,
      isLike: !boardDetail.isLike,
      likeCount: boardDetail.likeCount + likeValue,
    });
  };

  const handleDelete = () => {
    deleteBoard({ boardId: boardDetail.id })
      .then((data) => {
        console.log("success");
        navigate(boardDetail.type === "FREE" ? "/free-board" : "/recruit-board");
      })
      .catch((fail) => {
        console.log("failure", fail.response.data);
        return fail;
      });
  };

  const viewerStyle = {
    background: "none",
  };

  useEffect(() => {
    if (boardDetail.content) {
      setViewerContent(boardDetail.content);
    }
  }, [boardDetail.content]);

  return (
    <WritingTotalContainer>
      <BoardDetailHeader
        writerId={boardDetail.writerId}
        writerImg={boardDetail.writerImage}
        nickname={boardDetail.writerNickname}
        title={boardDetail.title}
        likecount={boardDetail.likeCount}
        category={boardDetail.category}
        valid={boardDetail.isValid}
        createdAt={boardDetail.createdAt}
        isLiked={boardDetail.isLike}
      />
      {/* 게시글 타입이 모집게시판일 경우에만 방 정보 보여줌 */}
      {boardDetail.type === "RECRUIT" ? (
        <BoardDetailRoomInfo
          roomImg={boardDetail.roomImage}
          roomTitle={boardDetail.roomTitle}
          roomDescription={boardDetail.roomDescription}
          roomMCount={boardDetail.roomMcount!}
          roomCapacity={boardDetail.roomCapacity}
          roomId={boardDetail.roomId}
          roomLink={boardDetail.roomLink!}
        ></BoardDetailRoomInfo>
      ) : null}

      <ContentContainer>
        {boardDetail.content != "" ? (
          <Viewer initialValue={boardDetail.content} theme="dark" />
        ) : null}
      </ContentContainer>

      {/* 모집게시판이면 방 키워드 가져옴 */}
      <KeywordContainer>
        {boardDetail.type === "RECRUIT"
          ? keywordArr.map((words) => <Keyword key={words}>{words}</Keyword>)
          : null}
      </KeywordContainer>

      <ButtonsContainer>
        {/* 버튼 태그 어케 만드는데 ㅠ */}
        {memberNickname === boardDetail.writerNickname ? (
          <LikeButtonContainer>
            <LikeButton onClick={handleDelete}>
              <LikeText className="text-red-400">삭제</LikeText>
            </LikeButton>
          </LikeButtonContainer>
        ) : null}
        {/* 버튼 태그 어케 만드는데 ㅠ */}
        {memberNickname === boardDetail.writerNickname ? (
          <LikeButtonContainer>
            <LikeButton>
              <Link
                to={`/write-article?type=${boardDetail.type}&option=edit`}
                state={{
                  editId: boardDetail.id,
                  editTitle: boardDetail.title,
                  editContent: boardDetail.content,
                  isValid: boardDetail.isValid,
                  editCategory: boardDetail.category,
                }}
              >
                <LikeText className="text-lime-400">수정</LikeText>
              </Link>
            </LikeButton>
          </LikeButtonContainer>
        ) : null}

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
      </ButtonsContainer>
    </WritingTotalContainer>
  );
};

//작성 글 전체
const WritingTotalContainer = tw.div`
w-full
h-full
`;

//내용 부분
const ContentContainer = tw.div`
rounded-md
p-5
my-5
mx-5
break-words
`;

const ButtonsContainer = tw.div`
flex
items-end
justify-end
space-x-5
`;

const KeywordContainer = tw.div`
flex
ml-10
space-x-3
`;

const Keyword = tw.div`
bg-gradient-to-br
from-cyan-950
to-blue-950
p-2
px-3
rounded-md
shadow-lg
text-white
`;

//좋아요 버튼 컨테이너
const LikeButtonContainer = tw.div`
flex

`;

const LikeButton = tw.button`
flex
p-2
rounded-md
focus:bg-[#1F1C29]
hover:bg-[#282436]
focus:text-white
transition
text-white
`;

const LikeImg = tw.img`
w-5
h-5
`;

const LikeText = tw.div`
text-sm
`;
