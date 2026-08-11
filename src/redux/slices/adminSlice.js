import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// =====================================================
// API URL
// =====================================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://smart-food-waste-backend.onrender.com");

// =====================================================
// GET TOKEN
// =====================================================

const getToken = () => {
  return localStorage.getItem("token");
};

// =====================================================
// AUTH CONFIG
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
// FETCH ADMIN STATS
// GET /api/admin/stats
// =====================================================

export const fetchAdminStats = createAsyncThunk(
  "admin/fetchAdminStats",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/stats`,
        getAuthConfig()
      );

      return response.data.stats;
    } catch (error) {
      console.error(
        "Fetch Admin Stats Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch admin statistics"
      );
    }
  }
);

// =====================================================
// FETCH ALL DONATIONS
// GET /api/admin/donations
// =====================================================

export const fetchAdminDonations = createAsyncThunk(
  "admin/fetchAdminDonations",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/donations`,
        getAuthConfig()
      );

      return response.data.donations;
    } catch (error) {
      console.error(
        "Fetch Admin Donations Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch donations"
      );
    }
  }
);

// =====================================================
// FETCH ALL USERS
// GET /api/admin/users
// =====================================================

export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchAdminUsers",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/users`,
        getAuthConfig()
      );

      return response.data.users;
    } catch (error) {
      console.error(
        "Fetch Admin Users Error:",
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

export const toggleUserBlock = createAsyncThunk(
  "admin/toggleUserBlock",

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
        "Toggle User Block Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update user status"
      );
    }
  }
);

// =====================================================
// APPROVE NGO / VOLUNTEER
// PATCH /api/admin/users/:userId/approve
// =====================================================

export const approveUserVerification =
  createAsyncThunk(
    "admin/approveUserVerification",

    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.patch(
          `${API_URL}/api/admin/users/${userId}/approve`,
          {},
          getAuthConfig()
        );

        return response.data.user;
      } catch (error) {
        console.error(
          "Approve User Error:",
          error.response?.data || error.message
        );

        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to approve user"
        );
      }
    }
  );

// =====================================================
// REJECT NGO / VOLUNTEER
// PATCH /api/admin/users/:userId/reject
// =====================================================

export const rejectUserVerification =
  createAsyncThunk(
    "admin/rejectUserVerification",

    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.patch(
          `${API_URL}/api/admin/users/${userId}/reject`,
          {},
          getAuthConfig()
        );

        return response.data.user;
      } catch (error) {
        console.error(
          "Reject User Error:",
          error.response?.data || error.message
        );

        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to reject user"
        );
      }
    }
  );

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  // ADMIN STATS
  stats: {
    totalDonations: 0,
    deliveredDonations: 0,
    availableDonations: 0,
    claimedDonations: 0,
    pickedUpDonations: 0,

    totalUsers: 0,
    totalDonors: 0,
    totalNGOs: 0,
    totalVolunteers: 0,

    deliveryPercentage: 0,
  },

  // DONATIONS
  donations: [],

  // USERS
  users: [],

  // COMMON
  loading: false,
  error: null,
};

// =====================================================
// SLICE
// =====================================================

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {
    // =================================================
    // CLEAR ERROR
    // =================================================

    clearAdminError: (state) => {
      state.error = null;
    },

    // =================================================
    // CLEAR DONATIONS
    // =================================================

    clearAdminDonations: (state) => {
      state.donations = [];
    },

    // =================================================
    // CLEAR USERS
    // =================================================

    clearAdminUsers: (state) => {
      state.users = [];
    },

    // =================================================
    // SOCKET: ADD NEW USER
    // =================================================

    addUser: (state, action) => {
      const newUser = action.payload;

      const exists = state.users.some(
        (user) => user._id === newUser._id
      );

      if (!exists) {
        state.users.unshift(newUser);
      }
    },

    // =================================================
    // SOCKET: UPDATE USER
    // =================================================

    updateUser: (state, action) => {
      const updatedUser = action.payload;

      const index = state.users.findIndex(
        (user) => user._id === updatedUser._id
      );

      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          ...updatedUser,
        };
      }
    },

    // =================================================
    // SOCKET: REMOVE USER
    // =================================================

    removeUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user._id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    // =====================================================
    // ADMIN STATS
    // =====================================================

    builder
      .addCase(
        fetchAdminStats.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminStats.fulfilled,
        (state, action) => {
          state.loading = false;
          state.stats = action.payload;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminStats.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // =====================================================
    // ADMIN DONATIONS
    // =====================================================

    builder
      .addCase(
        fetchAdminDonations.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminDonations.fulfilled,
        (state, action) => {
          state.loading = false;
          state.donations = action.payload;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminDonations.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // =====================================================
    // ADMIN USERS
    // =====================================================

    builder
      .addCase(
        fetchAdminUsers.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminUsers.fulfilled,
        (state, action) => {
          state.loading = false;
          state.users = action.payload;
          state.error = null;
        }
      )

      .addCase(
        fetchAdminUsers.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // =====================================================
    // BLOCK / UNBLOCK
    // =====================================================

    builder
      .addCase(
        toggleUserBlock.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        toggleUserBlock.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          const updatedUser = action.payload;

          const index = state.users.findIndex(
            (user) =>
              user._id === updatedUser._id
          );

          if (index !== -1) {
            state.users[index] = {
              ...state.users[index],
              ...updatedUser,
            };
          }
        }
      )

      .addCase(
        toggleUserBlock.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // =====================================================
    // APPROVE USER
    // =====================================================

    builder
      .addCase(
        approveUserVerification.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        approveUserVerification.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          const updatedUser = action.payload;

          const index = state.users.findIndex(
            (user) =>
              user._id === updatedUser._id
          );

          if (index !== -1) {
            state.users[index] = {
              ...state.users[index],
              ...updatedUser,
            };
          }
        }
      )

      .addCase(
        approveUserVerification.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // =====================================================
    // REJECT USER
    // =====================================================

    builder
      .addCase(
        rejectUserVerification.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        rejectUserVerification.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          const updatedUser = action.payload;

          const index = state.users.findIndex(
            (user) =>
              user._id === updatedUser._id
          );

          if (index !== -1) {
            state.users[index] = {
              ...state.users[index],
              ...updatedUser,
            };
          }
        }
      )

      .addCase(
        rejectUserVerification.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearAdminError,
  clearAdminDonations,
  clearAdminUsers,
  addUser,
  updateUser,
  removeUser,
} = adminSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default adminSlice.reducer;