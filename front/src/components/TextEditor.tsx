import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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

function TextEditor() {
  const [selectOption, setSelectOption] = React.useState<SelectOption[]>([
    { key: 1, value: "question", label: "질문하기" },
    { key: 2, value: "recruit", label: "구인구직" },
    { key: 3, value: "tips", label: "팁/정보" },
  ]);
  const [headerTitle, setHeaderTitle] = React.useState<string>("자유게시판");

  return (
    <Wrapper>
      <Header>
        <HeaderTitle> {headerTitle}</HeaderTitle>
      </Header>
      <TitleWrapper>
        <SelectForm>
          {selectOption.map((option) => (
            <option value={option.value} key={option.key}>
              {option.label}
            </option>
          ))}
        </SelectForm>
        <TitleInput type="text" placeholder="제목을 입력해 주세요"></TitleInput>
      </TitleWrapper>
      <QuillContainer>
        <Quill modules={module} formats={formats} />
      </QuillContainer>
      <ButtonWrapper>
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
  w-full
  bg-gradient-to-b
  min-h-screen
  from-[#050110]
  from-10%
  to-[#1E0329]
  p-2
  gap-2
  text-white
`;

const Header = tw.div`
    text-4xl
    my-4
    w-3/4
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
w-3/4
gap-3
pl-3
pb-3
`;

const TitleInput = tw.input`
    h-10
    border-b
    bg-grey-300
    text-slate-800
    p-1
    w-1/2
    bg-transparent
    focus:outline-none
`;
const QuillContainer = tw.div`
    w-3/4
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
  w-3/4
  my-10
  flex
  justify-end
  pr-1
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
