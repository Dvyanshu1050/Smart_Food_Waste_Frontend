import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// =====================================================
// API URL
// =====================================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

// =====================================================
// TOKEN
// =====================================================

const getToken = () => {
  return localStorage.getItem("token");
};

// =====================================================
// AUTH HEADERS
// =====================================================

const getAuthConfig = () => {
  const token = getToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// =====================================================
// GET ALL USERS
// GET /api/admin/users
// =====================================================

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/users`,
        getAuthConfig()
      );

      return response.data.users;
    } catch (error) {
      console.error(
        "Fetch Users Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    }
  }
);

// =====================================================
// BLOCK USER
// PATCH /api/admin/users/:userId/block
// =====================================================

export const blockUser = createAsyncThunk(
  "users/blockUser",

  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/admin/users/${userId}/block`,
        {},
        getAuthConfig()
      );

      return response.data.user;
    } catch (error) {
      console.error(
        "Block User Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to block user"
      );
    }
  }
);

// =====================================================
// UNBLOCK USER
// PATCH /api/admin/users/:userId/unblock
// =====================================================

export const unblockUser = createAsyncThunk(
  "users/unblockUser",

  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/admin/users/${userId}/unblock`,
        {},
        getAuthConfig()
      );

      return response.data.user;
    } catch (error) {
      console.error(
        "Unblock User Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to unblock user"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// =====================================================
// SLICE
// =====================================================

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },

    clearUsers: (state) => {
      state.users = [];
    },
  },

  // ===================================================
  // EXTRA REDUCERS
  // ===================================================

  extraReducers: (builder) => {
    // ================================================
    // FETCH USERS
    // ================================================

    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ================================================
    // BLOCK USER
    // ================================================

    builder
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedUser = action.payload;

        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ================================================
    // UNBLOCK USER
    // ================================================

    builder
      .addCase(unblockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(unblockUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedUser = action.payload;

        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      .addCase(unblockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearUserError,
  clearUsers,
} = userSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default userSlice.reducer;