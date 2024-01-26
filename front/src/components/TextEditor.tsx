import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import tw from "tailwind-styled-components";

type QuillEditorProps = {
  quillRef: string;
  htmlContent: string;
  setHtmlContent: string;
};

const SelectOption = {};

function TextEditor() {
  return (
    <Wrapper>
      <TitleWrapper>
        <SelectForm>
          <option value="quesiton">질문하기</option>
          <option value="recruit">구인구직</option>
          <option value="tips">팁/정보</option>
        </SelectForm>
        <TitleInput type="text" placeholder="제목을 입력해 주세요"></TitleInput>
      </TitleWrapper>
      <QuillEditor modules={module} />
      <ButtonWrapper>
        <button>등록하기</button>
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
    w-full
    h-screen
    shadow-md
    bg-gradient-to-b
    from-[#050110]
    from-10%
    to-[#1E0329]
    p-2
    flex
    flex-col
    gap-2
    items-center
    justify-center
    text-white
`;

const SelectForm = tw.select`
    text-black
    rounded-md
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

const QuillEditor = tw(ReactQuill)`
    rounded-md
    text-white
    w-3/4
    h-[80%]
    
`;

const ButtonWrapper = tw.div`
p-2
bg-white

`;
export default TextEditor;
