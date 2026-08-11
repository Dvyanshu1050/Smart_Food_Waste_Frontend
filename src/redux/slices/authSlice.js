import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// =====================================================
// API URL
// =====================================================

const API_URL = "http://localhost:5000/api";

// =====================================================
// STORED TOKEN / USER
// =====================================================

const storedToken = localStorage.getItem("token");

const storedUser = localStorage.getItem("user");

let initialUser = null;

try {
  initialUser = storedUser
    ? JSON.parse(storedUser)
    : null;
} catch (error) {
  localStorage.removeItem("user");
  initialUser = null;
}

// =====================================================
// LOGIN
// =====================================================

export const login = createAsyncThunk(
  "auth/login",

  async (
    loginData,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        loginData
      );

      const {
        token,
        user,
      } = response.data;

      // Save token
      localStorage.setItem(
        "token",
        token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      return {
        token,
        user,
      };

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  }
);

// =====================================================
// REGISTER
// =====================================================

export const register = createAsyncThunk(
  "auth/register",

  async (
    registerData,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        registerData
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  // =========================
  // AUTH
  // =========================

  token: storedToken || null,

  user: initialUser,

  loading: false,

  error: null,

  success: false,
};

// =====================================================
// SLICE
// =====================================================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    // =================================================
    // LOGOUT
    // =================================================

    logout: (state) => {
      state.token = null;

      state.user = null;

      state.loading = false;

      state.error = null;

      state.success = false;

      localStorage.removeItem("token");

      localStorage.removeItem("user");
    },

    // =================================================
    // CLEAR AUTH ERROR
    // =================================================

    clearAuthError: (state) => {
      state.error = null;
    },

    // =================================================
    // CLEAR AUTH SUCCESS
    // =================================================

    clearAuthSuccess: (state) => {
      state.success = false;
    },

    // =================================================
    // UPDATE USER
    // =================================================

    updateAuthUser: (
      state,
      action
    ) => {
      state.user = action.payload;

      localStorage.setItem(
        "user",
        JSON.stringify(
          action.payload
        )
      );
    },
  },

  // ===================================================
  // EXTRA REDUCERS
  // ===================================================

  extraReducers: (builder) => {

    // =================================================
    // LOGIN
    // =================================================

    builder

      // PENDING
      .addCase(
        login.pending,
        (state) => {
          state.loading = true;

          state.error = null;

          state.success = false;
        }
      )

      // SUCCESS
      .addCase(
        login.fulfilled,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.token =
            action.payload.token;

          state.user =
            action.payload.user;

          state.error = null;

          state.success = true;
        }
      )

      // ERROR
      .addCase(
        login.rejected,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.token = null;

          state.user = null;

          state.error =
            action.payload ||
            "Login failed";

          state.success = false;

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );
        }
      );

    // =================================================
    // REGISTER
    // =================================================

    builder

      // PENDING
      .addCase(
        register.pending,
        (state) => {
          state.loading = true;

          state.error = null;

          state.success = false;
        }
      )

      // SUCCESS
      .addCase(
        register.fulfilled,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.error = null;

          state.success = true;
        }
      )

      // ERROR
      .addCase(
        register.rejected,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Registration failed";

          state.success = false;
        }
      );
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  logout,
  clearAuthError,
  clearAuthSuccess,
  updateAuthUser,
} = authSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default authSlice.reducer;