import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchAdminStats } from "../../redux/slices/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { stats, loading, error } = useSelector(
    (state) => state.admin
  );

  // =====================================================
  // FETCH ADMIN STATS
  // =====================================================

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  // =====================================================
  // STAT CARDS
  // =====================================================

  const donationStats = [
    {
      title: "Total Donations",
      value: stats?.totalDonations ?? 0,
      icon: "🍱",
      label: "All food donations",
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      text: "text-green-600",
      border: "border-green-100",
    },
    {
      title: "Available",
      value: stats?.availableDonations ?? 0,
      icon: "🥗",
      label: "Waiting for pickup",
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-100",
    },
    {
      title: "Claimed",
      value: stats?.claimedDonations ?? 0,
      icon: "🤝",
      label: "Currently claimed",
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      text: "text-orange-500",
      border: "border-orange-100",
    },
    {
      title: "Delivered",
      value: stats?.deliveredDonations ?? 0,
      icon: "❤️",
      label: "Successfully delivered",
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-100",
    },
  ];

  const userStats = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      icon: "👥",
      color: "text-gray-900",
      bg: "bg-gray-100",
    },
    {
      title: "Donors",
      value: stats?.totalDonors ?? 0,
      icon: "🍲",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "NGOs",
      value: stats?.totalNGOs ?? 0,
      icon: "🏢",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Volunteers",
      value: stats?.totalVolunteers ?? 0,
      icon: "🚚",
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
  ];

  const deliveryPercentage = Math.min(
    Math.max(Number(stats?.deliveryPercentage || 0), 0),
    100
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7faf8]">

      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-green-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-emerald-200/20 blur-3xl" />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-green-950 p-6 shadow-xl sm:p-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md">

                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-green-200">
                  Administration
                </span>

              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-300">
                Monitor donations, users and the overall impact
                of the SmartDonate platform.
              </p>

            </div>

            {/* Header icon */}

            <div className="hidden h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-4xl shadow-xl backdrop-blur-md sm:flex">
              🛡️
            </div>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600 shadow-sm">

            <span className="text-lg">
              ⚠️
            </span>

            <div>

              <p className="font-bold">
                Unable to load dashboard
              </p>

              <p className="mt-1">
                {error}
              </p>

            </div>

          </div>
        )}


        {/* =================================================
            DONATION OVERVIEW
        ================================================= */}

        <div className="mb-8">

          <div className="mb-4 flex items-end justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-green-600">
                Platform Overview
              </p>

              <h2 className="mt-1 text-xl font-black text-gray-900">
                Donation Activity
              </h2>

            </div>

            <span className="hidden text-sm text-gray-400 sm:block">
              Live platform statistics
            </span>

          </div>


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {donationStats.map((item) => (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl border ${item.border} bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >

                {/* Decorative circle */}

                <div
                  className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${item.bg} transition-transform duration-500 group-hover:scale-150`}
                />

                <div className="relative z-10">

                  <div className="flex items-start justify-between">

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} text-2xl transition-transform duration-300 group-hover:scale-110`}
                    >
                      {item.icon}
                    </div>

                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <div className="mt-1 flex items-end gap-2">

                    <h3
                      className={`text-3xl font-black ${item.text}`}
                    >
                      {loading ? "..." : item.value}
                    </h3>

                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {item.label}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>


        {/* =================================================
            DELIVERY SUCCESS + IMPACT
        ================================================= */}

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Delivery */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <div className="flex items-center gap-2">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-lg">
                    🎯
                  </div>

                  <div>

                    <h2 className="font-black text-gray-900">
                      Delivery Success
                    </h2>

                    <p className="text-xs text-gray-400">
                      Successful food deliveries
                    </p>

                  </div>

                </div>

              </div>

              <div className="text-left sm:text-right">

                <span className="text-3xl font-black text-purple-600">
                  {loading
                    ? "..."
                    : `${deliveryPercentage}%`}
                </span>

                <p className="text-xs text-gray-400">
                  completion rate
                </p>

              </div>

            </div>


            {/* Progress */}

            <div className="mt-7">

              <div className="h-4 overflow-hidden rounded-full bg-gray-100">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-1000"
                  style={{
                    width: `${deliveryPercentage}%`,
                  }}
                />

              </div>

              <div className="mt-3 flex justify-between text-xs text-gray-400">

                <span>
                  0%
                </span>

                <span>
                  100%
                </span>

              </div>

            </div>


            {/* Message */}

            <div className="mt-6 rounded-2xl bg-purple-50 p-4">

              <p className="text-sm font-semibold text-purple-700">
                {deliveryPercentage >= 80
                  ? "Excellent delivery performance! 🎉"
                  : deliveryPercentage >= 50
                  ? "Good progress. Keep improving the delivery network."
                  : "There is room to improve successful deliveries."}
              </p>

            </div>

          </div>


          {/* Impact Card */}

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 p-6 text-white shadow-lg">

            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />

            <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-black/10" />

            <div className="relative z-10">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur-md">
                🌱
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-widest text-green-100">
                Platform Mission
              </p>

              <h2 className="mt-2 text-2xl font-black leading-tight">
                Every meal matters.
              </h2>

              <p className="mt-3 text-sm leading-6 text-green-50/80">
                Turning surplus food into meaningful
                support for communities.
              </p>

              <div className="mt-7 flex items-center gap-3">

                <div className="flex -space-x-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-600 bg-white text-sm">
                    🍲
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-600 bg-white text-sm">
                    ❤️
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-600 bg-white text-sm">
                    🤝
                  </div>

                </div>

                <span className="text-xs font-semibold text-green-100">
                  Food • People • Planet
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            USER STATISTICS
        ================================================= */}

        <div className="mb-8">

          <div className="mb-4">

            <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
              Community
            </p>

            <h2 className="mt-1 text-xl font-black text-gray-900">
              User Statistics
            </h2>

          </div>


          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {userStats.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg} text-xl transition-transform duration-300 group-hover:scale-110`}
                >
                  {item.icon}
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  {item.title}
                </p>

                <h3
                  className={`mt-1 text-3xl font-black ${item.color}`}
                >
                  {loading ? "..." : item.value}
                </h3>

              </div>
            ))}

          </div>

        </div>


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <div>

          <div className="mb-4">

            <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-500">
              Administration
            </p>

            <h2 className="mt-1 text-xl font-black text-gray-900">
              Quick Actions
            </h2>

          </div>


          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* USERS */}

            <Link
              to="/admin/users"
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
            >

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-50 transition-transform duration-500 group-hover:scale-150" />

              <div className="relative z-10">

                <div className="flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-3xl transition-transform duration-300 group-hover:scale-110">
                    👥
                  </div>

                  <span className="text-2xl text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-500">
                    →
                  </span>

                </div>

                <h3 className="mt-6 text-xl font-black text-gray-900">
                  Manage Users
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  View donors, NGOs and volunteers,
                  manage accounts and handle verification.
                </p>

                <span className="mt-5 inline-block text-sm font-bold text-red-600">
                  View Users →
                </span>

              </div>

            </Link>


            {/* DONATIONS */}

            <Link
              to="/admin/donations"
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
            >

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-50 transition-transform duration-500 group-hover:scale-150" />

              <div className="relative z-10">

                <div className="flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl transition-transform duration-300 group-hover:scale-110">
                    🍱
                  </div>

                  <span className="text-2xl text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-500">
                    →
                  </span>

                </div>

                <h3 className="mt-6 text-xl font-black text-gray-900">
                  Manage Donations
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Monitor every donation and track its
                  journey from pickup to successful delivery.
                </p>

                <span className="mt-5 inline-block text-sm font-bold text-green-600">
                  View Donations →
                </span>

              </div>

            </Link>

          </div>

        </div>


        {/* =================================================
            FOOTER MESSAGE
        ================================================= */}

        <div className="mt-8 pb-4 text-center">

          <p className="text-xs text-gray-400">
            SmartDonate Administration •
            Reduce Waste. Share Food. Create Impact. 🌱
          </p>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;