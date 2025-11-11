import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../app/api"; // your API base URL

// Async thunk for registration
export const authRegister = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/auth/register`, userData,{withCredentials:true});
      return response.data; // this is { success, message: { accessToken, userId } }
    } catch (error) {
      // send proper error message to slice
      return rejectWithValue(error.response?.data || { message: "Registration failed" });
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          userId: action.payload.message.userId,
        };
        state.token = action.payload.message.accessToken;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      });
  },
});

export default authSlice.reducer;
