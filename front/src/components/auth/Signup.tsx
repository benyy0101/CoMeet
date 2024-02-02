import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserState } from "../../types";
import { handleLogin } from "api/auth";
import { useQuery } from "@tanstack/react-query";
import LoginBanner from "assets/img/login-banner.png";
import tw from "tailwind-styled-components";
import spinner from "assets/img/spinner.png";
import { LoginQuery, JwtToken } from "models/Login.interface";
import { login } from "store/reducers/userSlice";
import { Domain } from "domain";

function Signup() {
  const dispatch = useDispatch();
  const [memberId, setMemberId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [domain, setDomain] = useState("");

  const [error, setError] = useState(false);

  const {
    data: userData,
    isError,
    isLoading,
    refetch,
  } = useQuery<LoginQuery, Error>({
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
    if (userData) {
      const { nickname, profileImage } = userData;
      const res: UserState = {
        user: {
          memberId,
          nickname,
          profileImage,
          password,
        },
        isLoggedIn: true,
      };
      dispatch(login(res));
    }
  }, [userData]);

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    refetch();
  };

  return (
    <LoginWrapper>
      <LoginTitle>회원가입</LoginTitle>
      <LoginForm onSubmit={loginHandler}>
        <LoginContainer>
          <InputLeftContainer>
            <InputContainer>
              <LabelContainer>
                <InputLabel>아이디</InputLabel>
                <WarningText>존재하는 아이디입니다</WarningText>
              </LabelContainer>
              <LoginInput
                type="text"
                placeholder="example1234"
                value={memberId}
                $option={error}
                onChange={(e) => setMemberId(e.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <InputLabel>이름</InputLabel>
              <LoginInput
                type="text"
                placeholder="김코밋"
                value={name}
                $option={error}
                onChange={(e) => setName(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <LabelContainer>
                <InputLabel>닉네임</InputLabel>
                <WarningText>존재하는 닉네임입니다</WarningText>
              </LabelContainer>
              <LoginInput
                $option={error}
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
          </InputLeftContainer>
          <InputRightContainer>
            <InputContainer>
              <InputLabel>이메일</InputLabel>
              <EmailContainer>
                <LoginInput
                  $option={error}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                @
                <LoginInput
                  $option={error}
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </EmailContainer>
            </InputContainer>

            <InputContainer>
              <LabelContainer>
                <InputLabel>비밀번호</InputLabel>
                <WarningText>형식을 맞춰주세요</WarningText>
              </LabelContainer>
              <LoginInput
                $option={error}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>비밀번호 확인</InputLabel>
              <LoginInput
                type="password"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
            </InputContainer>
          </InputRightContainer>
        </LoginContainer>

        <ButtonContainer>
          {isLoading ? (
            <LoginButton className="cursor-wait">
              <Spinner src={spinner}></Spinner>
              회원가입 중
            </LoginButton>
          ) : (
            <LoginButton>시작하기</LoginButton>
          )}
        </ButtonContainer>
        {error ? <div>빠진 입력이 있는지 확인해주세요</div> : null}
      </LoginForm>
    </LoginWrapper>
  );
}

const LoginWrapper = tw.div`
  flex
  flex-col
  w-full
  h-full
  bg-[#050110]
  text-white
  rounded-md
  lg:min-h-96
  lg:min-w-96
  p-10
  gap-6
`;

const LoginContainer = tw.div`
  h-full
  flex
  gap-3
  justify-center
  items-center
`;

const LoginTitle = tw.h1`
text-3xl
self-start
font-bold
pb-4
pl-4
pr-4
`;

const InputContainer = tw.div`
  flex
  flex-col
  gap-2
`;

const LabelContainer = tw.div`
flex
justify-between
items-center
`;

const InputLabel = tw.label`
  font-bold
  text-xl  
`;

const WarningText = tw.div`
text-sm
text-red-400
`;
const LoginForm = tw.form`
  h-1/2
  lg:min-w-96
  flex
  flex-col
  flex-grow-[1]
  justify-between
  gap-4
`;

const LoginInput = tw.input<{ $option: boolean }>`
  bg-[#26252A]
  focus:outline-none
  text-white
  rounded-sm
  border
  border-[#5A2DB8]
  p-1
  min-w-[50px] 
  ${(p) => (p.$option ? "border-2 border-red-400" : "")}
`;

const DomainSelect = tw.select`

`;

const EmailContainer = tw.div`
flex
w-full  
items-center
gap-2
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

const ButtonContainer = tw.div`
`;

const LoginButton = tw.button`
  flex
  justify-center
  items-center
  gap-2
  bg-[#1F3172]
  p-2
  mt-4
  rounded-md
`;

const InputLeftContainer = tw.div`
  flex
  flex-col
  gap-4
  w-1/2
`;

const InputRightContainer = tw.div`
  flex
  flex-col
  gap-4
  w-1/2
`;
export default Signup;
