import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import socket from "../../socket";

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
// CREATE DONATION
// POST /api/donations
// =====================================================

export const createDonation = createAsyncThunk(
  "donations/createDonation",

  async (donationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/donations`,
        donationData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.donation;
    } catch (error) {
      console.error(
        "Create Donation Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create donation"
      );
    }
  }
);

// =====================================================
// GET MY DONATIONS
// GET /api/donations/my
// =====================================================

export const fetchMyDonations = createAsyncThunk(
  "donations/fetchMyDonations",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/donations/my`,
        getAuthConfig()
      );

      return response.data.donations;
    } catch (error) {
      console.error(
        "Fetch My Donations Error:",
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
// GET MY CLAIMS
// GET /api/donations/my-claims
// =====================================================

export const fetchMyClaims = createAsyncThunk(
  "donations/fetchMyClaims",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/donations/my-claims`,
        getAuthConfig()
      );

      return response.data.donations;
    } catch (error) {
      console.error(
        "Fetch My Claims Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch your claims"
      );
    }
  }
);

// =====================================================
// GET AVAILABLE DONATIONS
// GET /api/donations/available
// =====================================================

export const fetchAvailableDonations = createAsyncThunk(
  "donations/fetchAvailableDonations",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/donations/available`,
        getAuthConfig()
      );

      return response.data.donations;
    } catch (error) {
      console.error(
        "Fetch Available Donations Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch available donations"
      );
    }
  }
);

// =====================================================
// CLAIM DONATION
// PATCH /api/donations/:id/claim
// =====================================================

export const claimDonation = createAsyncThunk(
  "donations/claimDonation",

  async (donationId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/donations/${donationId}/claim`,
        {},
        getAuthConfig()
      );

      return response.data.donation;
    } catch (error) {
      console.error(
        "Claim Donation Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to claim donation"
      );
    }
  }
);

// =====================================================
// PICKUP DONATION
// PATCH /api/donations/:id/pickup
// =====================================================

export const pickupDonation = createAsyncThunk(
  "donations/pickupDonation",

  async (donationId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/donations/${donationId}/pickup`,
        {},
        getAuthConfig()
      );

      return response.data.donation;
    } catch (error) {
      console.error(
        "Pickup Donation Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to pickup donation"
      );
    }
  }
);

// =====================================================
// SET DELIVERY LOCATION
// PATCH /api/donations/:id/delivery-location
// =====================================================

export const setDeliveryLocation = createAsyncThunk(
  "donations/setDeliveryLocation",

  async (
    {
      donationId,
      deliveryLocation,
      deliveryLatitude,
      deliveryLongitude,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/donations/${donationId}/delivery-location`,
        {
          deliveryLocation,
          deliveryLatitude,
          deliveryLongitude,
        },
        getAuthConfig()
      );

      return response.data.donation;
    } catch (error) {
      console.error(
        "Set Delivery Location Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to save delivery location"
      );
    }
  }
);

// =====================================================
// DELIVER DONATION
// PATCH /api/donations/:id/deliver
// =====================================================

export const deliverDonation = createAsyncThunk(
  "donations/deliverDonation",

  async (donationId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/donations/${donationId}/deliver`,
        {},
        getAuthConfig()
      );

      return response.data.donation;
    } catch (error) {
      console.error(
        "Deliver Donation Error:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to deliver donation"
      );
    }
  }
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  donations: [],
  loading: false,
  error: null,
  success: false,
};

// =====================================================
// SLICE
// =====================================================

