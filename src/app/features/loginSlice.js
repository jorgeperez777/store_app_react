import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    isLogin: false,
  },
  reducers: {
    setIsLoginUser: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setIsLoginUser } = loginSlice.actions;
export default loginSlice.reducer;
