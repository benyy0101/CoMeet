import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { BoardCommentComponent } from "./BoardCommentComponent";
import {
  CreateCommentParams,
  ModifyCommentParams,
  SearchCommentContent,
  SearchCommentParams,
  SearchCommentResponse,
} from "models/Comments.interface";
import { useQuery } from "@tanstack/react-query";
import { createComment, deleteComment, modifyComment, searchComment } from "api/Comment";
import { useSelector } from "react-redux";

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
  const memberNickname = useSelector((state: any) => state.user.user.nickname);

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
    const content = contentRef.current!.value;
    if (content === "") {
      alert("글을 써주세요");
      return;
    }
    createComment({ boardId, content })
      .then((data) => {
        contentRef.current!.value = "";
        console.log("success", data);
        //정말 간단하게만 조치해둔 것. 엄밀하게는 페이지를 기준으로 새로 api 날리는 게..
        const date = new Date();
        const currentComment = {
          boardId,
          content,
          createdAt: date.toDateString(),
          updatedAt: date.toDateString(),
          id: data,
          writerNickname: memberNickname,
        };
        setCommentList([...commentList, currentComment]);
      })
      .catch(() => alert("failed"));
  };

  const handleDelete = (id: number) => {
    deleteComment({ commentId: id })
      .then((data) => {
        console.log("success");
        setCommentList(commentList.filter((each) => each.id !== id));
      })
      .catch((fail) => {
        console.log("failure", fail.response.data);
      });
  };

  const handleModify = (params: ModifyCommentParams) => {
    modifyComment(params)
      .then((data) => {
        console.log("success");
        setCommentList(
          commentList.map((each) =>
            each.id === params.commentId ? { ...each, content: params.content } : each
          )
        );
      })
      .catch((fail) => {
        console.log("failure", fail.response.data);
      });
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
        <BoardCommentComponent
          key={comment.id}
          comment={comment}
          handleDelete={handleDelete}
          handleModify={handleModify}
        />
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