const donationSlice = createSlice({
  name: "donations",

  initialState,

  reducers: {
    // =================================================
    // SOCKET: DONATION CREATED
    // =================================================

    socketDonationCreated: (state, action) => {
      const donation = action.payload;

      const exists = state.donations.some(
        (item) => item._id === donation._id
      );

      if (!exists) {
        state.donations.unshift(donation);
      }
    },

    // =================================================
    // SOCKET: DONATION CLAIMED
    // =================================================

    socketDonationClaimed: (state, action) => {
      const updatedDonation = action.payload;

      const index = state.donations.findIndex(
        (item) =>
          item._id === updatedDonation._id
      );

      if (index !== -1) {
        state.donations[index] =
          updatedDonation;
      }
    },

    // =================================================
    // SOCKET: DELIVERY LOCATION UPDATED
    // =================================================

    socketDonationDeliveryLocationUpdated: (
      state,
      action
    ) => {
      const updatedDonation = action.payload;

      const index = state.donations.findIndex(
        (item) =>
          item._id === updatedDonation._id
      );

      if (index !== -1) {
        state.donations[index] =
          updatedDonation;
      }
    },

    // =================================================
    // SOCKET: DONATION PICKED UP
    // =================================================

    socketDonationPickedUp: (
      state,
      action
    ) => {
      const updatedDonation =
        action.payload;

      const index =
        state.donations.findIndex(
          (item) =>
            item._id ===
            updatedDonation._id
        );

      if (index !== -1) {
        state.donations[index] =
          updatedDonation;
      }
    },

    // =================================================
    // SOCKET: DONATION DELIVERED
    // =================================================

    socketDonationDelivered: (
      state,
      action
    ) => {
      const updatedDonation =
        action.payload;

      const index =
        state.donations.findIndex(
          (item) =>
            item._id ===
            updatedDonation._id
        );

      if (index !== -1) {
        state.donations[index] =
          updatedDonation;
      }
    },

    // =================================================
    // CLEAR ERROR
    // =================================================

    clearDonationError: (state) => {
      state.error = null;
    },

    // =================================================
    // CLEAR SUCCESS
    // =================================================

    clearDonationSuccess: (state) => {
      state.success = false;
    },

    // =================================================
    // CLEAR DONATIONS
    // =================================================

    clearDonations: (state) => {
      state.donations = [];
    },
  },

  // ===================================================
  // EXTRA REDUCERS
  // ===================================================

  extraReducers: (builder) => {
    // =================================================
    // CREATE DONATION
    // =================================================

    builder
      .addCase(
        createDonation.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        createDonation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          const exists =
            state.donations.some(
              (item) =>
                item._id ===
                action.payload._id
            );

          if (!exists) {
            state.donations.unshift(
              action.payload
            );
          }
        }
      )

      .addCase(
        createDonation.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      );

    // =================================================
    // MY DONATIONS
    // =================================================

    builder
      .addCase(
        fetchMyDonations.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchMyDonations.fulfilled,
        (state, action) => {
          state.loading = false;
          state.donations =
            action.payload;
          state.error = null;
        }
      )

      .addCase(
        fetchMyDonations.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      );

    // =================================================
    // MY CLAIMS
    // =================================================

    builder
      .addCase(
        fetchMyClaims.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchMyClaims.fulfilled,
        (state, action) => {
          state.loading = false;
          state.donations =
            action.payload;
          state.error = null;
        }
      )

      .addCase(
        fetchMyClaims.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      );

    // =================================================
    // AVAILABLE DONATIONS
    // =================================================

    builder
      .addCase(
        fetchAvailableDonations.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAvailableDonations.fulfilled,
        (state, action) => {
          state.loading = false;
          state.donations =
            action.payload;
          state.error = null;
        }
      )

      .addCase(
        fetchAvailableDonations.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      );

    // =================================================
    // CLAIM
    // =================================================

    builder
      .addCase(
        claimDonation.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        claimDonation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          const updatedDonation =
            action.payload;

          const index =
            state.donations.findIndex(
              (item) =>
                item._id ===
                updatedDonation._id
            );

          if (index !== -1) {
            state.donations[index] =
              updatedDonation;
          }
        }
      )

      .addCase(
        claimDonation.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      );

    // =================================================
    // SET DELIVERY LOCATION
    // =================================================

    builder
      .addCase(
        setDeliveryLocation.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        setDeliveryLocation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          const updatedDonation =
            action.payload;

          const index =
            state.donations.findIndex(
              (item) =>
                item._id ===
                updatedDonation._id
            );

          if (index !== -1) {
            state.donations[index] =
              updatedDonation;
          }
        }
      )

      .addCase(
        setDeliveryLocation.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      );

    // =================================================
    // PICKUP
    // =================================================

    builder
      .addCase(
        pickupDonation.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        pickupDonation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          const updatedDonation =
            action.payload;

          const index =
            state.donations.findIndex(
              (item) =>
                item._id ===
                updatedDonation._id
            );

          if (index !== -1) {
            state.donations[index] =
              updatedDonation;
          }
        }
      )

      .addCase(
        pickupDonation.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      );

    // =================================================
    // DELIVER
    // =================================================

    builder
      .addCase(
        deliverDonation.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        deliverDonation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          const updatedDonation =
            action.payload;

          const index =
            state.donations.findIndex(
              (item) =>
                item._id ===
                updatedDonation._id
            );

          if (index !== -1) {
            state.donations[index] =
              updatedDonation;
          }
        }
      )

      .addCase(
        deliverDonation.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      );
  },
});

