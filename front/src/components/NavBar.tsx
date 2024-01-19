import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  //임시
  const isLogin = true;

  return (
    <div>
      <Link to="/">코밋</Link> |
      {isLogin ? (
        <>
          <Link to="/roomlist">방 찾기</Link>|
          <Link to="/community">커뮤니티</Link>|
          <Link to="/Mypage">프로필사진</Link>
        </>
      ) : (
        <>
          <Link to="/login">로그인</Link>|<Link to="/signup">회원가입</Link>
        </>
      )}
    </div>
  );
};
