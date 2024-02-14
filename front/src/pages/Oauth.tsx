import { githubLogin } from "api/Auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "store/reducers/userSlice";

function Oauth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const fetchOAuth = async () => {
      if (code) {
        const res = await githubLogin(code);
        console.log(res);
        dispatch(login(res));
        window.location.href = "/";
      }
    };
    fetchOAuth();
  }, []);
  return <div>이동중</div>;
}

export default Oauth;
