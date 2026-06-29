import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const subscribeNewsletter = createAsyncThunk(
  "newsletter/subscribe",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/newsletter/subscribe",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Subscription failed.",
        },
      );
    }
  },
);

const newsletterSlice = createSlice({
  name: "newsletter",

  initialState: {
    loading: false,
    success: false,
    error: null,
    message: "",
  },

  reducers: {
    clearNewsletterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(subscribeNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(subscribeNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })

      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Subscription failed.";
      });
  },
});

export const { clearNewsletterState } = newsletterSlice.actions;

export default newsletterSlice.reducer;
