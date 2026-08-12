import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";

import {
  fetchAdminUsers,
  toggleUserBlock,
  approveUserVerification,
  rejectUserVerification,
  addUser,
  updateUser,
  removeUser,
} from "../../redux/slices/adminSlice";

const AdminUsers = () => {
  const dispatch = useDispatch();

  const {
    users = [],
    loading,
    error,
  } = useSelector((state) => state.admin);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // =====================================================
  // FETCH USERS + SOCKET LISTENERS
  // =====================================================

  useEffect(() => {
    dispatch(fetchAdminUsers());

    const handleUserRegistered = (user) => {
      console.log("🟢 New user registered:", user);
      dispatch(addUser(user));
    };

    const handleVerificationUpdated = (updatedUser) => {
      console.log(
        "🔄 Verification updated:",
        updatedUser
      );

      dispatch(updateUser(updatedUser));
    };

    const handleBlockStatusChanged = (updatedUser) => {
      console.log(
        "🔄 Block status changed:",
        updatedUser
      );

      dispatch(updateUser(updatedUser));
    };

    const handleUserDeleted = (data) => {
      console.log("🗑️ User deleted:", data);
      dispatch(removeUser(data._id));
    };

    socket.on(
      "user:registered",
      handleUserRegistered
    );

    socket.on(
      "user:verification_updated",
      handleVerificationUpdated
    );

    socket.on(
      "user:block_status_changed",
      handleBlockStatusChanged
    );

    socket.on(
      "user:deleted",
      handleUserDeleted
    );

    return () => {
      socket.off(
        "user:registered",
        handleUserRegistered
      );

      socket.off(
        "user:verification_updated",
        handleVerificationUpdated
      );

      socket.off(
        "user:block_status_changed",
        handleBlockStatusChanged
      );

      socket.off(
        "user:deleted",
        handleUserDeleted
      );
    };
  }, [dispatch]);

  // =====================================================
  // ACTIONS
  // =====================================================

  const handleToggleBlock = async (userId) => {
    await dispatch(
      toggleUserBlock(userId)
    );
  };

  const handleApprove = async (userId) => {
    await dispatch(
      approveUserVerification(userId)
    );
  };

  const handleReject = async (userId) => {
    await dispatch(
      rejectUserVerification(userId)
    );
  };

  // =====================================================
  // FILTERED USERS
  // =====================================================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchValue ||
        user.name
          ?.toLowerCase()
          .includes(searchValue) ||
        user.email
          ?.toLowerCase()
          .includes(searchValue);

      const matchesRole =
        roleFilter === "all" ||
        user.role === roleFilter;

      let matchesStatus = true;

      if (statusFilter === "active") {
        matchesStatus = !user.isBlocked;
      }

      if (statusFilter === "blocked") {
        matchesStatus = user.isBlocked;
      }

      if (statusFilter === "pending") {
        matchesStatus =
          user.verificationStatus === "PENDING";
      }

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
  ]);

  // =====================================================
  // USER COUNTS
  // =====================================================

  const totalUsers = users.length;

  const totalDonors = users.filter(
    (user) => user.role === "donor"
  ).length;

  const totalNGOs = users.filter(
    (user) => user.role === "ngo"
  ).length;

  const totalVolunteers = users.filter(
    (user) => user.role === "volunteer"
  ).length;

  const pendingUsers = users.filter(
    (user) =>
      user.verificationStatus === "PENDING"
  ).length;

  const blockedUsers = users.filter(
    (user) => user.isBlocked
  ).length;

  // =====================================================
  // ROLE STYLES
  // =====================================================

  const roleStyles = {
    admin:
      "bg-red-50 text-red-700 border-red-100",
    donor:
      "bg-green-50 text-green-700 border-green-100",
    ngo:
      "bg-blue-50 text-blue-700 border-blue-100",
    volunteer:
      "bg-orange-50 text-orange-700 border-orange-100",
  };

  // =====================================================
  // VERIFICATION BADGE
  // =====================================================

  const getVerificationBadge = (user) => {
    if (
      user.role === "admin" ||
      user.role === "donor"
    ) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
          <span>✓</span>
          Verified
        </span>
      );
    }

    if (
      user.verificationStatus === "VERIFIED"
    ) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
          <span>✓</span>
          Verified
        </span>
      );
    }

    if (
      user.verificationStatus === "REJECTED"
    ) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
          <span>×</span>
          Rejected
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-100 bg-yellow-50 px-3 py-1.5 text-xs font-bold text-yellow-700">
        <span>⏳</span>
        Pending
      </span>
    );
  };

  // =====================================================
  // AVATAR
  // =====================================================

  const getInitials = (name = "") => {
    const words = name
      .trim()
      .split(" ")
      .filter(Boolean);

    if (!words.length) {
      return "U";
    }

    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    return (
      words[0][0] +
      words[words.length - 1][0]
    ).toUpperCase();
  };

  // =====================================================
  // AVATAR COLORS
  // =====================================================

  const avatarStyles = {
    admin:
      "bg-red-100 text-red-700",
    donor:
      "bg-green-100 text-green-700",
    ngo:
      "bg-blue-100 text-blue-700",
    volunteer:
      "bg-orange-100 text-orange-700",
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7faf8]">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-green-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-green-950 p-6 shadow-xl sm:p-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md">

                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-green-200">
                  User Management
                </span>

              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Manage Users
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                Manage donors, NGOs and volunteers,
                verify accounts and control platform access.
              </p>

            </div>

            {/* Live status */}

            <div className="hidden rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md md:block">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20 text-lg">
                  🟢
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    System Status
                  </p>

                  <p className="text-sm font-bold text-white">
                    Live & Connected
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
            SUMMARY CARDS
        ================================================= */}

        <div className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* Total */}

          <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gray-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl">
                👥
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Total Users
              </p>

              <h2 className="mt-1 text-3xl font-black text-gray-900">
                {loading ? "..." : totalUsers}
              </h2>

            </div>

          </div>


          {/* Donors */}

          <div className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                🍲
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Donors
              </p>

              <h2 className="mt-1 text-3xl font-black text-green-600">
                {loading ? "..." : totalDonors}
              </h2>

            </div>

          </div>


          {/* NGOs */}

          <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                🏢
              </div>

              <p className="mt-4 text-sm text-gray-500">
                NGOs
              </p>

              <h2 className="mt-1 text-3xl font-black text-blue-600">
                {loading ? "..." : totalNGOs}
              </h2>

            </div>

          </div>


          {/* Volunteers */}

          <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl">
                🚚
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Volunteers
              </p>

              <h2 className="mt-1 text-3xl font-black text-orange-500">
                {loading ? "..." : totalVolunteers}
              </h2>

            </div>

          </div>

        </div>


        {/* =================================================
            FILTER / SEARCH BAR
        ================================================= */}

        <div className="mb-6 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* Search */}

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
                placeholder="Search by name or email..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
              />

            </div>


            {/* Role */}

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-700 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            >

              <option value="all">
                All Roles
              </option>

              <option value="donor">
                Donors
              </option>

              <option value="ngo">
                NGOs
              </option>

              <option value="volunteer">
                Volunteers
              </option>

              <option value="admin">
                Admins
              </option>

            </select>


            {/* Status */}

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

              <option value="active">
                Active
              </option>

              <option value="blocked">
                Blocked
              </option>

              <option value="pending">
                Pending Verification
              </option>

            </select>

          </div>


          {/* Filter information */}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

            <p className="text-xs text-gray-400">

              Showing{" "}
              <span className="font-bold text-gray-700">
                {filteredUsers.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-700">
                {users.length}
              </span>{" "}
              users

            </p>

            {(search ||
              roleFilter !== "all" ||
              statusFilter !== "all") && (

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                }}
                className="text-xs font-bold text-green-600 hover:text-green-700 hover:underline"
              >
                Clear Filters
              </button>

            )}

          </div>

        </div>


        {/* =================================================
            EXTRA STATUS SUMMARY
        ================================================= */}

        <div className="mb-6 flex flex-wrap gap-3">

          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-100 bg-yellow-50 px-4 py-2 text-xs font-bold text-yellow-700">

            <span>⏳</span>

            {pendingUsers} Pending Verification

          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-bold text-red-700">

            <span>🚫</span>

            {blockedUsers} Blocked Users

          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-bold text-green-700">

            <span>✓</span>

            {totalUsers - blockedUsers} Active Users

          </div>

        </div>


        {/* =================================================
            USERS
        ================================================= */}

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

          {/* Header */}

          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">

            <div>

              <h2 className="text-lg font-black text-gray-900">
                Registered Users
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Real-time user management
              </p>

            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">

              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

              Live updates enabled

            </div>

          </div>


          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="p-6">

              <div className="space-y-4">

                {[1, 2, 3, 4, 5].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex animate-pulse items-center gap-4 rounded-2xl border border-gray-100 p-4"
                    >

                      <div className="h-12 w-12 rounded-xl bg-gray-100" />

                      <div className="flex-1">

                        <div className="h-4 w-40 rounded bg-gray-100" />

                        <div className="mt-2 h-3 w-56 rounded bg-gray-100" />

                      </div>

                      <div className="hidden h-8 w-20 rounded-full bg-gray-100 sm:block" />

                      <div className="hidden h-8 w-28 rounded bg-gray-100 md:block" />

                    </div>
                  )
                )}

              </div>

            </div>

          ) : filteredUsers.length === 0 ? (

            /* =================================================
                EMPTY
            ================================================= */

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-4xl">
                {search ||
                roleFilter !== "all" ||
                statusFilter !== "all"
                  ? "🔍"
                  : "👥"}
              </div>

              <h2 className="mt-5 text-xl font-black text-gray-900">

                {search ||
                roleFilter !== "all" ||
                statusFilter !== "all"
                  ? "No Matching Users"
                  : "No Users Found"}

              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">

                {search ||
                roleFilter !== "all" ||
                statusFilter !== "all"
                  ? "Try changing your search or filters to find the user you're looking for."
                  : "No users have registered on the platform yet."}

              </p>

              {(search ||
                roleFilter !== "all" ||
                statusFilter !== "all") && (

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("all");
                    setStatusFilter("all");
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
                        User
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Role
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Verification
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Joined
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  <tbody className="divide-y divide-gray-100">

                    {filteredUsers.map(
                      (user) => (

                        <tr
                          key={user._id}
                          className="group transition hover:bg-green-50/30"
                        >

                          {/* USER */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                                  avatarStyles[
                                    user.role
                                  ] ||
                                  "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {getInitials(
                                  user.name
                                )}
                              </div>

                              <div className="min-w-0">

                                <p className="truncate font-bold text-gray-900">
                                  {user.name}
                                </p>

                                <p className="mt-0.5 max-w-[220px] truncate text-xs text-gray-400">
                                  {user.email}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* ROLE */}

                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${
                                roleStyles[
                                  user.role
                                ] ||
                                "bg-gray-50 text-gray-600 border-gray-100"
                              }`}
                            >
                              {user.role}
                            </span>

                          </td>


                          {/* VERIFICATION */}

                          <td className="px-6 py-5">
                            {getVerificationBadge(
                              user
                            )}
                          </td>


                          {/* STATUS */}

                          <td className="px-6 py-5">

                            {user.isBlocked ? (

                              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                                <span>●</span>
                                Blocked
                              </span>

                            ) : (

                              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                                <span>●</span>
                                Active
                              </span>

                            )}

                          </td>


                          {/* JOINED */}

                          <td className="px-6 py-5">

                            <p className="text-sm font-medium text-gray-600">

                              {user.createdAt
                                ? new Date(
                                    user.createdAt
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "N/A"}

                            </p>

                          </td>


                          {/* ACTION */}

                          <td className="px-6 py-5">

                            {user.role ===
                            "admin" ? (

                              <span className="inline-flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-400">
                                🛡️ Protected
                              </span>

                            ) : (

                              <div className="flex flex-wrap gap-2">

                                {/* APPROVE */}

                                {(user.role ===
                                  "ngo" ||
                                  user.role ===
                                    "volunteer") &&
                                  user.verificationStatus ===
                                    "PENDING" && (

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleApprove(
                                          user._id
                                        )
                                      }
                                      disabled={
                                        loading
                                      }
                                      className="rounded-xl bg-green-50 px-3 py-2 text-xs font-bold text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      ✓ Approve
                                    </button>
                                  )}


                                {/* REJECT */}

                                {(user.role ===
                                  "ngo" ||
                                  user.role ===
                                    "volunteer") &&
                                  user.verificationStatus ===
                                    "PENDING" && (

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleReject(
                                          user._id
                                        )
                                      }
                                      disabled={
                                        loading
                                      }
                                      className="rounded-xl bg-yellow-50 px-3 py-2 text-xs font-bold text-yellow-700 transition hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      × Reject
                                    </button>
                                  )}


                                {/* BLOCK */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleToggleBlock(
                                      user._id
                                    )
                                  }
                                  disabled={
                                    loading
                                  }
                                  className={`rounded-xl px-3 py-2 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                    user.isBlocked
                                      ? "bg-green-50 text-green-700 hover:bg-green-100"
                                      : "bg-red-50 text-red-700 hover:bg-red-100"
                                  }`}
                                >
                                  {user.isBlocked
                                    ? "✓ Unblock"
                                    : "🚫 Block"}
                                </button>

                              </div>

                            )}

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>


              {/* =================================================
                  MOBILE CARDS
              ================================================= */}

              <div className="space-y-3 p-4 lg:hidden">

                {filteredUsers.map(
                  (user) => (

                    <div
                      key={user._id}
                      className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 transition hover:bg-green-50/40"
                    >

                      {/* User */}

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-3">

                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                              avatarStyles[
                                user.role
                              ] ||
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {getInitials(
                              user.name
                            )}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate font-bold text-gray-900">
                              {user.name}
                            </p>

                            <p className="truncate text-xs text-gray-400">
                              {user.email}
                            </p>

                          </div>

                        </div>

                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold capitalize ${
                            roleStyles[
                              user.role
                            ] ||
                            "bg-gray-50 text-gray-600 border-gray-100"
                          }`}
                        >
                          {user.role}
                        </span>

                      </div>


                      {/* Details */}

                      <div className="mt-4 flex flex-wrap gap-2">

                        {getVerificationBadge(
                          user
                        )}

                        {user.isBlocked ? (

                          <span className="inline-flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                            🚫 Blocked
                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-1 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                            ● Active
                          </span>

                        )}

                      </div>


                      {/* Joined */}

                      <p className="mt-3 text-xs text-gray-400">

                        Joined{" "}

                        <span className="font-semibold text-gray-600">

                          {user.createdAt
                            ? new Date(
                                user.createdAt
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "N/A"}

                        </span>

                      </p>


                      {/* Actions */}

                      {user.role !==
                        "admin" && (

                        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">

                          {(user.role ===
                            "ngo" ||
                            user.role ===
                              "volunteer") &&
                            user.verificationStatus ===
                              "PENDING" && (

                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleApprove(
                                      user._id
                                    )
                                  }
                                  disabled={
                                    loading
                                  }
                                  className="rounded-xl bg-green-100 py-2.5 text-xs font-bold text-green-700 disabled:opacity-50"
                                >
                                  ✓ Approve
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleReject(
                                      user._id
                                    )
                                  }
                                  disabled={
                                    loading
                                  }
                                  className="rounded-xl bg-yellow-100 py-2.5 text-xs font-bold text-yellow-700 disabled:opacity-50"
                                >
                                  × Reject
                                </button>
                              </>
                            )}

                          <button
                            type="button"
                            onClick={() =>
                              handleToggleBlock(
                                user._id
                              )
                            }
                            disabled={loading}
                            className={`rounded-xl py-2.5 text-xs font-bold disabled:opacity-50 ${
                              user.isBlocked
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.isBlocked
                              ? "✓ Unblock User"
                              : "🚫 Block User"}
                          </button>

                        </div>

                      )}

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
            SmartDonate Admin • Manage responsibly •
            Every user can create an impact 🌱
          </p>

        </div>

      </div>

    </div>
  );
};

export default AdminUsers;