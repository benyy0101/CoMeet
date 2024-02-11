import React from "react";
import tw from "tailwind-styled-components";

function EditForm() {
  return (
    <Wrapper>
      <Form>
        <FormWrapperFirst>
          <FormContainer>
            <Input placeholder="이름을 입력해주세요" />
            <Label>이름</Label>
          </FormContainer>
          <FormContainer>
            <Input placeholder="닉네임을 입력해주세요" />
            <Label>닉네임</Label>
            <p className="mt-1 ml-3 text-xs text-green-600 dark:text-green-500">
              <span className="font-medium">Well done!</span> Some success
              message.
            </p>
          </FormContainer>
        </FormWrapperFirst>
        <FormWrapperSecond>
          <FormContainer>
            <Input placeholder="영문 대소문자, 숫자, 특수 문자 포함 8~16자" />
            <Label>비밀번호</Label>
            <p className="mt-1 ml-3 text-xs text-green-600 dark:text-green-500">
              <span className="font-medium">Well done!</span> Some success
              message.
            </p>
          </FormContainer>
        </FormWrapperSecond>
        <FormWrapperSecond>
          <FormContainer>
            <Input placeholder="비밀 번호를 입력해주세요." />
            <Label>비밀번호 확인</Label>
            <p className="mt-1 ml-3 text-xs text-green-600 dark:text-green-500">
              <span className="font-medium">Well done!</span> Some success
              message.
            </p>
          </FormContainer>
        </FormWrapperSecond>
        <FormWrapperSecond>
          <FormContainer>
            <Input placeholder="이메일을 입력해주세요" />
            <Label>이메일</Label>
            <p className="mt-1 ml-3 text-xs text-green-600 dark:text-green-500">
              <span className="font-medium">Well done!</span> Some success
              message.
            </p>
          </FormContainer>
        </FormWrapperSecond>
        <FormWrapperSecond>
          <FormContainer>
            <Input placeholder="나를 보여 줄 수 있는 링크를 넣어 보세요." />
            <Label>링크</Label>
          </FormContainer>
        </FormWrapperSecond>
        <FormWrapperSecond>
          <FormContainer>
            <Input placeholder="나를 보여 줄 수 있는 한 마디" />
            <Label>한 줄 메세지</Label>
          </FormContainer>
        </FormWrapperSecond>
        <FormWrapperSecond>
          <FormContainer>
            <Input placeholder="공부 성향을 선택해보세요." />
            <Label>공부 성향</Label>
          </FormContainer>
        </FormWrapperSecond>
        <button>수정</button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = tw.div`
border
border-white
rounded-md
w-[650px]
h-5/6
flex
bg-white
justify-center
`;

const Form = tw.form`
    flex
    flex-col
    w-full
    px-5
    py-7
`;

const FormWrapperFirst = tw.div`
grid gap-6 mb-6 md:grid-cols-2 flex-grow
`;

const FormWrapperSecond = tw.div`
mb-6 flex-grow
`;

const FormContainer = tw.div`
relative h-10 w-full min-w-[200px]
`;

const Label = tw.label`
before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500
`;

const Input = tw.input`
peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100`;
export default EditForm;
