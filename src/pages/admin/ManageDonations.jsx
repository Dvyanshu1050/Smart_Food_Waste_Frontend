import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdminDonations,
} from "../../redux/slices/adminSlice";

const ManageDonations = () => {
  const dispatch = useDispatch();

  const {
    donations = [],
    loading,
    error,
  } = useSelector((state) => state.admin);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [categoryFilter, setCategoryFilter] =
    useState("all");

  // =====================================================
  // FETCH ALL DONATIONS
  // =====================================================

  useEffect(() => {
    dispatch(fetchAdminDonations());
  }, [dispatch]);

  // =====================================================
  // STATUS STYLES
  // =====================================================

  const statusStyles = {
    AVAILABLE:
      "bg-green-50 text-green-700 border-green-100",

    CLAIMED:
      "bg-orange-50 text-orange-700 border-orange-100",

    PICKED_UP:
      "bg-blue-50 text-blue-700 border-blue-100",

    DELIVERED:
      "bg-purple-50 text-purple-700 border-purple-100",
  };

  // =====================================================
  // STATUS ICON
  // =====================================================

  const statusIcons = {
    AVAILABLE: "🟢",
    CLAIMED: "🟠",
    PICKED_UP: "🚚",
    DELIVERED: "💜",
  };

  // =====================================================
  // STATS
  // =====================================================

  const totalDonations = donations.length;

  const availableDonations = donations.filter(
    (donation) =>
      donation.status === "AVAILABLE"
  ).length;

  const inProgressDonations = donations.filter(
    (donation) =>
      donation.status === "CLAIMED" ||
      donation.status === "PICKED_UP"
  ).length;

  const deliveredDonations = donations.filter(
    (donation) =>
      donation.status === "DELIVERED"
  ).length;

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = useMemo(() => {
    return [
      ...new Set(
        donations
          .map(
            (donation) =>
              donation.category
          )
          .filter(Boolean)
      ),
    ];
  }, [donations]);

  // =====================================================
  // FILTER DONATIONS
  // =====================================================

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchValue ||
        donation.foodType
          ?.toLowerCase()
          .includes(searchValue) ||
        donation.category
          ?.toLowerCase()
          .includes(searchValue) ||
        donation.pickupLocation
          ?.toLowerCase()
          .includes(searchValue) ||
        donation.donor?.name
          ?.toLowerCase()
          .includes(searchValue) ||
        donation.donor?.email
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        donation.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        donation.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    donations,
    search,
    statusFilter,
    categoryFilter,
  ]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(
      date
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // FOOD INITIAL
  // =====================================================

  const getFoodIcon = (foodType = "") => {
    const value = foodType.toLowerCase();

    if (
      value.includes("rice") ||
      value.includes("biryani")
    ) {
      return "🍚";
    }

    if (
      value.includes("bread") ||
      value.includes("roti")
    ) {
      return "🥖";
    }

    if (
      value.includes("fruit") ||
      value.includes("apple")
    ) {
      return "🍎";
    }

    if (
      value.includes("vegetable") ||
      value.includes("sabzi")
    ) {
      return "🥦";
    }

    if (
      value.includes("milk") ||
      value.includes("dairy")
    ) {
      return "🥛";
    }

    return "🍱";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7faf8]">

      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-green-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-purple-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* =================================================
            HERO HEADER
        ================================================= */}

        <div className="mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-green-950 p-6 shadow-xl sm:p-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md">

                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-green-200">
                  Donation Management
                </span>

              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Manage Donations
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                Monitor every food donation from
                availability to successful delivery.
              </p>

            </div>

            {/* Live indicator */}

            <div className="hidden rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md md:block">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20 text-lg">
                  📦
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Total Donations
                  </p>

                  <p className="text-xl font-black text-white">
                    {loading
                      ? "..."
                      : totalDonations}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">

            <span className="text-lg">
              ⚠️
            </span>

            <div>

              <p className="font-bold">
                Something went wrong
              </p>

              <p className="mt-1">
                {error}
              </p>

            </div>

          </div>
        )}


        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* TOTAL */}

          <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gray-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl">
                📦
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Total Donations
              </p>

              <h2 className="mt-1 text-3xl font-black text-gray-900">
                {loading
                  ? "..."
                  : totalDonations}
              </h2>

            </div>

          </div>


          {/* AVAILABLE */}

          <div className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                🟢
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Available
              </p>

              <h2 className="mt-1 text-3xl font-black text-green-600">
                {loading
                  ? "..."
                  : availableDonations}
              </h2>

            </div>

          </div>


          {/* IN PROGRESS */}

          <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl">
                🚚
              </div>

              <p className="mt-4 text-sm text-gray-500">
                In Progress
              </p>

              <h2 className="mt-1 text-3xl font-black text-orange-500">
                {loading
                  ? "..."
                  : inProgressDonations}
              </h2>

            </div>

          </div>


          {/* DELIVERED */}

          <div className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl">
                ❤️
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Delivered
              </p>

              <h2 className="mt-1 text-3xl font-black text-purple-600">
                {loading
                  ? "..."
                  : deliveredDonations}
              </h2>

            </div>

          </div>

        </div>


        {/* =================================================
            SEARCH + FILTER
        ================================================= */}

        <div className="mb-6 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row">

            {/* SEARCH */}

            <div className="relative flex-1">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search food, donor, email or location..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
              />

            </div>


            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            >

              <option value="all">
                All Status
              </option>

              <option value="AVAILABLE">
                Available
              </option>

              <option value="CLAIMED">
                Claimed
              </option>

              <option value="PICKED_UP">
                Picked Up
              </option>

              <option value="DELIVERED">
                Delivered
              </option>

            </select>


            {/* CATEGORY */}

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            >

              <option value="all">
                All Categories
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}

            </select>

          </div>


          {/* FILTER FOOTER */}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

            <p className="text-xs text-gray-400">

              Showing{" "}

              <span className="font-bold text-gray-700">
                {filteredDonations.length}
              </span>{" "}

              of{" "}

              <span className="font-bold text-gray-700">
                {donations.length}
              </span>{" "}

              donations

            </p>

            {(search ||
              statusFilter !== "all" ||
              categoryFilter !== "all") && (

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setCategoryFilter("all");
                }}
                className="text-xs font-bold text-green-600 hover:text-green-700 hover:underline"
              >
                Clear Filters
              </button>

            )}

          </div>

        </div>


        {/* =================================================
            DONATION CONTAINER
        ================================================= */}

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

          {/* HEADER */}

          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">

            <div>

              <h2 className="text-lg font-black text-gray-900">
                Food Donations
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Track the complete donation lifecycle
              </p>

            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">

              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

              Platform monitoring active

            </div>

          </div>


          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="space-y-4 p-6">

              {[1, 2, 3, 4, 5].map(
                (item) => (

                  <div
                    key={item}
                    className="flex animate-pulse items-center gap-4 rounded-2xl border border-gray-100 p-4"
                  >

                    <div className="h-12 w-12 rounded-xl bg-gray-100" />

                    <div className="flex-1">

                      <div className="h-4 w-40 rounded bg-gray-100" />

                      <div className="mt-2 h-3 w-64 rounded bg-gray-100" />

                    </div>

                    <div className="hidden h-8 w-24 rounded-full bg-gray-100 md:block" />

                    <div className="hidden h-8 w-24 rounded bg-gray-100 lg:block" />

                  </div>

                )
              )}

            </div>

          ) : filteredDonations.length === 0 ? (

            /* =================================================
                EMPTY
            ================================================= */

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-4xl">
                {search ||
                statusFilter !== "all" ||
                categoryFilter !== "all"
                  ? "🔍"
                  : "📦"}
              </div>

              <h2 className="mt-5 text-xl font-black text-gray-900">

                {search ||
                statusFilter !== "all" ||
                categoryFilter !== "all"
                  ? "No Matching Donations"
                  : "No Donations Found"}

              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">

                {search ||
                statusFilter !== "all" ||
                categoryFilter !== "all"
                  ? "Try changing your search or filters."
                  : "Donations will appear here once donors create them."}

              </p>

              {(search ||
                statusFilter !== "all" ||
                categoryFilter !== "all") && (

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                    setCategoryFilter("all");
                  }}
                  className="mt-5 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-700"
                >
                  Clear Filters
                </button>

              )}

            </div>

          ) : (

            <>
              {/* =================================================
                  DESKTOP TABLE
              ================================================= */}

              <div className="hidden overflow-x-auto lg:block">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-gray-100 bg-gray-50/80">

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Food
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Donor
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Quantity
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Location
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Claimed By
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Created
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {filteredDonations.map(
                      (donation) => (

                        <tr
                          key={donation._id}
                          className="group transition hover:bg-green-50/30"
                        >

                          {/* FOOD */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl">
                                {getFoodIcon(
                                  donation.foodType
                                )}
                              </div>

                              <div>

                                <p className="font-bold text-gray-900">
                                  {donation.foodType ||
                                    "Food Donation"}
                                </p>

                                <p className="mt-0.5 text-xs text-gray-400">
                                  {donation.category ||
                                    "General"}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* DONOR */}

                          <td className="px-6 py-5">

                            <div>

                              <p className="font-semibold text-gray-800">
                                {donation.donor?.name ||
                                  "Unknown"}
                              </p>

                              <p className="mt-0.5 max-w-[180px] truncate text-xs text-gray-400">
                                {donation.donor?.email ||
                                  "N/A"}
                              </p>

                            </div>

                          </td>


                          {/* QUANTITY */}

                          <td className="px-6 py-5">

                            <span className="rounded-lg bg-gray-50 px-3 py-2 text-sm font-bold text-gray-700">
                              {donation.quantity}{" "}
                              {donation.unit}
                            </span>

                          </td>


                          {/* LOCATION */}

                          <td className="px-6 py-5">

                            <p className="max-w-[210px] truncate text-sm font-medium text-gray-600">
                              📍{" "}
                              {donation.pickupLocation ||
                                "N/A"}
                            </p>

                          </td>


                          {/* STATUS */}

                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${
                                statusStyles[
                                  donation.status
                                ] ||
                                "border-gray-100 bg-gray-50 text-gray-600"
                              }`}
                            >

                              <span>
                                {statusIcons[
                                  donation.status
                                ] || "⚪"}
                              </span>

                              {donation.status ||
                                "UNKNOWN"}

                            </span>

                          </td>


                          {/* CLAIMED BY */}

                          <td className="px-6 py-5">

                            {donation.claimedBy ? (

                              <div>

                                <p className="font-semibold text-gray-800">
                                  {donation
                                    .claimedBy
                                    .name ||
                                    "Unknown"}
                                </p>

                                <p className="mt-0.5 max-w-[180px] truncate text-xs text-gray-400">
                                  {donation
                                    .claimedBy
                                    .email ||
                                    "N/A"}
                                </p>

                              </div>

                            ) : (

                              <span className="inline-flex rounded-full bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-400">
                                Not claimed
                              </span>

                            )}

                          </td>


                          {/* CREATED */}

                          <td className="px-6 py-5">

                            <p className="text-sm font-medium text-gray-600">
                              {formatDate(
                                donation.createdAt
                              )}
                            </p>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>


              {/* =================================================
                  MOBILE / TABLET CARDS
              ================================================= */}

              <div className="space-y-4 p-4 lg:hidden">

                {filteredDonations.map(
                  (donation) => (

                    <div
                      key={donation._id}
                      className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 transition hover:bg-green-50/40"
                    >

                      {/* FOOD HEADER */}

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl">
                            {getFoodIcon(
                              donation.foodType
                            )}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate font-black text-gray-900">
                              {donation.foodType ||
                                "Food Donation"}
                            </p>

                            <p className="truncate text-xs text-gray-400">
                              {donation.category ||
                                "General"}
                            </p>

                          </div>

                        </div>

                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                            statusStyles[
                              donation.status
                            ] ||
                            "border-gray-100 bg-gray-50 text-gray-600"
                          }`}
                        >
                          {statusIcons[
                            donation.status
                          ] || "⚪"}{" "}
                          {donation.status}
                        </span>

                      </div>


                      {/* DETAILS */}

                      <div className="mt-4 grid grid-cols-2 gap-3">

                        <div className="rounded-xl bg-white p-3">

                          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                            Donor
                          </p>

                          <p className="mt-1 truncate text-sm font-bold text-gray-800">
                            {donation.donor?.name ||
                              "Unknown"}
                          </p>

                        </div>


                        <div className="rounded-xl bg-white p-3">

                          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                            Quantity
                          </p>

                          <p className="mt-1 text-sm font-bold text-gray-800">
                            {donation.quantity}{" "}
                            {donation.unit}
                          </p>

                        </div>


                        <div className="rounded-xl bg-white p-3">

                          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                            Claimed By
                          </p>

                          <p className="mt-1 truncate text-sm font-bold text-gray-800">
                            {donation.claimedBy?.name ||
                              "Not claimed"}
                          </p>

                        </div>


                        <div className="rounded-xl bg-white p-3">

                          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                            Created
                          </p>

                          <p className="mt-1 text-sm font-bold text-gray-800">
                            {formatDate(
                              donation.createdAt
                            )}
                          </p>

                        </div>

                      </div>


                      {/* LOCATION */}

                      <div className="mt-3 rounded-xl bg-white p-3">

                        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                          Pickup Location
                        </p>

                        <p className="mt-1 text-sm font-medium leading-5 text-gray-700">
                          📍{" "}
                          {donation.pickupLocation ||
                            "Location not available"}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </>
          )}

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="py-6 text-center">

          <p className="text-xs text-gray-400">
            SmartDonate Admin • Every donation
            creates an impact 🌱
          </p>

        </div>

      </div>

    </div>
  );
};

export default ManageDonations;