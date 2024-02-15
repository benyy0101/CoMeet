// userSlice.ts

import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { KeywordState } from "models/Keyword.interface";
import { LoginResponse, UserState } from "models/Login.interface";
import { Keyword } from "models/Util";

// Function to retrieve user state from sessionStorage
const loadKeywordState = (): KeywordState => {
  const storedState = sessionStorage.getItem("keywordState");
  return storedState ? JSON.parse(storedState) : initialState;
};

const initialState: KeywordState = {
  keywords: [],
  candidate: [],
};

const keywordSlice = createSlice({
  name: "keyword",
  initialState: loadKeywordState(),
  reducers: {
    getKeywords: (state, action: PayloadAction<Keyword[]>) => {
      state.keywords = action.payload;
      state.candidate = [""];
    },
    // login: (state, action: PayloadAction<LoginResponse>) => {
    //   state.user = action.payload;
    //   state.isLoggedIn = true;
    // },
    // storeMemberId: (state, action: PayloadAction<string>) => {
    //   state.user.memberId = action.payload;
    // },
  },
});

const saveKeywordState = (state: KeywordState) => {
  sessionStorage.setItem("keywordState", JSON.stringify(state));
};

export const setupKeywordStatePersistence = (store: Store) => {
  store.subscribe(() => {
    const state = store.getState().keyword;
    saveKeywordState(state);
  });
};

export const { getKeywords } = keywordSlice.actions;
export default keywordSlice.reducer;
