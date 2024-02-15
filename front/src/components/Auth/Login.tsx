import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "models/Login.interface";
import { handleLogin } from "api/Login";
import { useQuery } from "@tanstack/react-query";
import LoginBanner from "assets/img/login-banner.png";
import tw from "tailwind-styled-components";
import spinner from "assets/img/spinner.png";
import { LoginResponse } from "models/Login.interface";
import { login, storeMemberId, updateUserImg } from "store/reducers/userSlice";
import { getKeywords } from "store/reducers/keywordSlice";
import { searchKeyword } from "api/Keyword";
// import { SearchKeywordResponse } from "models/Keyword.interface";
import GithubIcon from "assets/img/githubIcons.png";
import { githubLogin } from "api/Auth";
import { useNavigate } from "react-router-dom";
import { handleMember } from "api/Member";

interface IProps {
  modalToggleHandler: () => void;
}

function Login({ modalToggleHandler }: IProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.user);
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const {
  //   data: userData,
  //   isError,
  //   isLoading,
  //   refetch: loginRefetch,
  // } = useQuery<LoginResponse, Error>({
  //   queryKey: ["user", memberId],
  //   queryFn: () => handleLogin(memberId, password),
  //   enabled: false,
  // });

  // const { data: keywordData, refetch: keywordFetch } = useQuery<SearchKeywordResponse, Error>({
  //   queryKey: ["keyword"],
  //   queryFn: () => searchKeyword({}),
  //   enabled: false,
  // });

  // useEffect(() => {
  //   if (keywordData) {
  //     dispatch(getKeywords(keywordData));
  //   }
  // }, [keywordData]);

  useEffect(() => {
    if (memberId === "") {
      setError(false);
    }
  }, [memberId]);

  // useEffect(() => {
  //   if (userData) {
  //     console.error("123", userData);
  //     const res = userData;

  //     // console.log(keywords);
  //   }
  // }, [userData]);

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    handleLogin(memberId, password)
      .then((res) => {
        dispatch(login(res));
        dispatch(storeMemberId(memberId));
        // let keywords: SearchKeywordResponse = {
        //   lst: [],
        // };
        searchKeyword({}).then((data) => {
          console.log(data);
          // keywords = data;
          dispatch(getKeywords(data));
          return data;
        });

        handleMember(memberId).then((data) => {
          console.log(data);
          dispatch(updateUserImg({ img: data.profileImage }));
        });

        setMemberId("");
        setPassword("");
        modalToggleHandler();
      })
      .catch((error: any) => setError(true));

    // keywordFetch();
  };

  const socialLoginHandler = (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      console.log("socialLoginHandler");
      window.location.href =
        "https://github.com/login/oauth/authorize?client_id=ee190e90e2c248f7e25d&scope=user:email";
      //dispatch(login(res));
    } catch (error) {
      console.log(error);
    }
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
          <Border />
          <SocialLoginContainer onClick={socialLoginHandler}>
            <SocialLoginButton>
              <img src={GithubIcon} className="w-6 h-6" alt="ahffk"></img>
            </SocialLoginButton>
            <GithubTitle>깃허브로 로그인하기</GithubTitle>
          </SocialLoginContainer>
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

const GithubTitle = tw.div`
  text-sm
  font-bold
  text-center
`;

const Border = tw.div`
  bg-white
  bg-opacity-20
  h-[1px]
  w-full
`;

const SocialLoginButton = tw.div`
w-6
h-6
rounded-full
bg-white
flex
justify-center
items-center

`;

const SocialLoginContainer = tw.button`
  rounded-md
  bg-[#26252A]
  py-2
  px-5
  flex
  justify-center
  items-center
  space-x-2
  hover:bg-gray-700
  transition-colors
  `;

const LoginButton = tw.button`
  flex
  justify-center
  items-center
  gap-2
  bg-[#1F3172]
  py-2
  mt-4
  rounded-md
  hover:bg-blue-900
  transition-colors
`;
export default Login;
