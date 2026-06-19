import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  savedItems: JSON.parse(localStorage.getItem("savedItems")) || [],
  shippingInfo:
    JSON.parse(localStorage.getItem("shippingInfo")) || {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
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

    saveForLater: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload
      );

      if (!item) return;

      state.savedItems.push(item);

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );

      localStorage.setItem(
        "savedItems",
        JSON.stringify(state.savedItems)
      );
    },

    moveToCart: (state, action) => {
      const item = state.savedItems.find(
        (item) => item._id === action.payload
      );

      if (!item) return;

      state.cartItems.push(item);

      state.savedItems = state.savedItems.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems)
      );

      localStorage.setItem(
        "savedItems",
        JSON.stringify(state.savedItems)
      );
    },

    removeSavedItem: (state, action) => {
      state.savedItems = state.savedItems.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem(
        "savedItems",
        JSON.stringify(state.savedItems)
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

      localStorage.setItem(
        "shippingInfo",
        JSON.stringify(state.shippingInfo)
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  saveForLater,
  moveToCart,
  removeSavedItem,
  saveShippingInfo,
} = cartSlice.actions;

export default cartSlice.reducer;