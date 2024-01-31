import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/reducers/userSlice";
import { UserState } from "../types";
import api from "../api/auth";
import Modal from "./Modal";

function Login() {
  const dispatch = useDispatch();
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        memberId,
        password,
      });
      console.log(response);
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  const refresh = () => {
    try {
      const response = api.post("/auth/test");
    } catch (error: any) {
      console.error("refresh failed:", error.message);
    }
  };
  return (
    <div>
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
      <button onClick={handleLogin}>Login</button>
      <button onClick={refresh}>REFRESH</button>
    </div>
    // <Modal option="login"></Modal>
  );
}

export default Login;
