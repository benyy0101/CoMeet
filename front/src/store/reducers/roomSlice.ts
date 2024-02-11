import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { stat } from "fs";
import { RoomResponse } from "models/Room.interface";

export interface RoomState {
  roomId: string;
  isRoomIn: boolean;
}

const initialState: RoomState = {
  roomId: "",
  isRoomIn: false,
};

const loadRoomState = () => {
  const storedState = sessionStorage.getItem("roomState");
  return storedState ? JSON.parse(storedState) : initialState;
};

const roomSlice = createSlice({
  name: "room",
  initialState: loadRoomState(),
  reducers: {
    setEnterRoom: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
      state.isRoomIn = true;
    },
    setLeaveRoom: (state) => {
      state.roomId = initialState.roomId;
      state.isRoomIn = false;
    },
  },
});

const saveRoomState = (state: RoomState) => {
  sessionStorage.setItem("roomState", JSON.stringify(state));
};

export const setupRoomStatePersistence = (store: Store) => {
  store.subscribe(() => {
    const state = store.getState().room;
    saveRoomState(state);
  });
};

export const { setEnterRoom, setLeaveRoom } = roomSlice.actions;

export default roomSlice.reducer;
