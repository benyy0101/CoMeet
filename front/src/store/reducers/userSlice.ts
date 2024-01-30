// userSlice.ts

import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";

interface UserState {
  user: {
    memberId: string;
    name: string;
    password: string;
    email: string;
    nickname: string;
  };
  isLoggedIn: boolean;
  token: string | null;
}

// Function to retrieve user state from sessionStorage
const loadUserState = (): UserState => {
  const storedState = sessionStorage.getItem("userState");
  return storedState ? JSON.parse(storedState) : initialState;
};

const initialState: UserState = {
  user: {
    memberId: "",
    name: "",
    password: "",
    email: "",
    nickname: "",
  },
  isLoggedIn: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: loadUserState(),
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: UserState["user"]; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.isLoggedIn = false;
      state.token = null;
    },
    signup: (
      state,
      action: PayloadAction<{ user: UserState["user"]; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
  },
});

const saveUserState = (state: UserState) => {
  sessionStorage.setItem("userState", JSON.stringify(state));
};

export const setupUserStatePersistence = (store: Store) => {
  store.subscribe(() => {
    const state = store.getState().user;
    saveUserState(state);
  });
};

export const { login, logout, signup } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsLoggedIn = (state: { user: UserState }) =>
  state.user.isLoggedIn;
export const selectToken = (state: { user: UserState }) => state.user.token;

export default userSlice.reducer;
