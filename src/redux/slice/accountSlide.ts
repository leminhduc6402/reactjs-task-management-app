import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
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
