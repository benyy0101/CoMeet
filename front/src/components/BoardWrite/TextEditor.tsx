import React, { useEffect, useState, useRef } from "react";
import RoomOption from "./RoomOption";
import tw from "tailwind-styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { CreateBoardParams, CreateBoardResponse, TextEditProps } from "models/Board.interface";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useQuery } from "@tanstack/react-query";
import { createBoard } from "api/Board";
import { title } from "process";
import { useNavigate } from "react-router-dom";

type SelectOption = {
  key: number;
  value: string;
  label: string;
};

function TextEditor(props: TextEditProps) {
  const editorRef = useRef<Editor | null>(null);
  const { isFree, isEdit } = props;
  const [selectOption, setSelectOption] = React.useState<SelectOption[]>([
    { key: 1, value: "question", label: "질문하기" },
    { key: 2, value: "recruit", label: "구인구직" },
    { key: 3, value: "tips", label: "팁/정보" },
  ]);
  const dummy = {
    title: "제목",
    content: "내용",
    category: "카테고리",
  };
  //isEdit이 true면 수정하기, false면 새 글 작성하기
  const [editedContent, setEditedContent] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<number>(0);
  const [headerTitle, setHeaderTitle] = useState<string>("자유게시판");
  const [createBoardParams, setCreateBoardParams] = useState<CreateBoardParams>({
    context: "",
    title: "",
    type: "RECRUIT",
  });
  //쓰는 값
  const titleRef = useRef<HTMLInputElement | null>(null);

  //move page
  const navigate = useNavigate();

  // 원래는 리액트쿼리로 하려 했는데, 페이지 들어가는 것만으로도 계속 요청이 날아가서 에러남
  // 이 이슈를 제대로 해결하지 못해서 그냥 포기
  // const { data: dataCreateBoard } = useQuery<CreateBoardResponse, Error>({
  //   queryKey: ["createboard", JSON.stringify(createBoardParams)],
  //   queryFn: () => {
  //     return createBoard(createBoardParams);
  //   },
  // });

  useEffect(() => {
    if (isFree) {
      setHeaderTitle("자유게시판");
    } else {
      setHeaderTitle("모집게시판");
    }
  }, [isFree]);

  const handleRoom = (room: number) => {
    setSelectedRoom(room);
  };

  const handleWrite = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 조건대로 입력이 들어왔는지 체크
    const title = titleRef.current ? titleRef.current.value : "";
    const context = editorRef.current ? editorRef.current.getInstance().getMarkdown() : "";
    const roomId = selectedRoom ? selectedRoom : 0;
    if (title === "") {
      alert("제목을 작성하세요");
      return;
    }
    if (context === "") {
      alert("내용을 작성하세요");
      return;
    }
    if (!isFree && !roomId) {
      alert("모집 중인 방을 선택해주세요");
      return;
    }

    createBoardParams.type = isFree ? "FREE" : "RECRUIT";
    createBoardParams.title = title;
    createBoardParams.context = context;
    createBoardParams.roomId = selectedRoom;

    console.log(createBoardParams);
    setCreateBoardParams(createBoardParams);
    //react query so hard..
    createBoard(createBoardParams)
      .then((data) => {
        console.log("success", data);
        navigate(`/recruit-board/${data}`);
        return data;
      })
      .catch((fail) => {
        console.log("failed", fail.response.data);
        return fail;
      });
  };

  return (
    <Wrapper>
      <Header>
        <HeaderTitle> {headerTitle}</HeaderTitle>
      </Header>
      <TitleWrapper>
        {isFree ? (
          <SelectForm>
            {selectOption.map((option) => (
              <option value={option.value} key={option.key}>
                {option.label}
              </option>
            ))}
          </SelectForm>
        ) : (
          <CatContainer>{dummy.category}</CatContainer>
        )}
        <TitleInput type="text" placeholder="제목을 입력해주세요" ref={titleRef}></TitleInput>
      </TitleWrapper>
      {!isFree ? <RoomOption provoke={true} selectRoom={handleRoom}></RoomOption> : null}
      <QuillContainer>
        <Editor
          ref={editorRef}
          initialValue="게시판 성격에 맞는 글만 써주세요"
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          language="ko-KR"
        />
      </QuillContainer>
      <ButtonWrapper>
        <CancelButton>취소하기</CancelButton>
        <SubmitButton onClick={handleWrite}>작성하기</SubmitButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const module = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
    ],
  },
};

const Wrapper = tw.div`
flex
flex-col
justify-center
self-center
w-3/4
p-2
gap-2
text-white
`;

const Header = tw.div`
    text-4xl
    my-4
    w-full
    flex
    justify-center
    items-center
`;
const HeaderTitle = tw.div`
text-black
`;

const SelectForm = tw.select`
    text-white
    rounded-md
    bg-black
`;

const TitleWrapper = tw.div`
flex
justify-start
w-full
gap-3
pl-3
pb-3
`;

const CatContainer = tw.div`
  text-gray-400
  text-sm
  flex
  justify-center
  items-end
`;

const TitleInput = tw.input`
    h-10
    border-b
    border-0.1
    bg-grey-300
    text-black
    text-3xl
    p-1
    w-1/2
    bg-transparent
    focus:outline-none
`;
const QuillContainer = tw.div`
    w-full
    min-h-[300px]  
    rounded-md
    mb-4           
`;
const ButtonWrapper = tw.div`
  w-full
  my-10
  flex
  justify-end
  gap-3
`;

const CancelButton = tw.button`
    text-white
    font-bold
    bg-gradient-to-r
    from-gray-500
    to-gray-700
    py-2
    px-4
    rounded
    cursor-pointer
`;

const SubmitButton = tw.button`
    text-white
    font-bold
    bg-gradient-to-r
    from-purple-500
    to-pink-500
    py-2
    px-4
    rounded
    cursor-pointer
`;
export default TextEditor;
