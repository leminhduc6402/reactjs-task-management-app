import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GlobalType = {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
};
const initialState: GlobalType = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

export const globalSlide = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsDarkMode, setIsSidebarCollapsed } = globalSlide.actions;
export default globalSlide.reducer;
