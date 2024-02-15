import { githubLogin } from "api/Auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "store/reducers/userSlice";
import tw from "tailwind-styled-components";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { searchKeyword } from "api/Keyword";
import { get } from "http";
import { getKeywords } from "store/reducers/keywordSlice";

function Oauth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const fetchOAuth = async () => {
      if (code) {
        const res = await githubLogin(code);
        const resKeyword = await searchKeyword({});
        //console.log(res);
        dispatch(getKeywords(resKeyword));
        dispatch(login(res));
        window.location.href = "/";
      }
    };
    fetchOAuth();
  }, []);
  return (
    <Wrapper>
      <div>로그인 중입니다...</div>
      <ArrowPathIcon className="animate-spin h-40 w-40" />
    </Wrapper>
  );
}

const Wrapper = tw.div`
  flex
  justify-center
  items-center
  w-96
  h-96
`;

export default Oauth;
