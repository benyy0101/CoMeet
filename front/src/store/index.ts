// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer, { setupUserStatePersistence } from "./reducers/userSlice";
import roomReducer, { setupRoomStatePersistence } from "./reducers/roomSlice"; //
import keywordReducer, {
  setupKeywordStatePersistence,
} from "./reducers/keywordSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "room", "keyword"],
};

const userPersistReducer = persistReducer(persistConfig, userReducer);
const roomPersistReducer = persistReducer(persistConfig, roomReducer);
const keywordPersistReducer = persistReducer(persistConfig, keywordReducer);

const store = configureStore({
  reducer: {
    user: userPersistReducer,
    room: roomPersistReducer,
    keyword: keywordPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }), // Disable thunk and serializableCheck
});

setupUserStatePersistence(store);
setupRoomStatePersistence(store);
setupKeywordStatePersistence(store);

export const persistor = persistStore(store);

export default store;
