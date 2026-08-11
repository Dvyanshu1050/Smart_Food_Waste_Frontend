import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import donationReducer from "./slices/donationSlice";
import userReducer from "./slices/userSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    donations: donationReducer,
    user: userReducer,
    admin: adminReducer,
  },
});