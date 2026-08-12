import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  register,
  clearAuthError,
} from "../redux/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const [showSuccess, setShowSuccess] = useState(false);

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
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.role
    ) {
      return;
    }

    if (formData.password.length < 6) {
      return;
    }

    const result = await dispatch(
      register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      })
    );

    if (register.fulfilled.match(result)) {
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 3500);
    }
  };

  // =====================================================
  // SUCCESS SCREEN
  // =====================================================

  if (showSuccess) {
    return (
      <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-10">

        {/* Background */}

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

        {/* Floating icons */}

        <div className="absolute left-[12%] top-[20%] animate-bounce text-3xl">
          ❤️
        </div>

        <div className="absolute right-[15%] top-[25%] animate-pulse text-3xl">
          🥗
        </div>

        <div className="absolute bottom-[20%] left-[18%] animate-pulse text-2xl">
          🍎
        </div>

        <div className="absolute bottom-[18%] right-[20%] animate-bounce text-2xl">
          ✨
        </div>

        {/* Success Card */}

        <div className="relative z-10 w-full max-w-2xl">

          <div className="overflow-hidden rounded-[2rem] border border-white bg-white/90 p-8 text-center shadow-[0_30px_100px_rgba(16,185,129,0.18)] backdrop-blur-xl sm:p-12">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-4xl text-white shadow-lg">
                ✓
              </div>

            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-green-600">
              Welcome to SmartDonate
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Thank You,{" "}
              <span className="text-green-600">
                {formData.name.split(" ")[0]}
              </span>
              !
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
              Thank you for choosing to make a difference.
              Together, we can turn surplus food into someone's
              next meal.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">

              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-2xl">🍲</p>
                <p className="mt-2 text-sm font-bold text-gray-800">
                  Save Food
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-2xl">🤝</p>
                <p className="mt-2 text-sm font-bold text-gray-800">
                  Help People
                </p>
              </div>

              <div className="rounded-2xl bg-lime-50 p-4">
                <p className="text-2xl">🌱</p>
                <p className="mt-2 text-sm font-bold text-gray-800">
                  Reduce Waste
                </p>
              </div>

            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">

              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

              Taking you to login...

            </div>

          </div>

        </div>
      </div>
    );
  }

  // =====================================================
  // REGISTER PAGE
  // =====================================================

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#f6faf7] px-4 py-8 sm:px-6 lg:py-12">

      {/* Background decoration */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-green-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-3xl" />

      {/* =================================================
          MAIN CARD

          LEFT  = CHILD
          RIGHT = FORM
      ================================================= */}

      <div className="relative z-10 mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_30px_100px_rgba(15,23,42,0.12)] lg:grid-cols-2">

        {/* =================================================
            LEFT SIDE - REAL CHILD
        ================================================= */}

        <div className="relative hidden min-h-[720px] overflow-hidden lg:block">

          {/* Real image */}

          <img
            src="https://images.unsplash.com/photo-1694286068611-d0c24cbc2cd5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Child receiving support"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark / green overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-green-900/10" />

          {/* Green glow */}

          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-green-400/20 blur-3xl" />

          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />

          {/* Floating heart */}

          <div className="absolute right-10 top-10 flex h-14 w-14 animate-bounce items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl shadow-xl backdrop-blur-md">
            ❤️
          </div>

          {/* Main content */}

          <div className="absolute inset-x-0 bottom-0 p-10">

            {/* Small badge */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">

              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

              <span className="text-xs font-bold uppercase tracking-[0.15em] text-white">
                Every Meal Matters
              </span>

            </div>

            {/* Heading */}

            <h2 className="max-w-lg text-4xl font-black leading-tight text-white xl:text-5xl">

              Your donation can give
              <span className="block text-green-300">
                someone a meal.
              </span>

            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-white/80">
              Good food should never go to waste when
              someone nearby needs it.
            </p>

            {/* Support message */}

            <div className="mt-7 flex max-w-md items-center gap-4 rounded-2xl border border-white/20 bg-black/20 p-4 backdrop-blur-md">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-lg">
                🍲
              </div>

              <div>

                <p className="text-sm font-bold text-white">
                  Thank You for Your Support
                </p>

                <p className="mt-1 text-xs leading-5 text-white/70">
                  Your support helps reduce food waste
                  and brings hope to communities.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            RIGHT SIDE - REGISTER FORM
        ================================================= */}

        <div className="p-6 sm:p-10 lg:p-12">

          {/* Logo */}

          <div className="mb-8 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-xl text-white shadow-lg shadow-green-600/20">
              ♻
            </div>

            <div>

              <h2 className="text-lg font-black tracking-tight text-gray-900">
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
              Join the movement
            </p>

            <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Join a community working together to reduce
              food waste and help people in need.
            </p>

          </div>


          {/* Error */}

          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">

              <span>⚠️</span>

              <span>{error}</span>

            </div>
          )}


          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  👤
                </span>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                />

              </div>

            </div>


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
                  disabled={loading}
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔒
                </span>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  disabled={loading}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                />

              </div>

              <p className="mt-2 text-xs text-gray-400">
                Use at least 6 characters.
              </p>

            </div>


            {/* ROLE */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                I want to join as
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🤝
                </span>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-10 text-sm font-medium text-gray-800 outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <option value="donor">
                    Food Donor
                  </option>

                  <option value="ngo">
                    NGO
                  </option>

                  <option value="volunteer">
                    Volunteer
                  </option>

                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ▾
                </span>

              </div>

            </div>


            {/* NGO / VOLUNTEER INFO */}

            {(formData.role === "ngo" ||
              formData.role === "volunteer") && (

              <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">

                <div className="flex gap-3">

                  <span className="text-xl">
                    🛡️
                  </span>

                  <div>

                    <p className="text-sm font-bold text-orange-700">
                      Admin verification required
                    </p>

                    <p className="mt-1 text-xs leading-5 text-orange-600">
                      Your account will be reviewed by
                      an administrator before you can log in.
                    </p>

                  </div>

                </div>

              </div>
            )}


            {/* SUBMIT */}

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

                    Creating Account...
                  </>
                ) : (
                  <>
                    Create My Account

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}

              </span>

              {/* Button shine */}

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            </button>

          </form>


          {/* LOGIN */}

          <p className="mt-7 text-center text-sm text-gray-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-bold text-green-600 transition hover:text-green-700 hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>


      {/* =================================================
          MOBILE SUPPORT SECTION
      ================================================= */}

      <div className="relative z-10 mx-auto mt-5 max-w-md lg:hidden">

        <div className="overflow-hidden rounded-2xl bg-green-700 p-6 text-center text-white shadow-xl">

          <div className="mx-auto mb-4 h-40 overflow-hidden rounded-xl">

            <img
              src="https://images.unsplash.com/photo-1694286068611-d0c24cbc2cd5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Child receiving support"
              className="h-full w-full object-cover"
            />

          </div>

          <h3 className="text-xl font-black">
            Your donation can give someone a meal.
          </h3>

          <p className="mt-2 text-sm text-green-100">
            Thank You for Your Support ❤️
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;