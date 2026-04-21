import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: {},
  },
  reducers: {
    addCartItem: (state, action) => {
      state.cartItems = { ...state.cartItems, ...action.payload };
    },
    removeCartItem: (state, action) => {
      delete state.cartItems[action.payload];
    },
  },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
