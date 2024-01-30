import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import RoomOption from "./RoomOption";
import tw from "tailwind-styled-components";

type QuillEditorProps = {
  quillRef: string;
  htmlContent: string;
  setHtmlContent: string;
};

type SelectOption = {
  key: number;
  value: string;
  label: string;
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

type QuillProps = {
  isFree: boolean;
  isEdit: boolean;
};

function TextEditor(props: QuillProps) {
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
  const [editedContent, setEditedContent] = React.useState<string>("");
  const [selectedRoom, setSelectedRoom] = React.useState<string>("");
  const [headerTitle, setHeaderTitle] = React.useState<string>("자유게시판");

  useEffect(() => {
    if (!isFree) {
      setHeaderTitle("자유게시판");
    } else {
      setHeaderTitle("모집게시판");
    }
  }, [isFree]);

  const handleRoom = (room: string) => {
    setSelectedRoom(room);
  };

  return (
    <Wrapper>
      <Header>
        <HeaderTitle> {headerTitle}</HeaderTitle>
      </Header>
      <TitleWrapper>
        {false ? (
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
        <TitleInput type="text" placeholder="제목을 입력해 주세요"></TitleInput>
      </TitleWrapper>
      {!isFree ? (
        <RoomOption provoke={true} selectRoom={handleRoom}></RoomOption>
      ) : null}
      <QuillContainer>
        <Quill modules={module} formats={formats} />
      </QuillContainer>
      <ButtonWrapper>
        <CancelButton>취소하기</CancelButton>
        <SubmitButton>작성하기</SubmitButton>
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
  items-center
  justify-start
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
    text-white
    text-3xl
    p-1
    w-1/2
    bg-transparent
    focus:outline-none
`;
const QuillContainer = tw.div`
    w-full
    min-h-[300px]  
    bg-transparent
    rounded-md
    mb-4           
`;
const Quill = tw(ReactQuill)`
  w-full
  h-[500px]
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
