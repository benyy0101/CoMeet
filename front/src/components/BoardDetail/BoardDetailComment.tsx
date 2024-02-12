import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { BoardCommentComponent } from "./BoardCommentComponent";
import {
  CreateCommentParams,
  SearchCommentContent,
  SearchCommentParams,
  SearchCommentResponse,
} from "models/Comments.interface";
import { useQuery } from "@tanstack/react-query";
import { createComment, searchComment } from "api/Comment";

type TotalCommentProps = {
  boardId: number;
};

// id: number;
// boardId: number;
// content: string;
// createdAt: string;
// updatedAt: string;
// writerNickname: string;

export const BoardDetailComment = (props: TotalCommentProps) => {
  const { boardId } = props;

  //댓글 달기 관련
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  //댓글 리스트 관련
  const [commentList, setCommentList] = useState<SearchCommentContent[]>([]);
  const [searchCommentParams, setSearchCommentParams] = useState<SearchCommentParams>({
    boardId: boardId,
    page: 0,
  });

  //무한스크롤 구현
  const pagesize = 10;
  //이 친구로 페이지가 바뀌었는지 판단함
  const numberOfElements = useRef<number>(0);

  const { data: QDcommentList } = useQuery<SearchCommentResponse, Error>({
    queryKey: ["commentList", JSON.stringify(searchCommentParams)],
    queryFn: () => searchComment(searchCommentParams),
  });

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  useEffect(() => {
    if (QDcommentList) {
      const newCommentList: SearchCommentContent[] = commentList.concat(
        QDcommentList.content.filter((item) => !commentList.includes(item))
      );
      numberOfElements.current = QDcommentList.numberOfElements;
      setCommentList(newCommentList);
    }
  }, [QDcommentList]);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      if (numberOfElements.current === pagesize) {
        searchCommentParams.page++;
      }
      setSearchCommentParams(searchCommentParams);
    }
  };

  const handleWrite = (e: React.FormEvent) => {
    e.preventDefault();
    if (contentRef.current?.value === "") {
      alert("글을 써주세요");
      return;
    }
    createComment({ boardId: boardId, content: contentRef.current!.value })
      .then((data) => console.log("success", data))
      .catch(() => console.log("failed"));
    contentRef.current!.value = "";
  };

  return (
    <CommentTotalContainer>
      <WriteCommentContainer>
        <CommentTitle>댓글</CommentTitle>
        <form onSubmit={handleWrite}>
          <CommentInputContainer>
            <CommentInput
              id="comment"
              rows={4}
              placeholder="댓글을 작성해주세요"
              required
              ref={contentRef}
            />
          </CommentInputContainer>
          <ButtonContainer>
            <SubmitButton type="submit">등록</SubmitButton>
          </ButtonContainer>
        </form>
      </WriteCommentContainer>
      {/* 댓글 부분들 - array로 받아와서 map 돌릴 부분 */}
      {commentList.map((comment) => (
        <BoardCommentComponent key={comment.id} {...comment} />
      ))}
      <div id="observer" style={{ height: "10px" }}>
        333
      </div>
    </CommentTotalContainer>
  );
};

const CommentTotalContainer = tw.div`

  text-white
  `;

const WriteCommentContainer = tw.div`
  mx-7
  mb-7
`;

//'댓글'
const CommentTitle = tw.div`
mb-2
text-base
font-bold
`;

//댓글 인풋 컨테이너
const CommentInputContainer = tw.div`
  mx-4
  mb-4
  border
  border-gray-200
  rounded-lg
  bg-gray-50
  dark:bg-gray-700
  dark:border-gray-600
`;

//댓글 인풋
const CommentInput = tw.textarea`
  w-full
  px-0
  text-sm
  text-gray-900
  bg-white
  border-0
  dark:bg-gray-800
  focus:ring-0
  dark:text-white
  dark:placeholder-gray-400
`;

// 댓글 등록 버튼 컨테이터
const ButtonContainer = tw.div`
flex
justify-end
mr-5
`;

// 댓글 등록버튼
const SubmitButton = tw.button`
  inline-flex
  items-center
  py-2.5
  px-4
  text-xs
  font-medium
  text-center
  text-white
  rounded-lg
  bg-gradient-to-r
from-purple-500
to-pink-500
hover:bg-gradient-to-l
focus:ring-4
focus:outline-none
focus:ring-purple-200
dark:focus:ring-purple-800
`;
