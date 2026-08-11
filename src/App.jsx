import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setupDonationSocket,
} from "./redux/slices/donationSlice";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// =========================
// PUBLIC
// =========================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// =========================
// DONOR
// =========================

import DonorDashboard from "./pages/donor/DonorDashboard";
import CreateDonation from "./pages/donor/CreateDonation";
import MyDonations from "./pages/donor/MyDonations";

// =========================
// NGO
// =========================

import NgoDashboard from "./pages/ngo/NgoDashboard";
import AvailableDonations from "./pages/ngo/AvailableDonations";
import MyClaims from "./pages/ngo/MyClaims";

// =========================
// ADMIN
// =========================

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import ManageDonations from "./pages/admin/ManageDonations";

function App() {
  const dispatch = useDispatch();

  // =========================
  // SOCKET.IO
  // =========================

  useEffect(() => {
    const cleanup = setupDonationSocket(dispatch);

    return cleanup;
  }, [dispatch]);

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar />

      {/* =========================
          ROUTES
      ========================= */}

      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            DONOR ROUTES
        ========================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={["donor"]}
            />
          }
        >

          <Route
            path="/donor/dashboard"
            element={<DonorDashboard />}
          />

          <Route
            path="/donor/create-donation"
            element={<CreateDonation />}
          />

          <Route
            path="/donor/my-donations"
            element={<MyDonations />}
          />

        </Route>

        {/* =========================
            NGO / VOLUNTEER ROUTES
        ========================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={["ngo", "volunteer"]}
            />
          }
        >

          <Route
            path="/ngo/dashboard"
            element={<NgoDashboard />}
          />

          <Route
            path="/ngo/available-donations"
            element={<AvailableDonations />}
          />

          <Route
            path="/ngo/my-claims"
            element={<MyClaims />}
          />

        </Route>

        {/* =========================
            ADMIN ROUTES
        ========================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            />
          }
        >

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />

          <Route
            path="/admin/donations"
            element={<ManageDonations />}
          />

        </Route>

      </Routes>
    </>
  );
}

export default App;