// =====================================================
// SOCKET LISTENERS
// =====================================================

export const setupDonationSocket = (
  dispatch
) => {
  // =================================================
  // DONATION CREATED
  // =================================================

  const handleDonationCreated = (
    donation
  ) => {
    console.log(
      "🆕 New donation received:",
      donation
    );

    dispatch(
      socketDonationCreated(donation)
    );
  };

  // =================================================
  // DELIVERY LOCATION UPDATED
  // =================================================

  const handleDeliveryLocationUpdated = (
    donation
  ) => {
    console.log(
      "📍 Delivery location updated:",
      donation
    );

    dispatch(
      socketDonationDeliveryLocationUpdated(
        donation
      )
    );
  };

  // =================================================
  // DONATION CLAIMED
  // =================================================

  const handleDonationClaimed = (
    donation
  ) => {
    console.log(
      "📦 Donation claimed:",
      donation
    );

    dispatch(
      socketDonationClaimed(donation)
    );
  };

  // =================================================
  // DONATION PICKED UP
  // =================================================

  const handleDonationPickedUp = (
    donation
  ) => {
    console.log(
      "🚚 Donation picked up:",
      donation
    );

    dispatch(
      socketDonationPickedUp(donation)
    );
  };

  // =================================================
  // DONATION DELIVERED
  // =================================================

  const handleDonationDelivered = (
    donation
  ) => {
    console.log(
      "✅ Donation delivered:",
      donation
    );

    dispatch(
      socketDonationDelivered(donation)
    );
  };

  // =================================================
  // REGISTER LISTENERS
  // =================================================

  socket.on(
    "donation:created",
    handleDonationCreated
  );

  socket.on(
    "donation:claimed",
    handleDonationClaimed
  );

  socket.on(
    "donation:picked_up",
    handleDonationPickedUp
  );

  socket.on(
    "donation:delivered",
    handleDonationDelivered
  );

  socket.on(
    "donation:delivery-location-updated",
    handleDeliveryLocationUpdated
  );

  // =================================================
  // CLEANUP
  // =================================================

  return () => {
    socket.off(
      "donation:created",
      handleDonationCreated
    );

    socket.off(
      "donation:claimed",
      handleDonationClaimed
    );

    socket.off(
      "donation:picked_up",
      handleDonationPickedUp
    );

    socket.off(
      "donation:delivered",
      handleDonationDelivered
    );

    socket.off(
      "donation:delivery-location-updated",
      handleDeliveryLocationUpdated
    );
  };
};

// =====================================================
// ACTIONS
// =====================================================

export const {
  socketDonationCreated,
  socketDonationClaimed,
  socketDonationDeliveryLocationUpdated,
  socketDonationPickedUp,
  socketDonationDelivered,
  clearDonationError,
  clearDonationSuccess,
  clearDonations,
} = donationSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default donationSlice.reducer;