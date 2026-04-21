import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";

export default configureStore({
  reducer: {
    loginSlice: loginSlice,
    cartSlice: cartSlice,
  },
});
