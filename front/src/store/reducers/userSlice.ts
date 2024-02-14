// userSlice.ts

import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { LoginResponse, UserState } from "models/Login.interface";
import { SmallRoomdata } from "models/Room.interface";

// Function to retrieve user state from sessionStorage
const loadUserState = (): UserState => {
  const storedState = sessionStorage.getItem("userState");
  return storedState ? JSON.parse(storedState) : initialUserState;
};

const initialUserState: UserState = {
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
      console.log("logout reducer", state);
      state.user = initialUserState.user;
      state.isLoggedIn = initialUserState.isLoggedIn;
    },
    storeMemberId: (state, action: PayloadAction<string>) => {
      state.user.memberId = action.payload;
    },
    updateUnread: (state, action: PayloadAction<number>) => {
      console.log("updateUnread", action.payload);
      state.user.unreadNoteCount = action.payload;
    },
    addRoom: (state, action: PayloadAction<SmallRoomdata>) => {
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

export const { login, logout, storeMemberId, updateUnread, addRoom } =
  userSlice.actions;
export default userSlice.reducer;
