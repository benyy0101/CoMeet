import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/userSlice";
import { UserState } from "../../types";
import { handleLogin, handleLogout } from "../../api/auth";
import Modal from "../common/Modal";
import ModalPortal from "../../utils/Portal";
import { QueryFunction, useQuery } from "@tanstack/react-query";

function Login() {
  const dispatch = useDispatch();
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  const { data, isError, isLoading, refetch } = useQuery<UserState, Error>({
    queryKey: ["user"],
    queryFn: () => handleLogin(memberId, password),
    enabled: false,
  });

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };
  return (
    <div>
      <form onSubmit={loginHandler}>
        <input
          type="text"
          placeholder="Username"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
    // <Modal option="login"></Modal>
  );
}

export default Login;
