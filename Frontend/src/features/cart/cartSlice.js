import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    increaseQuantity: (state, action) => {
  const item = state.cartItems.find(
    (item) => item._id === action.payload
  );

  if (item) {
    item.quantity += 1;
  }

  localStorage.setItem(
    "cartItems",
    JSON.stringify(state.cartItems)
  );
},

decreaseQuantity: (state, action) => {
  const item = state.cartItems.find(
    (item) => item._id === action.payload
  );

  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }

  localStorage.setItem(
    "cartItems",
    JSON.stringify(state.cartItems)
  );
},
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (i) => i._id === item._id
      );

      if (existItem) {
  existItem.quantity += item.quantity || 1;
} else {
        state.cartItems.push({
  ...item,
  quantity: item.quantity || 1,
});
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );
    },

    clearCart: (state) => {
      state.cartItems = [];

      localStorage.removeItem("cartItems");
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  saveShippingInfo
} = cartSlice.actions;

export default cartSlice.reducer;