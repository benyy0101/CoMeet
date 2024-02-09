import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { stat } from "fs";
import { EnterRoomResponse } from "models/Room.interface";

export interface RoomStore {
  isRoomIn: boolean;
  room: EnterRoomResponse;
  isMicMuted: boolean;
  isVideoOn: boolean;
}

const initialState: RoomStore = {
  isRoomIn: false,
  isMicMuted: false,
  isVideoOn: false,
  room: {
    managerId: "",
    managerNickname: "",
    title: "mocked room title",
    description: "",
    room_image: "",
    notice: "",
    mcount: 0,
    link: "",
    capacity: 0,
    isLocked: false,
    password: "",
    constraints: "FREE",
    type: "DISPOSABLE",
    members: [],
    lounges: [],
    channels: [],
    keywords: [],
  },
};

const loadRoomState = () => {
  const storedState = sessionStorage.getItem("roomState");
  return storedState ? JSON.parse(storedState) : initialState;
};

const roomSlice = createSlice({
  name: "room",
  initialState: loadRoomState(),
  reducers: {
    setEnterRoom: (state, action: PayloadAction<EnterRoomResponse>) => {
      Object.assign(state, action.payload);
    },
    setLeaveRoom: (state) => {
      return initialState;
    },
    setMicStatus: (state, action: PayloadAction<boolean>) => {
      state.isMicMuted = action.payload;
      console.log(state.isMicMuted);
    },
    setVideoStatus: (state, action: PayloadAction<boolean>) => {
      state.isVideoOn = action.payload;
      console.log(state.isVideoOn);
    },
    setIsRoomIn: (state, action: PayloadAction<boolean>) => {
      state.isRoomIn = action.payload;
    },
  },
});

const saveRoomState = (state: EnterRoomResponse) => {
  sessionStorage.setItem("roomState", JSON.stringify(state));
};

export const setupRoomStatePersistence = (store: Store) => {
  store.subscribe(() => {
    const state = store.getState().room;
    saveRoomState(state);
  });
};

export const {
  setEnterRoom,
  setLeaveRoom,
  setIsRoomIn,
  setMicStatus,
  setVideoStatus,
} = roomSlice.actions;

export default roomSlice.reducer;
