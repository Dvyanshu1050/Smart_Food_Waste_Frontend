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
// TOKEN
// =====================================================

const getToken = () => {
  return localStorage.getItem("token");
};

// =====================================================
// AUTH CONFIG
// =====================================================

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

// =====================================================
// CREATE DONATION
// =====================================================

export const createDonation = createAsyncThunk(
  "donations/createDonation",
  async (donationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/donations`,
        donationData,
        getAuthConfig()
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
// GET AVAILABLE DONATIONS
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
// GET MY CLAIMS
// =====================================================

export const fetchMyClaims = createAsyncThunk(
  "donations/fetchMyClaims",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/donations/my-claims`,
        getAuthConfig()
      );

      return response.data.claims || response.data.donations || [];
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
// CLAIM DONATION
// =====================================================

export const claimDonation = createAsyncThunk(
  "donations/claimDonation",
  async (
    {
      donationId,
      claimedQuantity,
      unit,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/donations/${donationId}/claim`,
        {
          claimedQuantity,
          unit,
        },
        getAuthConfig()
      );

      return response.data;
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
// SET DELIVERY LOCATION
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
// PICKUP DONATION
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

      return response.data;
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
// DELIVER DONATION
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

      return response.data;
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
  claims: [],
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
        (item) => item._id === updatedDonation._id
      );

      if (index !== -1) {
        state.donations[index] = updatedDonation;
      }
    },

    // =================================================
    // SOCKET: DELIVERY LOCATION
    // =================================================

    socketDonationDeliveryLocationUpdated: (
      state,
      action
    ) => {
      const updatedDonation = action.payload;

      const index = state.donations.findIndex(
        (item) => item._id === updatedDonation._id
      );

      if (index !== -1) {
        state.donations[index] = updatedDonation;
      }
    },

    // =================================================
    // SOCKET: PICKED UP
    // =================================================

    socketDonationPickedUp: (
      state,
      action
    ) => {
      const updatedDonation = action.payload;

      const index = state.donations.findIndex(
        (item) => item._id === updatedDonation._id
      );

      if (index !== -1) {
        state.donations[index] = updatedDonation;
      }
    },

    // =================================================
    // SOCKET: DELIVERED
    // =================================================

    socketDonationDelivered: (
      state,
      action
    ) => {
      const updatedDonation = action.payload;

      const index = state.donations.findIndex(
        (item) => item._id === updatedDonation._id
      );

      if (index !== -1) {
        state.donations[index] = updatedDonation;
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

    // =================================================
    // CLEAR CLAIMS
    // =================================================

    clearClaims: (state) => {
      state.claims = [];
    },
  },

  // =====================================================
  // EXTRA REDUCERS
  // =====================================================

  extraReducers: (builder) => {
    // =================================================
    // CREATE DONATION
    // =================================================

    builder
      .addCase(createDonation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        if (action.payload) {
          const exists = state.donations.some(
            (item) => item._id === action.payload._id
          );

          if (!exists) {
            state.donations.unshift(action.payload);
          }
        }
      })

      .addCase(createDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // =================================================
    // MY DONATIONS
    // =================================================

    builder
      .addCase(fetchMyDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload || [];
        state.error = null;
      })

      .addCase(fetchMyDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =================================================
    // AVAILABLE DONATIONS
    // =================================================

    builder
      .addCase(fetchAvailableDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchAvailableDonations.fulfilled,
        (state, action) => {
          state.loading = false;
          state.donations = action.payload || [];
          state.error = null;
        }
      )

      .addCase(
        fetchAvailableDonations.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // =================================================
    // MY CLAIMS
    // =================================================

    builder
      .addCase(fetchMyClaims.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyClaims.fulfilled, (state, action) => {
        state.loading = false;
        state.claims = action.payload || [];
        state.error = null;
      })

      .addCase(fetchMyClaims.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // =================================================
    // CLAIM
    // =================================================

    builder
      .addCase(claimDonation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(claimDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;

        const payload = action.payload;

        const updatedDonation =
          payload?.donation;

        const claim =
          payload?.claim;

        // Update donation if backend returned it
        if (updatedDonation?._id) {
          const index = state.donations.findIndex(
            (item) =>
              item._id === updatedDonation._id
          );

          if (index !== -1) {
            state.donations[index] =
              updatedDonation;
          }
        }

        // Add claim if backend returned it
        if (claim?._id) {
          const exists = state.claims.some(
            (item) => item._id === claim._id
          );

          if (!exists) {
            state.claims.unshift(claim);
          }
        }
      })

      .addCase(claimDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // =================================================
    // DELIVERY LOCATION
    // =================================================

    builder
      .addCase(setDeliveryLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        setDeliveryLocation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          const updatedDonation = action.payload;

          if (!updatedDonation?._id) return;

          const index = state.donations.findIndex(
            (item) =>
              item._id === updatedDonation._id
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
          state.error = action.payload;
        }
      );

    // =================================================
    // PICKUP
    // =================================================

    builder
      .addCase(pickupDonation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        pickupDonation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          const payload = action.payload;

          const updatedDonation =
            payload?.donation || payload;

          if (!updatedDonation?._id) return;

          const index = state.donations.findIndex(
            (item) =>
              item._id === updatedDonation._id
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
          state.error = action.payload;
        }
      );

    // =================================================
    // DELIVER
    // =================================================

    builder
      .addCase(deliverDonation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        deliverDonation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          const payload = action.payload;

          const updatedDonation =
            payload?.donation || payload;

          if (!updatedDonation?._id) return;

          const index = state.donations.findIndex(
            (item) =>
              item._id === updatedDonation._id
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
          state.error = action.payload;
        }
      );
  },
});

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
  clearClaims,
} = donationSlice.actions;

// =====================================================
// SOCKET LISTENERS
// =====================================================

export const setupDonationSocket = (dispatch) => {
  const handleDonationCreated = (donation) => {
    console.log(
      "🆕 New donation received:",
      donation
    );

    dispatch(
      socketDonationCreated(donation)
    );
  };

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

  const handleDonationClaimed = (donation) => {
    console.log(
      "📦 Donation claimed:",
      donation
    );

    dispatch(
      socketDonationClaimed(donation)
    );
  };

  const handleDonationPickedUp = (donation) => {
    console.log(
      "🚚 Donation picked up:",
      donation
    );

    dispatch(
      socketDonationPickedUp(donation)
    );
  };

  const handleDonationDelivered = (donation) => {
    console.log(
      "✅ Donation delivered:",
      donation
    );

    dispatch(
      socketDonationDelivered(donation)
    );
  };

  // Register listeners

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

  // Cleanup

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
// REDUCER
// =====================================================

export default donationSlice.reducer;