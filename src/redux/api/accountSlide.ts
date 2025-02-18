import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/backend";

interface IState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  user: IUser;
}

const initialState: IState = {
  isAuthenticated: false,
  isLoading: true,
  isSidebarCollapsed: false,
  isDarkMode: false,
  user: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
  },
};

export const accountSlide = createSlice({
  name: "account",
  initialState,
  reducers: {},
});

// export const { } = accountSlide.actions;
export default accountSlide.reducer;
