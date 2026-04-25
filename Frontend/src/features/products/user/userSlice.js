import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// Register API
export const register=createAsyncThunk("user/register",async(useRouteLoaderData,{rejectwithvalue }) =>{
    try {
      const config ={
        headers:{
            "Content-Type":"multipart/form-data",
        },
     };  
        const { data } = await axios.post("/api/v1/register", useRouteLoaderData,config);
        return data;
    } catch (error) {
        return rejectwithvalue(error.response?.data || "Registration failed. Please try again later");
        
    }
})

//Get Profile
export const loadUser = createAsyncThunk("user/loadUser",async(_,{
rejectwithvalue }) =>{
    try{
        const { data } = await axios.get("/api/v1/profile");
        return(data);

    }catch (error){
        return rejectwithvalue(error.response?.data || "Failed to load user profile");
    }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null,
  },

  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated)
        );
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to load user profile";
        state.user = null;
        state.isAuthenticated = false;

        if (action.payload?.statusCode === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");
        }
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;