// userSlice.ts

import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import Login from "components/Auth/Login";
import { LoginResponse, smallRoomdata, UserState } from "models/Login.interface";

// Function to retrieve user state from sessionStorage
const loadUserState = (): UserState => {
  const storedState = sessionStorage.getItem("userState");
  return storedState ? JSON.parse(storedState) : initialState;
};

const initialState: UserState = {
  user: {
    memberId: "",
    nickname: "",
    profileImage: "",
    unreadNoteCount: 0,
    joinedRooms: [],
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: loadUserState(),
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.isLoggedIn = false;
    },
    storeMemberId: (state, action: PayloadAction<string>) => {
      state.user.memberId = action.payload;
    },
    decNoteNumber: (state) => {
      state.user.unreadNoteCount = state.user.unreadNoteCount - 1;
    },
    addRoom: (state, action: PayloadAction<smallRoomdata>) => {
      state.user.joinedRooms = [...state.user.joinedRooms, action.payload];
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

export const { login, logout, storeMemberId, decNoteNumber, addRoom } = userSlice.actions;
export default userSlice.reducer;
