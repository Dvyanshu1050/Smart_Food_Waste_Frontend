import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  login,
  clearAuthError,
} from "../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      dispatch(clearAuthError());
    }
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    const result = await dispatch(
      login({
        email: formData.email.trim(),
        password: formData.password,
      })
    );

    if (login.fulfilled.match(result)) {
      const role = result.payload.user.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (
        role === "ngo" ||
        role === "volunteer"
      ) {
        navigate("/ngo/dashboard");
      } else {
        navigate("/donor/dashboard");
      }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#f5faf7] px-4 py-8 sm:px-6 lg:py-12">

      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-green-200/40 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-lime-100/40 blur-3xl" />

      {/* =================================================
          MAIN CARD
      ================================================= */}

      <div className="relative z-10 mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_30px_100px_rgba(15,23,42,0.12)] lg:grid-cols-2">


        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="relative hidden min-h-[680px] overflow-hidden bg-gradient-to-br from-green-700 via-emerald-600 to-green-800 lg:block">

          {/* Glow */}

          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-black/10 blur-3xl" />


          {/* Floating food icons */}

          <div className="absolute left-12 top-20 animate-bounce text-2xl">
            🍲
          </div>

          <div className="absolute right-14 top-32 animate-pulse text-2xl">
            ❤️
          </div>

          <div className="absolute bottom-36 left-16 animate-pulse text-xl">
            🌱
          </div>

          <div className="absolute bottom-24 right-20 animate-bounce text-2xl">
            ✨
          </div>


          {/* Content */}

          <div className="relative z-10 flex h-full min-h-[680px] flex-col justify-between p-10 xl:p-12">

            {/* Brand */}

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-xl">
                ♻
              </div>

              <div>

                <h2 className="text-xl font-black text-white">
                  Smart
                  <span className="text-green-200">
                    Donate
                  </span>
                </h2>

                <p className="text-xs text-green-100/70">
                  Every meal matters
                </p>

              </div>

            </div>


            {/* Center */}

            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">

                <span className="h-2 w-2 animate-pulse rounded-full bg-lime-300" />

                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  Welcome Back
                </span>

              </div>


              <h1 className="max-w-lg text-4xl font-black leading-tight text-white xl:text-5xl">

                Welcome back,
                <span className="block text-green-200">
                  changemaker.
                </span>

              </h1>


              <p className="mt-5 max-w-md text-base leading-7 text-green-50/80">
                Your next action could help rescue
                surplus food, reduce waste and put
                a meal on someone's table.
              </p>


              {/* Quote */}

              <div className="mt-8 max-w-md rounded-2xl border border-white/15 bg-black/10 p-5 backdrop-blur-md">

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-lg">
                    ❤️
                  </div>

                  <div>

                    <p className="text-sm font-bold leading-6 text-white">
                      "Small acts of kindness can
                      create a big impact."
                    </p>

                    <p className="mt-2 text-xs text-green-100/60">
                      — SmartDonate Community
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* Impact */}

            <div>

              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-green-100/60">
                Our mission
              </p>

              <div className="grid grid-cols-3 gap-3">

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

                  <p className="text-2xl font-black text-white">
                    🍲
                  </p>

                  <p className="mt-2 text-xs font-semibold text-green-100">
                    Rescue Food
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

                  <p className="text-2xl font-black text-white">
                    🤝
                  </p>

                  <p className="mt-2 text-xs font-semibold text-green-100">
                    Support People
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

                  <p className="text-2xl font-black text-white">
                    🌱
                  </p>

                  <p className="mt-2 text-xs font-semibold text-green-100">
                    Reduce Waste
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            RIGHT SIDE - LOGIN
        ================================================= */}

        <div className="flex items-center p-6 sm:p-10 lg:p-12">

          <div className="w-full">

            {/* Mobile Logo */}

            <div className="mb-8 flex items-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-xl text-white shadow-lg">
                ♻
              </div>

              <div>

                <h2 className="text-lg font-black text-gray-900">
                  Smart
                  <span className="text-green-600">
                    Donate
                  </span>
                </h2>

                <p className="text-xs text-gray-400">
                  Every meal matters
                </p>

              </div>

            </div>


            {/* Header */}

            <div className="mb-8">

              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-green-600">
                Good to see you
              </p>

              <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Sign in to continue
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Continue making an impact with
                SmartDonate.
              </p>

            </div>


            {/* Error */}

            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">

                <span>⚠️</span>

                <span>
                  {error}
                </span>

              </div>
            )}


            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    ✉
                  </span>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>

                </div>

                <div className="relative">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-11 pr-12 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-green-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>

                </div>

              </div>


              {/* Remember / Security */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs text-green-600">
                    ✓
                  </span>

                  <span className="text-xs text-gray-500">
                    Secure login
                  </span>

                </div>

                <span className="text-xs font-medium text-gray-400">
                  JWT protected
                </span>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  relative
                  w-full
                  overflow-hidden
                  rounded-xl
                  bg-green-600
                  py-4
                  font-bold
                  text-white
                  shadow-lg
                  shadow-green-600/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-green-700
                  hover:shadow-xl
                  hover:shadow-green-600/25
                  active:translate-y-0
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                <span className="relative z-10 flex items-center justify-center gap-2">

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Signing you in...
                    </>
                  ) : (
                    <>
                      Sign In

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}

                </span>

                {/* Shine */}

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              </button>

            </form>


            {/* Register */}

            <div className="my-7 flex items-center gap-3">

              <div className="h-px flex-1 bg-gray-100" />

              <span className="text-xs text-gray-400">
                NEW HERE?
              </span>

              <div className="h-px flex-1 bg-gray-100" />

            </div>


            <Link
              to="/register"
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 py-3.5 text-sm font-bold text-green-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-100"
            >

              Create a SmartDonate Account

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </Link>


            {/* Bottom */}

            <p className="mt-7 text-center text-xs leading-5 text-gray-400">

              By continuing, you're helping build
              a world where good food reaches
              people instead of landfills. 🌱

            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          MOBILE MESSAGE
      ================================================= */}

      <div className="relative z-10 mx-auto mt-5 max-w-md lg:hidden">

        <div className="rounded-2xl bg-green-700 p-6 text-center text-white shadow-xl">

          <div className="text-3xl">
            🍲 ❤️ 🌱
          </div>

          <h3 className="mt-3 text-lg font-black">
            Every Meal Matters
          </h3>

          <p className="mt-2 text-sm leading-6 text-green-100">
            Your next action can help rescue food
            and support someone in need.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;