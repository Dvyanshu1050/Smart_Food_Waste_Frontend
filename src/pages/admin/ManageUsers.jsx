import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteUser,
  toggleUserStatus,
} from "../../redux/slices/userSlice";

const ManageUsers = () => {
  const dispatch = useDispatch();

  const { users = [], loading, error } =
    useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] =
    useState("all");
  const [statusFilter, setStatusFilter] =
    useState("all");

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const handleToggleStatus = (id) => {
    dispatch(toggleUserStatus(id));
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name || "this user"}?`
    );

    if (confirmed) {
      dispatch(deleteUser(id));
    }
  };

  // =====================================================
  // FILTER USERS
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
  // STATS
  // =====================================================

  const totalUsers = users.length;

  const donorCount = users.filter(
    (user) => user.role === "donor"
  ).length;

  const ngoCount = users.filter(
    (user) => user.role === "ngo"
  ).length;

  const volunteerCount = users.filter(
    (user) => user.role === "volunteer"
  ).length;

  const blockedCount = users.filter(
    (user) => user.isBlocked
  ).length;

  const activeCount =
    totalUsers - blockedCount;

  // =====================================================
  // INITIALS
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
  // ROLE STYLE
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

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7faf8]">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-green-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-200/20 blur-3xl" />

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
                  User Administration
                </span>

              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Manage Users
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                Manage donors, NGOs and volunteers,
                control account access and monitor
                platform members.
              </p>

            </div>

            {/* Live Status */}

            <div className="hidden rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md md:block">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20 text-lg">
                  👥
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Platform Users
                  </p>

                  <p className="text-xl font-black text-white">
                    {totalUsers}
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
                👥
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Total Users
              </p>

              <h2 className="mt-1 text-3xl font-black text-gray-900">
                {totalUsers}
              </h2>

            </div>

          </div>


          {/* ACTIVE */}

          <div className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                ✓
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Active Users
              </p>

              <h2 className="mt-1 text-3xl font-black text-green-600">
                {activeCount}
              </h2>

            </div>

          </div>


          {/* NGO */}

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
                {ngoCount}
              </h2>

            </div>

          </div>


          {/* BLOCKED */}

          <div className="group relative overflow-hidden rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-xl">
                🚫
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Blocked
              </p>

              <h2 className="mt-1 text-3xl font-black text-red-600">
                {blockedCount}
              </h2>

            </div>

          </div>

        </div>


        {/* =================================================
            ROLE MINI STATS
        ================================================= */}

        <div className="mb-6 flex flex-wrap gap-3">

          <div className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-bold text-green-700">
            🍲 {donorCount} Donors
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
            🏢 {ngoCount} NGOs
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-bold text-orange-700">
            🚚 {volunteerCount} Volunteers
          </div>

        </div>


        {/* =================================================
            SEARCH + FILTERS
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
                placeholder="Search by name or email..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
              />

            </div>


            {/* ROLE */}

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


            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
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

            </select>

          </div>


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
                className="text-xs font-bold text-green-600 hover:underline"
              >
                Clear Filters
              </button>

            )}

          </div>

        </div>


        {/* =================================================
            USERS CONTAINER
        ================================================= */}

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

          {/* HEADER */}

          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">

            <div>

              <h2 className="text-lg font-black text-gray-900">
                Platform Users
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Manage account access and activity
              </p>

            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">

              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

              User management active

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

                      <div className="mt-2 h-3 w-60 rounded bg-gray-100" />

                    </div>

                    <div className="hidden h-8 w-20 rounded-full bg-gray-100 sm:block" />

                    <div className="hidden h-8 w-28 rounded bg-gray-100 md:block" />

                  </div>

                )
              )}

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
                  ? "Try changing your search or filters."
                  : "Registered users will appear here."}

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

                                <p className="mt-0.5 max-w-[230px] truncate text-xs text-gray-400">
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
                                "border-gray-100 bg-gray-50 text-gray-600"
                              }`}
                            >
                              {user.role}
                            </span>

                          </td>


                          {/* STATUS */}

                          <td className="px-6 py-5">

                            {user.isBlocked ? (

                              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                                <span>
                                  ●
                                </span>
                                Blocked
                              </span>

                            ) : (

                              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                                <span>
                                  ●
                                </span>
                                Active
                              </span>

                            )}

                          </td>


                          {/* JOINED */}

                          <td className="px-6 py-5">

                            <p className="text-sm font-medium text-gray-600">
                              {formatDate(
                                user.createdAt
                              )}
                            </p>

                          </td>


                          {/* ACTIONS */}

                          <td className="px-6 py-5">

                            <div className="flex gap-2">

                              {/* BLOCK */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleToggleStatus(
                                    user._id
                                  )
                                }
                                disabled={loading}
                                className={`rounded-xl px-3 py-2 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                  user.isBlocked
                                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                                    : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                                }`}
                              >
                                {user.isBlocked
                                  ? "✓ Unblock"
                                  : "🚫 Block"}
                              </button>


                              {/* DELETE */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    user._id,
                                    user.name
                                  )
                                }
                                disabled={loading}
                                className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                🗑 Delete
                              </button>

                            </div>

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

              <div className="space-y-4 p-4 lg:hidden">

                {filteredUsers.map(
                  (user) => (

                    <div
                      key={user._id}
                      className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 transition hover:bg-green-50/40"
                    >

                      {/* USER */}

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

                            <p className="truncate font-black text-gray-900">
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
                            "border-gray-100 bg-gray-50 text-gray-600"
                          }`}
                        >
                          {user.role}
                        </span>

                      </div>


                      {/* STATUS */}

                      <div className="mt-4 flex flex-wrap gap-2">

                        {user.isBlocked ? (

                          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                            🚫 Blocked
                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                            ✓ Active
                          </span>

                        )}

                        <span className="rounded-full border border-gray-100 bg-white px-3 py-1.5 text-xs font-semibold text-gray-500">
                          Joined {formatDate(
                            user.createdAt
                          )}
                        </span>

                      </div>


                      {/* ACTIONS */}

                      <div className="mt-4 grid grid-cols-2 gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleToggleStatus(
                              user._id
                            )
                          }
                          disabled={loading}
                          className={`rounded-xl py-2.5 text-xs font-bold transition disabled:opacity-50 ${
                            user.isBlocked
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {user.isBlocked
                            ? "✓ Unblock User"
                            : "🚫 Block User"}
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              user._id,
                              user.name
                            )
                          }
                          disabled={loading}
                          className="rounded-xl bg-red-100 py-2.5 text-xs font-bold text-red-700 transition hover:bg-red-200 disabled:opacity-50"
                        >
                          🗑 Delete
                        </button>

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
            SmartDonate Admin • Manage responsibly •
            Every user matters 🌱
          </p>

        </div>

      </div>

    </div>
  );
};

export default ManageUsers;