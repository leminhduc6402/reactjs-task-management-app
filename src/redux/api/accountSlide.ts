import { createSlice } from "@reduxjs/toolkit";
import { IAccount } from "../../types/backend";

const initialState: IAccount = {
  access_token: "",
  isAuthenticated: false,
  user: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
  },
};

// export const fetchAccount = createAsyncThunk('auth/')

export const accountSlide = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.isAuthenticated = true;
      state.access_token = action?.payload.access_token;
      state.user = action?.payload.user;
    },
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.user = {
        _id: "",
        name: "",
        email: "",
        avatar: "",
      };
    },
  },
});
export const { setUserLogin, logout } = accountSlide.actions;
export default accountSlide.reducer;
