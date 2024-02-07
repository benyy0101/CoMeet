// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer, { setupUserStatePersistence } from "./reducers/userSlice";
import roomReducer from "./reducers/roomSlice"; // 

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","room"],
};

const userPersistReducer = persistReducer(persistConfig, userReducer);
const roomPersistReducer = persistReducer(persistConfig, roomReducer);

const store = configureStore({
  reducer: {
    user: userPersistReducer,
    room: roomPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }), // Disable thunk and serializableCheck
});

setupUserStatePersistence(store);

export const persistor = persistStore(store);

export default store;
