// userSlice.ts

import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { FollowContent, FollowState } from "models/Follow.interface";

const loadFollowState = (): FollowState => {
  const storedState = sessionStorage.getItem("follow");
  return storedState ? JSON.parse(storedState) : initialState;
};

const initialState: FollowState = {
  following: [],
  followed: [],
};

const followSlice = createSlice({
  name: "follow",
  initialState: loadFollowState(),
  reducers: {
    setFollowing: (state, action: PayloadAction<FollowContent[]>) => {
      state.following = action.payload;
      console.log(state.following);
    },
    setFollowed: (state, action: PayloadAction<FollowContent[]>) => {
      state.followed = action.payload;
      console.log(state.followed);
    },
    addFollowing: (state, action: PayloadAction<FollowContent>) => {
      state.following.push(action.payload);
    },
    addFollowed: (state, action: PayloadAction<FollowContent>) => {
      state.followed.push(action.payload);
    },
    removeFollowing: (state, action: PayloadAction<string>) => {
      state.following = state.following.filter(
        (f) => f.memberId !== action.payload
      );
    },
    removeFollowed: (state, action: PayloadAction<string>) => {
      state.followed = state.followed.filter(
        (f) => f.memberId !== action.payload
      );
    },
  },
});

const saveFollowState = (state: FollowState) => {
  sessionStorage.setItem("follow", JSON.stringify(state));
};

export const setupfollowStatePersistence = (store: Store) => {
  store.subscribe(() => {
    const state = store.getState().keyword;
    saveFollowState(state);
  });
};

export const {
  setFollowed,
  setFollowing,
  addFollowed,
  addFollowing,
  removeFollowed,
  removeFollowing,
} = followSlice.actions;
export default followSlice.reducer;
