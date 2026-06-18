import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API call to create a new order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post("/api/v1/new/order", orderData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to place order");
    }
  }
);

export const myOrders = createAsyncThunk(
  "order/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/orders/user", { withCredentials: true });
      return data.orders; // From getAllOrders controller
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${id}`, { withCredentials: true });
      return data.order; // From getOrderDetails controller
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const cancelMyOrder = createAsyncThunk(
  "order/cancelMyOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/order/cancel/${id}`, {}, { withCredentials: true });
      return data.order; // Returns the updated order
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    order: null,
    success: false,
    orders: [], // To hold history
    orderDetails: null,
  },
  reducers: {
    clearOrderErrors: (state) => {
      state.error = null;
    },
    resetOrderSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get My Orders
      .addCase(myOrders.pending, (state) => { state.loading = true; })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        })
      
      // Get Order Details (Tracking)
      .addCase(getOrderDetails.pending, (state) => { state.loading = true; })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(cancelMyOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelMyOrder.fulfilled, (state, action) => {
        state.loading = false;
        // THIS IS THE MAGIC LINE: 
        // It instantly replaces the old active order in Redux with the newly cancelled order from the backend.
        state.orderDetails = action.payload; 
      })
      .addCase(cancelMyOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderErrors, resetOrderSuccess } = orderSlice.actions;
export default orderSlice.reducer;