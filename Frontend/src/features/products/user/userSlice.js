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

//Login API

export const login =createAsyncThunk ("user/login", async (email, password, {rejectWithValue}) => {
  try {
    const config ={
        headers:{
            "Content-Type":"application/json",
        },
    };
  const { data } =await axios.post("/api/v1/login", { email, password }, config);
 console.log("Login Data", data);
 return data;
  }catch (error) {
 return rejectWithValue (error.response?.data || "Login failed. Please try again later");
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
    .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(register.fulfilled, (state, action) => {
        state.loading = true;
        state.error = null; 
        state.success= action.payload.success;
        state.user =action.payload?.user || null;
        state.isAuthenticated =Boolean (action.payload?.user);

          //Store in localStorage
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
    })
    .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error= action.payload?.message || "Registration failed. Please try again later";
      state.user = null;
      state.isAuthenticated = false;
    });
    //Login
    builder
    .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
        state.loading = true;
        state.error = null; 
        state.success= action.payload.success;
        state.user =action.payload?.user || null;
        state.isAuthenticated =Boolean (action.payload?.user);

          //Store in localStorage
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
    })
    .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error= action.payload?.message || "Login failed. Please try again later";
      state.user = null;
      state.isAuthenticated = false;
    });


    // Loading User
    builder
    .addCase (loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase (loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user= action.payload?.user || null;
        state.isAuthenticated =Boolean(action.payload?.user);
        //Store in localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
    })
    .addCase (loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error =action.payload?.message || "Failed to load user profile";
        state.user = null;
        state.isAuthenticated = false;
        if (action.payload?.statusCode === 401) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
        }
    });
},
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;