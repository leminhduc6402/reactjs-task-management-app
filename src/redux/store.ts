import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import accountReducer from "./api/accountSlide";
import globalReducer from "./api/globalSlide";
import { projectApi } from "./api/projectApi";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";

// Cấu hình redux-persist
const persistConfig = {
  key: "root", // Tên key trong localStorage
  storage, // Dùng localStorage để lưu Redux state
  whitelist: ["account", "global"], // Chỉ lưu các reducer cần thiết
};

// Bọc reducer với persistReducer
const persistedAccountReducer = persistReducer(
  { key: "account", storage },
  accountReducer
);
const persistedGlobalReducer = persistReducer(
  { key: "global", storage },
  globalReducer
);

// Tạo Redux store
export const store = configureStore({
  reducer: {
    account: persistedAccountReducer,
    global: persistedGlobalReducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(projectApi.middleware),
});

// Tạo persistor
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
