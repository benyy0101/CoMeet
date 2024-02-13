import { ModifyCommentParams, SearchCommentContent } from "models/Comments.interface";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import tw from "tailwind-styled-components";

type CommentProps = {
  comment: SearchCommentContent;
  handleDelete: (id: number) => void;
  handleModify: (params: ModifyCommentParams) => void;
};

export const BoardCommentComponent = (props: CommentProps) => {
  const { writerNickname, updatedAt, content, id } = props.comment;
  const memberNickname = useSelector((state: any) => state.user.user.nickname);

  const [isModifying, setIsModifying] = useState<boolean>(false);
  const handleModifySub = () => {
    setIsModifying(!isModifying);
    if (isModifying) {
      /**
       * 구상방법
       * 수정 버튼 누르면 그 버튼은 완료 버튼으로 바뀜
       * 동시에 텍스트 수정 가능하게 됨
       *
       * 상위 컴포넌트에서 해당 기능을 구현할 예정
       * 이 컴포넌트에서는 수정 버튼을 누름에 따라 변화가 생기게만 해주면 됨
       * 근데 그게 진짜 술마렵게 만듬ㅋㅋ
       * 프고수들 도움..
       */
      // var textarea : React.TextareaHTMLAttributes<?> = document!.getElementById(id.toString())!;
      // console.log(textarea);
      // textarea!.readOnly = "true";
      // textarea.readOnly = !textarea.readOnly;
      //이 놈이 상위에서 가져온 함수
      // props.handleModify({ commentId: id, content });
    }
  };

  return (
    <TotalContainer>
      <Comment>
        <NicAndDate>
          <Nicname>{writerNickname}</Nicname>
          <Date>{updatedAt}</Date>
        </NicAndDate>
        {/* <Context>{content}</Context>  미안하다..!*/}
        <textarea readOnly className="text-black" id={id.toString()}>
          {content}
        </textarea>
        {memberNickname === writerNickname ? (
          <NicAndDate>
            <button onClick={handleModifySub}>수정 -----</button>
            <button onClick={() => props.handleDelete(id)}>삭제</button>
          </NicAndDate>
        ) : null}
      </Comment>
    </TotalContainer>
  );
};

//댓글 전체 컨테이너 - border-t를 위해
const TotalContainer = tw.div`
border-t
border-gray-600
`;

// 진짜 댓글 컨테이너
const Comment = tw.div`
flex
flex-col
py-3
mx-5
my-5
`;

//닉네임&날짜
const NicAndDate = tw.div`
flex
mb-3
`;

//닉네임
const Nicname = tw.div`
mr-3
text-gray-200
`;

//날짜
const Date = tw.div`
text-gray-400
`;

//댓글 내용
const Context = tw.div``;
