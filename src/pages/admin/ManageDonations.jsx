import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdminDonations,
} from "../../redux/slices/adminSlice";

const ManageDonations = () => {
  const dispatch = useDispatch();

  const {
    donations,
    loading,
    error,
  } = useSelector((state) => state.admin);

  // =========================
  // FETCH ALL DONATIONS
  // =========================

  useEffect(() => {
    dispatch(fetchAdminDonations());
  }, [dispatch]);

  // =========================
  // STATUS STYLES
  // =========================

  const statusStyles = {
    AVAILABLE: "bg-green-100 text-green-700",
    CLAIMED: "bg-orange-100 text-orange-700",
    PICKED_UP: "bg-blue-100 text-blue-700",
    DELIVERED: "bg-purple-100 text-purple-700",
  };

  // =========================
  // STATS
  // =========================

  const totalDonations = donations.length;

  const availableDonations = donations.filter(
    (donation) => donation.status === "AVAILABLE"
  ).length;

  const inProgressDonations = donations.filter(
    (donation) =>
      donation.status === "CLAIMED" ||
      donation.status === "PICKED_UP"
  ).length;

  const deliveredDonations = donations.filter(
    (donation) => donation.status === "DELIVERED"
  ).length;

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
          Manage Donations
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor all food donations and their current status.
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
          SUMMARY
      ========================= */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        {/* TOTAL */}

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Total
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-1">
            {loading ? "..." : totalDonations}
          </p>

        </div>

        {/* AVAILABLE */}

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Available
          </p>

          <p className="text-2xl font-bold text-green-600 mt-1">
            {loading ? "..." : availableDonations}
          </p>

        </div>

        {/* IN PROGRESS */}

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            In Progress
          </p>

          <p className="text-2xl font-bold text-orange-500 mt-1">
            {loading ? "..." : inProgressDonations}
          </p>

        </div>

        {/* DELIVERED */}

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Delivered
          </p>

          <p className="text-2xl font-bold text-purple-600 mt-1">
            {loading ? "..." : deliveredDonations}
          </p>

        </div>

      </div>

      {/* =========================
          DONATIONS TABLE
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* LOADING */}

        {loading ? (

          <div className="p-12 text-center">

            <div className="text-5xl mb-4">
              ⏳
            </div>

            <p className="text-gray-500">
              Loading donations...
            </p>

          </div>

        ) : donations.length === 0 ? (

          /* EMPTY */

          <div className="p-12 text-center">

            <div className="text-6xl mb-5">
              📦
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No Donations Found
            </h2>

            <p className="text-gray-500 mt-2">
              Donations will appear here once donors create them.
            </p>

          </div>

        ) : (

          /* TABLE */

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Food
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Donor
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Quantity
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Location
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Claimed By
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Created
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y">

                {donations.map((donation) => (

                  <tr
                    key={donation._id}
                    className="hover:bg-gray-50"
                  >

                    {/* FOOD */}

                    <td className="px-6 py-5">

                      <p className="font-semibold text-gray-900">
                        {donation.foodType}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {donation.category}
                      </p>

                    </td>

                    {/* DONOR */}

                    <td className="px-6 py-5">

                      <p className="text-gray-800">
                        {donation.donor?.name ||
                          "Unknown"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {donation.donor?.email ||
                          "N/A"}
                      </p>

                    </td>

                    {/* QUANTITY */}

                    <td className="px-6 py-5">

                      <p className="text-gray-800">
                        {donation.quantity}{" "}
                        {donation.unit}
                      </p>

                    </td>

                    {/* LOCATION */}

                    <td className="px-6 py-5">

                      <p className="text-gray-800 max-w-xs">
                        📍 {donation.pickupLocation}
                      </p>

                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusStyles[
                            donation.status
                          ] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {donation.status}
                      </span>

                    </td>

                    {/* CLAIMED BY */}

                    <td className="px-6 py-5">

                      {donation.claimedBy ? (

                        <div>

                          <p className="text-gray-800 font-medium">
                            {donation.claimedBy.name ||
                              "Unknown"}
                          </p>

                          <p className="text-sm text-gray-500">
                            {donation.claimedBy.email ||
                              "N/A"}
                          </p>

                        </div>

                      ) : (

                        <span className="text-gray-400">
                          Not claimed
                        </span>

                      )}

                    </td>

                    {/* CREATED */}

                    <td className="px-6 py-5">

                      <p className="text-sm text-gray-600">
                        {donation.createdAt
                          ? new Date(
                              donation.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default ManageDonations;