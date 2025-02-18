import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import accountReducer from "./api/accountSlide";
import globalReducer from "./api/globalSlide";
import { projectApi } from "./api/projectApi";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    global: globalReducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectApi.middleware), // Thêm middleware của projectApi
  // .concat(taskApi.middleware), // Thêm middleware của taskApi
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
