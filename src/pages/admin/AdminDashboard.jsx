import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchAdminStats } from "../../redux/slices/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const {
    stats,
    loading,
    error,
  } = useSelector((state) => state.admin);

  // =========================
  // FETCH ADMIN STATS
  // =========================

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto">

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-8">

        <p className="text-red-600 font-medium">
          Administration
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor users, donations and platform activity.
        </p>

      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* =========================
          DONATION STATS
      ========================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* TOTAL DONATIONS */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-sm text-gray-500">
            Total Donations
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {loading ? "..." : stats.totalDonations}
          </h2>

        </div>

        {/* AVAILABLE */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-sm text-gray-500">
            Available
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {loading ? "..." : stats.availableDonations}
          </h2>

        </div>

        {/* CLAIMED */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-sm text-gray-500">
            Claimed
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {loading ? "..." : stats.claimedDonations}
          </h2>

        </div>

        {/* DELIVERED */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-sm text-gray-500">
            Delivered
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            {loading ? "..." : stats.deliveredDonations}
          </h2>

        </div>

      </div>

      {/* =========================
          PROGRESS
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

        <div className="flex items-center justify-between mb-4">

          <div>

            <h2 className="text-xl font-bold text-gray-900">
              Delivery Success
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Percentage of donations successfully delivered.
            </p>

          </div>

          <span className="text-2xl font-bold text-purple-600">
            {loading
              ? "..."
              : `${stats.deliveryPercentage}%`}
          </span>

        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500"
            style={{
              width: `${stats.deliveryPercentage || 0}%`,
            }}
          />

        </div>

      </div>

      {/* =========================
          USER STATS
      ========================= */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-sm text-gray-500">
            Total Users
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {loading ? "..." : stats.totalUsers}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-sm text-gray-500">
            Donors
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {loading ? "..." : stats.totalDonors}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-sm text-gray-500">
            NGOs
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {loading ? "..." : stats.totalNGOs}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-sm text-gray-500">
            Volunteers
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {loading ? "..." : stats.totalVolunteers}
          </h2>

        </div>

      </div>

      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link
          to="/admin/users"
          className="bg-white rounded-2xl shadow-sm p-6 border border-transparent hover:border-red-200 transition"
        >

          <div className="text-4xl mb-4">
            👥
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Manage Users
          </h2>

          <p className="text-gray-500 mt-2">
            View and manage registered donors, NGOs and volunteers.
          </p>

          <span className="inline-block mt-4 text-red-600 font-semibold">
            View Users →
          </span>

        </Link>

        <Link
          to="/admin/donations"
          className="bg-white rounded-2xl shadow-sm p-6 border border-transparent hover:border-green-200 transition"
        >

          <div className="text-4xl mb-4">
            🍱
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Manage Donations
          </h2>

          <p className="text-gray-500 mt-2">
            Monitor all donations and their current delivery status.
          </p>

          <span className="inline-block mt-4 text-green-600 font-semibold">
            View Donations →
          </span>

        </Link>

      </div>

    </div>
  );
};

export default AdminDashboard;