import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserState } from "models/Login.interface";
import { handleLogin } from "api/Login";
import { useQuery } from "@tanstack/react-query";
import LoginBanner from "assets/img/login-banner.png";
import tw from "tailwind-styled-components";
import spinner from "assets/img/spinner.png";
import { LoginResponse } from "models/Login.interface";
import { login, storeMemberId } from "store/reducers/userSlice";
function Login() {
  const dispatch = useDispatch();
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const {
    data: userData,
    isError,
    isLoading,
    refetch,
  } = useQuery<LoginResponse, Error>({
    queryKey: ["user"],
    queryFn: () => handleLogin(memberId, password),
    enabled: false,
  });

  useEffect(() => {
    if (isError) {
      setError(true);
    }
  }, [isError]);

  useEffect(() => {
    if (memberId === "") {
      setError(false);
    }
  }, [memberId]);

  useEffect(() => {
    if (userData) {
      const res = userData;
      dispatch(login(res));
      dispatch(storeMemberId(memberId));
    }
  }, [userData]);

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    refetch();
  };

  return (
    <LoginWrapper>
      <LoginImage src={LoginBanner} alt="LoginBanner" />
      <LoginContainer>
        <LoginTitle>로그인</LoginTitle>
        <LoginForm onSubmit={loginHandler}>
          <InputContainer>
            <InputLabel>아이디</InputLabel>
            <LoginInput
              type="text"
              placeholder="example"
              value={memberId}
              $option={error}
              onChange={(e) => setMemberId(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>비밀번호</InputLabel>
            <LoginInput
              $option={error}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          {isLoading ? (
            <LoginButton className="cursor-wait">
              <Spinner src={spinner}></Spinner>
              로그인 중
            </LoginButton>
          ) : (
            <LoginButton>시작하기</LoginButton>
          )}
          {error ? <div>정보가 맞지 않습니다</div> : null}
        </LoginForm>
      </LoginContainer>
    </LoginWrapper>
  );
}

const LoginWrapper = tw.div`
  flex
  w-full
  h-full
  bg-[#050110]
  text-white
  rounded-md
  lg:min-h-96
  lg:min-w-96
`;

const LoginImage = tw.img`
  w-1/2
  h-full
  rounded-l-md
  object-cover
  bg-black
  bg-opacity-50
  
`;

const LoginContainer = tw.div`
  p-10
  flex
  flex-col
  gap-5
  justify-center
  items-center
`;

const LoginTitle = tw.h1`
text-3xl
self-start
font-bold
p-4
`;

const InputContainer = tw.div`
  flex
  flex-col
  gap-2
`;
const InputLabel = tw.label`
  font-bold
  text-lg
  
`;
const LoginForm = tw.form`
  h-1/2
  lg:min-w-96
  flex
  flex-col
  flex-grow-[1]
  justify-between
  p-4
  gap-4
`;

const LoginInput = tw.input<{ $option: boolean }>`
  bg-[#26252A]
  focus:outline-none
  text-white
  rounded-md
  border
  border-[#5A2DB8]
  p-2
  ${(p) => (p.$option ? "border-2 border-red-400" : "")}
`;

const Spinner = tw.img`
w-6
h-6
animate-spin
`;
const PendingButton = tw.button`
`;

const Border = tw.div`
  border-b-1
  border-white
  w-full
`;

const SocialLoginContainer = tw.div``;

const LoginButton = tw.button`
  flex
  justify-center
  items-center
  gap-2
  bg-[#1F3172]
  py-2
  mt-4
  rounded-md
`;
export default Login;
