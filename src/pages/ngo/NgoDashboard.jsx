import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyClaims } from "../../redux/slices/donationSlice";

const NGODashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const {
    donations,
    loading,
    error,
  } = useSelector((state) => state.donations);

  // =========================
  // FETCH MY CLAIMS
  // =========================

  useEffect(() => {
    dispatch(fetchMyClaims());
  }, [dispatch]);

  // =========================
  // STATS
  // =========================

  const claimed = donations.filter(
    (donation) => donation.status === "CLAIMED"
  ).length;

  const pickedUp = donations.filter(
    (donation) => donation.status === "PICKED_UP"
  ).length;

  const delivered = donations.filter(
    (donation) => donation.status === "DELIVERED"
  ).length;

  const totalClaims = donations.length;

  return (
    <div className="max-w-7xl mx-auto">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <p className="text-green-600 font-medium">
            NGO Dashboard
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
            Welcome, {user?.name || "NGO"} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage food claims and track your deliveries.
          </p>

        </div>

        <Link
          to="/ngo/available-donations"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-center"
        >
          Find Donations
        </Link>

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
          STATS
      ========================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* Total Claims */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500 text-sm">
            Total Claims
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {loading ? "..." : totalClaims}
          </h2>

        </div>

        {/* Claimed */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500 text-sm">
            Claimed
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {loading ? "..." : claimed}
          </h2>

        </div>

        {/* Picked Up */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500 text-sm">
            Picked Up
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {loading ? "..." : pickedUp}
          </h2>

        </div>

        {/* Delivered */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500 text-sm">
            Delivered
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            {loading ? "..." : delivered}
          </h2>

        </div>

      </div>

      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* Available */}

        <Link
          to="/ngo/available-donations"
          className="bg-green-600 text-white p-7 rounded-2xl hover:bg-green-700 transition"
        >

          <div className="text-3xl mb-4">
            🍱
          </div>

          <h2 className="text-xl font-bold">
            Available Donations
          </h2>

          <p className="text-green-100 mt-2">
            Find surplus food donated by people and
            organizations.
          </p>

        </Link>

        {/* My Claims */}

        <Link
          to="/ngo/my-claims"
          className="bg-white border border-gray-200 p-7 rounded-2xl hover:shadow-md transition"
        >

          <div className="text-3xl mb-4">
            📦
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            My Claims
          </h2>

          <p className="text-gray-500 mt-2">
            Track your claimed, picked up and delivered
            donations.
          </p>

        </Link>

      </div>

      {/* =========================
          RECENT CLAIMS
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="p-6 border-b">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold text-gray-900">
              Recent Claims
            </h2>

            <Link
              to="/ngo/my-claims"
              className="text-green-600 font-medium text-sm"
            >
              View All →
            </Link>

          </div>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="p-10 text-center">

            <div className="text-4xl mb-4">
              ⏳
            </div>

            <p className="text-gray-500">
              Loading claims...
            </p>

          </div>

        ) : donations.length === 0 ? (

          /* Empty State */

          <div className="p-10 text-center">

            <div className="text-5xl mb-4">
              📦
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No claims yet
            </h3>

            <p className="text-gray-500 mt-2">
              Find an available donation and claim it.
            </p>

            <Link
              to="/ngo/available-donations"
              className="inline-block mt-5 bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Find Donations
            </Link>

          </div>

        ) : (

          /* Recent Claims */

          <div className="divide-y">

            {donations.slice(0, 5).map((donation) => (

              <div
                key={donation._id}
                className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                <div>

                  <h3 className="font-semibold text-gray-900">
                    {donation.foodType}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {donation.quantity} {donation.unit}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    📍 {donation.pickupLocation}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
                    donation.status === "CLAIMED"
                      ? "bg-orange-100 text-orange-700"
                      : donation.status === "PICKED_UP"
                      ? "bg-blue-100 text-blue-700"
                      : donation.status === "DELIVERED"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {donation.status}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default NGODashboard;