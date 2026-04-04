import { configureStore } from "@reduxjs/toolkit";
 import productReducer from "../components/features/products/productSlice";
 export const store = configureStore({
    reducer: {
        product: productReducer,
    },
});