import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyDonations } from "../../redux/slices/donationSlice";

const DonorDashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const {
    donations,
    loading,
    error,
  } = useSelector((state) => state.donations);

  // =========================
  // FETCH MY DONATIONS
  // =========================

  useEffect(() => {
    dispatch(fetchMyDonations());
  }, [dispatch]);

  // =========================
  // STATS
  // =========================

  const totalDonations = donations.length;

  const availableDonations = donations.filter(
    (donation) => donation.status === "AVAILABLE"
  ).length;

  const claimedDonations = donations.filter(
    (donation) => donation.status === "CLAIMED"
  ).length;

  const pickedUpDonations = donations.filter(
    (donation) => donation.status === "PICKED_UP"
  ).length;

  const deliveredDonations = donations.filter(
    (donation) => donation.status === "DELIVERED"
  ).length;

  return (
    <div className="max-w-7xl mx-auto">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div>

          <p className="text-green-600 font-medium">
            Donor Dashboard
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
            Welcome, {user?.name || "Donor"} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Track your food donations and their delivery status.
          </p>

        </div>

        <Link
          to="/donor/create-donation"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-center"
        >
          + Create Donation
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

        {/* Total */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500 text-sm">
            Total Donations
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {loading ? "..." : totalDonations}
          </h2>

        </div>

        {/* Available */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500 text-sm">
            Available
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {loading ? "..." : availableDonations}
          </h2>

        </div>

        {/* In Progress */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500 text-sm">
            In Progress
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {loading
              ? "..."
              : claimedDonations + pickedUpDonations}
          </h2>

        </div>

        {/* Delivered */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-gray-500 text-sm">
            Delivered
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            {loading ? "..." : deliveredDonations}
          </h2>

        </div>

      </div>

      {/* =========================
          DELIVERY PROGRESS
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

        <div className="flex items-center justify-between mb-3">

          <div>

            <h2 className="text-xl font-bold text-gray-900">
              Donation Impact
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Your donations successfully delivered.
            </p>

          </div>

          <span className="text-xl font-bold text-purple-600">
            {totalDonations > 0
              ? Math.round(
                  (deliveredDonations /
                    totalDonations) *
                    100
                )
              : 0}
            %
          </span>

        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-500"
            style={{
              width: `${
                totalDonations > 0
                  ? Math.round(
                      (deliveredDonations /
                        totalDonations) *
                        100
                    )
                  : 0
              }%`,
            }}
          />

        </div>

      </div>

      {/* =========================
          RECENT DONATIONS
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="p-6 border-b flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-gray-900">
              Recent Donations
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Your latest food donations.
            </p>

          </div>

          <Link
            to="/donor/my-donations"
            className="text-green-600 font-semibold text-sm hover:underline"
          >
            View All →
          </Link>

        </div>

        {loading ? (

          <div className="p-10 text-center">

            <div className="text-4xl mb-4">
              ⏳
            </div>

            <p className="text-gray-500">
              Loading donations...
            </p>

          </div>

        ) : donations.length === 0 ? (

          <div className="p-10 text-center">

            <div className="text-5xl mb-4">
              🍱
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              No Donations Yet
            </h3>

            <p className="text-gray-500 mt-2">
              Start by creating your first food donation.
            </p>

            <Link
              to="/donor/create-donation"
              className="inline-block mt-5 bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Create Donation
            </Link>

          </div>

        ) : (

          <div className="divide-y">

            {donations.slice(0, 5).map((donation) => (

              <div
                key={donation._id}
                className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                {/* INFO */}

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

                {/* STATUS */}

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold w-fit ${
                    donation.status === "AVAILABLE"
                      ? "bg-green-100 text-green-700"
                      : donation.status === "CLAIMED"
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

export default DonorDashboard;