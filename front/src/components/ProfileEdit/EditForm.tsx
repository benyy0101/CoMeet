import React,{ChangeEvent, useEffect} from "react";
import tw from "tailwind-styled-components";
import { UserState } from "types";

function EditForm() {
  const user = {
    email: "test@test.com",
    name: "test",
    nickname: "testNickName",
    password: "testPassword",
}
  const [isNicknameFocused, setIsNicknameFocused] = React.useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = React.useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = React.useState<boolean>(false);
  const [isNameFocused, setIsNameFocused] = React.useState<boolean>(false);

  const [nickname, setNickname] = React.useState<string>(user.nickname);
  const [password, setPassword] = React.useState<string>(user.password);
  const [email, setEmail] = React.useState<string>(user.email);
  const [name, setName] = React.useState<string>(user.name);

  const nicknameHandler = (event:ChangeEvent<HTMLInputElement>) =>{
    setNickname(event.target.value);
  }
  
  const passwordHandler = (event:ChangeEvent<HTMLInputElement>) =>{
    setPassword(event.target.value);
  }

  const emailHandler = (event:ChangeEvent<HTMLInputElement>) =>{
    setEmail(event.target.value);
  }

  const nameHandler = (event:ChangeEvent<HTMLInputElement>) =>{
    setName(event.target.value);
  }

  const nicknameClickHandler = (e:React.MouseEvent<HTMLDivElement>) =>{
    setIsNicknameFocused(true);
  }

  const passwordClickHandler = (e:React.MouseEvent<HTMLDivElement>) =>{
    setIsPasswordFocused(true);
  }

  const emailClickHandler = (e:React.MouseEvent<HTMLDivElement>) =>{
    setIsEmailFocused(true);
  }

  const nameClickHandler = (e:React.MouseEvent<HTMLDivElement>) =>{
    setIsNameFocused(true);
  }

  const nicknameBlurHandler = (e:React.FocusEvent<HTMLInputElement>) =>{
    setIsNicknameFocused(false);
  }

  const passwordBlurHandler = (e:React.FocusEvent<HTMLInputElement>) =>{
    setIsPasswordFocused(false);
  }

  const emailBlurHandler = (e:React.FocusEvent<HTMLInputElement>) =>{
    setIsEmailFocused(false);
  }

  const nameBlurHandler = (e:React.FocusEvent<HTMLInputElement>) =>{
    setIsNameFocused(false);
  }



  useEffect(() => {
    console.log(isEmailFocused);
  }, [isEmailFocused]);
  
  return (
    <Wrapper>
      <Form>
        <FormRightContainer>
          <InputItem>
          <Label>이름</Label>
          {
            isNameFocused ? <Input type="text" value={name} onChange={nameHandler}></Input>
            : <TextArea onClick={nameClickHandler} onBlur={nameBlurHandler}>{name}</TextArea>
          }
          </InputItem>

          <InputItem>
          <Label>비밀번호</Label>
          {
            isPasswordFocused ? <Input type="password" value={password} onChange={passwordHandler}></Input>
            : <TextArea onClick={passwordClickHandler} onBlur={passwordBlurHandler}> {password}</TextArea>
          }
          </InputItem>

          <InputItem>
          <Label>이메일</Label>
          {
            isEmailFocused ? <Input type="text" value={email} onChange={emailHandler}></Input>
            : <TextArea onClick={emailClickHandler} onBlur={emailBlurHandler}> {email}</TextArea>
          }
          
          </InputItem>

          <InputItem>
          <Label>닉네임</Label>
          {
            isNicknameFocused ? <Input type="text" value={nickname} onChange={nicknameHandler}></Input>
            : <TextArea onClick={nicknameClickHandler} onBlur={nicknameBlurHandler}> {nickname}</TextArea>
          }
          
          </InputItem>
        </FormRightContainer>
        <FormLeftContainer></FormLeftContainer>
      </Form>
    </Wrapper>
  );
}

const Wrapper = tw.div`
border
border-white
rounded-md
w-1/2
m-4
p-4
h-full
`;

const Form = tw.form`
    flex
`;

const FormRightContainer = tw.div``;

const FormLeftContainer = tw.div``;

const InputItem = tw.div`
flex
flex-col
space-y-4
`;


const Label = tw.label`
text-white
text-xl
font-bold

`;

const Input = tw.input`
text-white
bg-transparent
border
rounded-md
p-2
`;

const TextArea = tw.div`
text-white
bg-transparent
p-2
`
export default EditForm;
