import React, { useEffect, useState, useRef } from "react";
import RoomOption from "./RoomOption";
import tw from "tailwind-styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import {
  CreateBoardParams,
  CreateBoardResponse,
  ModifyBoardParams,
  TextEditProps,
} from "models/Board.interface";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useQuery } from "@tanstack/react-query";
import { createBoard, modifyBoard } from "api/Board";
import { title } from "process";
import { useNavigate } from "react-router-dom";
import { FREE_BOARD_CATEGORY } from "models/Enums.type";
import { useLocation, useParams } from "react-router-dom";

type SelectOption = {
  key: number;
  value: FREE_BOARD_CATEGORY;
  label: string;
};

function TextEditor(props: TextEditProps) {
  const location = useLocation();
  const { editId, editTitle, editContent, isValid, editCategory } = location.state;

  const editorRef = useRef<Editor | null>(null);
  const { isFree, isEdit } = props;
  const [selectOption, setSelectOption] = useState<SelectOption[]>([
    { key: 1, value: "QUESTION", label: "질문하기" },
    { key: 2, value: "PROMOTION", label: "구인구직" },
    { key: 3, value: "TIP", label: "팁/정보" },
    { key: 4, value: "CHAT", label: "잡담" },
  ]);

  //isEdit이 true면 수정하기, false면 새 글 작성하기
  const [selectedRoom, setSelectedRoom] = useState<number>(0);
  const [headerTitle, setHeaderTitle] = useState<string>("자유게시판");

  const dummy1: CreateBoardParams = {
    content: "",
    title: "",
    type: "RECRUIT",
  };
  const [createBoardParams, setCreateBoardParams] = useState<CreateBoardParams>(dummy1);

  const dummy2: ModifyBoardParams = {
    boardId: 0,
    content: "",
    title: "",
  };
  const [modifyBoardParams, setModifyBoardParams] = useState<ModifyBoardParams>(dummy2);

  const [isRoomValid, setIsRoomValid] = useState<boolean>(isValid);
  const [category, setCategory] = useState<FREE_BOARD_CATEGORY>("CHAT");

  //쓰는 값
  const [title, setTitle] = useState<string>(editTitle || "");

  //move page
  const navigate = useNavigate();

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

  const isValidHandler = () => {
    setIsRoomValid(!isRoomValid);
  };

  const handleWrite = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 조건대로 입력이 들어왔는지 체크
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
    // 모집이면서 생성이면서 방아뒤가 없으면
    if (!isFree && !isEdit && !roomId) {
      alert("모집 중인 방을 선택해주세요");
      return;
    }

    //글쓰는 상황 분기
    if (isEdit) {
      const { editId } = location.state;
      modifyBoardParams.title = title;
      modifyBoardParams.content = context;
      modifyBoardParams.boardId = editId;
      if (isFree) {
        console.log("categroy", category);
        modifyBoardParams.category = category;
      } else {
        modifyBoardParams.isValid = isRoomValid;
      }
      // api를 위한 파라미터 변수가 꼭 state로 관리되어야만 하는가??
      setModifyBoardParams(modifyBoardParams);
      modifyBoard(modifyBoardParams)
        .then((data) => {
          console.log("success");
          navigate(`/recruit-board/${editId}`);
          return data;
        })
        .catch((fail) => {
          console.log("failed", fail.response.data);
          return fail;
        });
    } else {
      if (isFree) {
        createBoardParams.type = "FREE";
        createBoardParams.category = category;
      } else {
        createBoardParams.type = "RECRUIT";
        createBoardParams.roomId = selectedRoom;
      }
      createBoardParams.title = title;
      createBoardParams.content = context;

      console.log(createBoardParams);
      setCreateBoardParams(createBoardParams);
      //react query so hard..
      createBoard(createBoardParams)
        .then((data) => {
          console.log("success", data);
          navigate(isFree ? `/free-board/${data}` : `/recruit-board/${data}`);
        })
        .catch((fail) => {
          console.log("failed", fail.response.data);
          return fail;
        });
    }
  };

  return (
    <Wrapper>
      <Header>
        <HeaderTitle> {headerTitle}</HeaderTitle>
      </Header>
      <TitleWrapper>
        {/* 모집글 수정 시 유효한지 아닌지 체크할 수 있다. 그걸 여기에서 걸어주면 좋겠다 */}

        {isFree && (
          <SelectForm
            onChange={(data) => {
              //@ts-ignore
              setCategory(data.target.selectedOptions[0].value);
            }}
          >
            {selectOption.map((option) => (
              <option value={option.value?.toString()} key={option.key}>
                {option.label}
              </option>
            ))}
          </SelectForm>
        )}
        <TitleInput
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></TitleInput>
      </TitleWrapper>
      <OptionContainer>
        {!isFree ? <RoomOption editRoom={editTitle} selectRoom={handleRoom}></RoomOption> : null}
        <ValidButtonContainer>
          {!isFree && (
            <>
              <ValidButton isOn={isRoomValid} onClick={isValidHandler}>
                모집중
              </ValidButton>
              <ValidButton isOn={!isRoomValid} onClick={isValidHandler}>
                모집완료
              </ValidButton>
            </>
          )}
        </ValidButtonContainer>
      </OptionContainer>

      <QuillContainer>
        <Editor
          ref={editorRef}
          initialValue={location.state.editContent}
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
const OptionContainer = tw.div`
flex
justify-between
`;

const ValidButtonContainer = tw.div`
flex
space-x-3
`;

const ValidButton = tw.div<{ isOn: boolean }>`
p-1
text-black

${(props) => (props.isOn ? "text-purple-700 border-purple-700 border-b-2" : "text-violet-100")}
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
