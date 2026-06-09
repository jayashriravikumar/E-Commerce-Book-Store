import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Register API
export const register=createAsyncThunk("user/register",async (userData, { rejectWithvalue }) =>{
    try{
        const config={
            headers:{
                "Content-Type": "multipart/form-data",
            },
        };
        const { data } = await axios.post("/api/v1/register", userData,config);
        return data;
    } catch(error){
        return rejectWithvalue(error.response?.data || "Registration failed. Please try again later");
    }
});


const userSlice = createSlice({
    name:"user",
    initialState:{
        user:localStorage.getItem("user")?JSON.parse(localStorage.getItem('user')) : null,
        loading: false,
        error: null,
        success: false,
        isAuthenticated:localStorage.getItem("isAuthenticated") === "true",
        message: null,
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending,(state) =>{
            state.loading = true;
            state.error = null;
         }).addCase(register.fulfilled, (state,action) =>{
            state.loading = false;
            state.error = null;
            state.success = action.payload.success;
            state.user=action.payload?.user || null;
            state.isAuthenticated = Boolean(action.payload?.user);
            //storage in localstorage
            localStorage.setItem("user",JSON.stringify(state.user));
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
        })
        .addCase(register.rejected, (state,action) =>{
            state.loading = false;
            state.error = action.payload?.message || "Registration failed. Please try again later";
            state.user = null;
            state.isAuthenticated = false;
        });
    },
});
export const {removeErrors,removeSuccess } = userSlice.actions;
export default userSlice.reducer;