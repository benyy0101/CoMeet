import React, { ChangeEvent, useEffect } from "react";
import tw from "tailwind-styled-components";
import { UserState } from "types";

function EditForm() {
  const user = {
    email: "test@test.com",
    name: "test",
    nickname: "testNickName",
    password: "testPassword",
  };
  const [isNicknameFocused, setIsNicknameFocused] =
    React.useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] =
    React.useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = React.useState<boolean>(false);
  const [isNameFocused, setIsNameFocused] = React.useState<boolean>(false);

  const [nickname, setNickname] = React.useState<string>(user.nickname);
  const [password, setPassword] = React.useState<string>(user.password);
  const [email, setEmail] = React.useState<string>(user.email);
  const [name, setName] = React.useState<string>(user.name);

  const nicknameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const nameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const nicknameClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsNicknameFocused(true);
  };

  const passwordClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsPasswordFocused(true);
  };

  const emailClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsEmailFocused(true);
  };

  const nameClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsNameFocused(true);
  };

  const nicknameBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsNicknameFocused(false);
  };

  const passwordBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsPasswordFocused(false);
  };

  const emailBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEmailFocused(false);
  };

  const nameBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsNameFocused(false);
  };

  useEffect(() => {
    console.log(isEmailFocused);
  }, [isEmailFocused]);

  return (
    <Wrapper>
      <Form>
        <InputItem>
          <Label>이름</Label>
          {isNameFocused ? (
            <Input
              type="text"
              value={name}
              onChange={nameHandler}
              onBlur={nameBlurHandler}
            ></Input>
          ) : (
            <TextArea onClick={nameClickHandler}>{name}</TextArea>
          )}
        </InputItem>

        <InputItem>
          <Label>비밀번호</Label>
          {isPasswordFocused ? (
            <Input
              type="password"
              value={password}
              onChange={passwordHandler}
              onBlur={passwordBlurHandler}
            ></Input>
          ) : (
            <TextArea onClick={passwordClickHandler}>{password}</TextArea>
          )}
        </InputItem>

        <InputItem>
          <Label>이메일</Label>
          {isEmailFocused ? (
            <Input
              type="text"
              value={email}
              onChange={emailHandler}
              onBlur={emailBlurHandler}
            ></Input>
          ) : (
            <TextArea onClick={emailClickHandler}>{email}</TextArea>
          )}
        </InputItem>

        <InputItem>
          <Label>닉네임</Label>
          {isNicknameFocused ? (
            <Input
              type="text"
              value={nickname}
              onChange={nicknameHandler}
              onBlur={nicknameBlurHandler}
            ></Input>
          ) : (
            <TextArea onClick={nicknameClickHandler}> {nickname}</TextArea>
          )}
        </InputItem>
        <Border />
        <ButtonGroup>
          <LeaveButton>탈퇴하기</LeaveButton>
          <SubmitButton>수정하기</SubmitButton>
        </ButtonGroup>
      </Form>
    </Wrapper>
  );
}

const Wrapper = tw.div`
w-1/2
min-h-1/2
p-10
rounded-md
bg-white
bg-opacity-10
`;

const Form = tw.form`
    flex
    flex-col
    w-full
    space-y-4
`;

const InputItem = tw.div`
flex
flex-col
space-y-2
`;

const Label = tw.label`
text-white
text-xl
font-bold

`;

const Input = tw.input`
text-white
bg-slate-800
w-1/2
rounded-md
p-2
`;

const TextArea = tw.div`
text-white
bg-transparent
p-2
`;
const ButtonGroup = tw.div`
space-x-4
flex
justify-end
`;

const Border = tw.div`
bg-white
h-[1px]
bg-gradient-to-r
from-[#7C5EBD]
to-[#539AB1]
`;

const SubmitButton = tw.button`
p-2
text-white
rounded-md
bg-gradient-to-r
from-[#7C5EBD]
to-[#539AB1]
shadow-xl
`;

const LeaveButton = tw.button`
p-2
text-red-900
rounded-md
shadow-xl
bg-gradient-to-r
from-[#F2665D]
to-[#EFAC48]
`;
export default EditForm;
