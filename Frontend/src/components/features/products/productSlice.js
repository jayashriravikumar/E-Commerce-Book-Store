import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getProduct = createAsyncThunk("product/getProduct", async (payload,
{ rejectWithValue }) => {
  try {
    const link = "http://localhost:8000/api/v1/products";
    const { data } = await axios.get(link, {
  withCredentials: true
});
    console.log(error.response?.data);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Something went wrong..!");
  }
});


const productSlice =createSlice({
    name: "product",
    initialState: {
        products: [],
        productCount: 0, 
        loading: false,
        error: null,
},
reducers: {
    removeErrors: (state) =>{
        state.error =null;
    },
},
extraReducers: (builder) => {
    builder
    .addCase(getProduct.pending, (state) =>{
        state.loading =true;
        state.error =null;
    })
    .addCase(getProduct.fulfilled, (state,action) =>{
        console,log("Fullfilled action payload",action.payload);
        state.loading = true;
        state.error = null;
        state.products =action.payload.products;
        state.productCount =action.payload.productCount;
    })
    .addCase(getProduct.rejected, (state,action) =>{
        state.loading =true;
        state.error=action.payload || "Something went wrong";
    });
},
 });

 export const { removeErrors } = productSlice.actions;
 export default productSlice.reducer;
