import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector(
    (state) => state.auth
  );

  const [menuOpen, setMenuOpen] = useState(false);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/login");
  };

  // =====================================================
  // DASHBOARD
  // =====================================================

  const getDashboardPath = () => {
    if (user?.role === "admin") {
      return "/admin/dashboard";
    }

    if (
      user?.role === "ngo" ||
      user?.role === "volunteer"
    ) {
      return "/ngo/dashboard";
    }

    return "/donor/dashboard";
  };

  // =====================================================
  // DESKTOP NAV LINK
  // =====================================================

  const navLinkClass = `
    group
    relative
    px-4
    py-2.5
    rounded-xl
    text-[15px]
    font-semibold
    tracking-[-0.01em]
    text-gray-600
    transition-all
    duration-300
    ease-out
    hover:-translate-y-[1px]
    hover:text-emerald-700
    hover:bg-gradient-to-r
    hover:from-emerald-50
    hover:via-green-50
    hover:to-emerald-50
    hover:shadow-[0_5px_20px_rgba(16,185,129,0.12)]
  `;

  // =====================================================
  // MOBILE NAV LINK
  // =====================================================

  const mobileLinkClass = `
    group
    block
    px-4
    py-3
    rounded-xl
    text-[15px]
    font-semibold
    tracking-[-0.01em]
    text-gray-700
    transition-all
    duration-300
    ease-out
    hover:translate-x-1
    hover:text-emerald-700
    hover:bg-gradient-to-r
    hover:from-emerald-50
    hover:via-green-50
    hover:to-emerald-50
    hover:shadow-[0_5px_20px_rgba(16,185,129,0.10)]
  `;

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        border-b
        border-gray-200/70
        bg-white/90
        backdrop-blur-xl
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
      "
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =================================================
            NAVBAR
        ================================================= */}

        <div className="h-[74px] flex items-center justify-between">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="group flex items-center gap-3"
          >

            {/* LOGO ICON */}

            <div
              className="
                relative
                w-11
                h-11
                rounded-[14px]
                bg-gradient-to-br
                from-emerald-500
                via-green-600
                to-emerald-700
                flex
                items-center
                justify-center
                text-white
                shadow-[0_6px_18px_rgba(16,185,129,0.25)]
                transition-all
                duration-500
                ease-out
                group-hover:scale-110
                group-hover:-rotate-3
                group-hover:shadow-[0_10px_28px_rgba(16,185,129,0.35)]
              "
            >

              <span className="relative z-10 text-[23px]">
                🌱
              </span>

              {/* GLOW */}

              <span
                className="
                  absolute
                  inset-0
                  rounded-[14px]
                  bg-emerald-400
                  opacity-0
                  blur-xl
                  transition-all
                  duration-500
                  group-hover:opacity-30
                "
              />

            </div>

            {/* LOGO TEXT */}

            <div className="leading-none">

              <h1
                className="
                  text-[25px]
                  md:text-[28px]
                  font-black
                  tracking-[-0.045em]
                  text-gray-900
                  transition-all
                  duration-300
                  group-hover:tracking-[-0.055em]
                "
              >
                Food
                <span
                  className="
                    text-emerald-600
                    transition-colors
                    duration-300
                    group-hover:text-green-500
                  "
                >
                  Bridge
                </span>
              </h1>

              <p
                className="
                  hidden
                  sm:block
                  mt-1.5
                  text-[9px]
                  font-bold
                  tracking-[0.18em]
                  text-gray-400
                  uppercase
                  transition-colors
                  duration-300
                  group-hover:text-emerald-500
                "
              >
                Smart Food Donation
              </p>

            </div>

          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden md:flex items-center gap-1">

            {!token ? (
              <>

                {/* HOME */}

                <Link
                  to="/"
                  className={navLinkClass}
                >
                  Home

                  <span
                    className="
                      absolute
                      bottom-[5px]
                      left-4
                      right-4
                      h-[2px]
                      rounded-full
                      bg-gradient-to-r
                      from-emerald-400
                      to-green-500
                      origin-left
                      scale-x-0
                      transition-transform
                      duration-300
                      group-hover:scale-x-100
                    "
                  />
                </Link>

                {/* LOGIN */}

                <Link
                  to="/login"
                  className={navLinkClass}
                >
                  Login

                  <span
                    className="
                      absolute
                      bottom-[5px]
                      left-4
                      right-4
                      h-[2px]
                      rounded-full
                      bg-gradient-to-r
                      from-emerald-400
                      to-green-500
                      origin-left
                      scale-x-0
                      transition-transform
                      duration-300
                      group-hover:scale-x-100
                    "
                  />
                </Link>

                {/* REGISTER */}

                <Link
                  to="/register"
                  className="
                    group/register
                    relative
                    isolate
                    overflow-hidden
                    ml-2
                    px-6
                    py-2.5
                    rounded-xl
                    border
                    border-emerald-600
                    bg-gradient-to-r
                    from-emerald-600
                    to-green-600
                    text-white
                    text-[15px]
                    font-bold
                    tracking-[-0.01em]
                    shadow-[0_6px_20px_rgba(16,185,129,0.22)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:text-emerald-700
                    hover:shadow-[0_10px_30px_rgba(16,185,129,0.22)]
                  "
                >

                  {/* WHITE / EMERALD HOVER */}

                  <span
                    className="
                      absolute
                      inset-0
                      -z-10
                      translate-y-full
                      rounded-xl
                      bg-gradient-to-r
                      from-white
                      via-emerald-50
                      to-white
                      transition-transform
                      duration-500
                      ease-out
                      group-hover/register:translate-y-0
                    "
                  />

                  {/* SHINE */}

                  <span
                    className="
                      absolute
                      top-0
                      -left-20
                      h-full
                      w-12
                      rotate-12
                      bg-white/50
                      blur-md
                      transition-all
                      duration-700
                      group-hover/register:left-[120%]
                    "
                  />

                  <span className="relative z-10">
                    Register
                  </span>

                </Link>

              </>
            ) : (
              <>

                {/* DASHBOARD */}

                <Link
                  to={getDashboardPath()}
                  className={navLinkClass}
                >
                  Dashboard

                  <span
                    className="
                      absolute
                      bottom-[5px]
                      left-4
                      right-4
                      h-[2px]
                      rounded-full
                      bg-gradient-to-r
                      from-emerald-400
                      to-green-500
                      origin-left
                      scale-x-0
                      transition-transform
                      duration-300
                      group-hover:scale-x-100
                    "
                  />
                </Link>

                {/* DONOR */}

                {user?.role === "donor" && (
                  <>
                    <Link
                      to="/donor/create-donation"
                      className={navLinkClass}
                    >
                      Create Donation

                      <span
                        className="
                          absolute
                          bottom-[5px]
                          left-4
                          right-4
                          h-[2px]
                          rounded-full
                          bg-gradient-to-r
                          from-emerald-400
                          to-green-500
                          origin-left
                          scale-x-0
                          transition-transform
                          duration-300
                          group-hover:scale-x-100
                        "
                      />
                    </Link>

                    <Link
                      to="/donor/my-donations"
                      className={navLinkClass}
                    >
                      My Donations

                      <span
                        className="
                          absolute
                          bottom-[5px]
                          left-4
                          right-4
                          h-[2px]
                          rounded-full
                          bg-gradient-to-r
                          from-emerald-400
                          to-green-500
                          origin-left
                          scale-x-0
                          transition-transform
                          duration-300
                          group-hover:scale-x-100
                        "
                      />
                    </Link>
                  </>
                )}

                {/* NGO / VOLUNTEER */}

                {(user?.role === "ngo" ||
                  user?.role === "volunteer") && (
                  <>
                    <Link
                      to="/ngo/available-donations"
                      className={navLinkClass}
                    >
                      Available Donations

                      <span
                        className="
                          absolute
                          bottom-[5px]
                          left-4
                          right-4
                          h-[2px]
                          rounded-full
                          bg-gradient-to-r
                          from-emerald-400
                          to-green-500
                          origin-left
                          scale-x-0
                          transition-transform
                          duration-300
                          group-hover:scale-x-100
                        "
                      />
                    </Link>

                    <Link
                      to="/ngo/my-claims"
                      className={navLinkClass}
                    >
                      My Claims

                      <span
                        className="
                          absolute
                          bottom-[5px]
                          left-4
                          right-4
                          h-[2px]
                          rounded-full
                          bg-gradient-to-r
                          from-emerald-400
                          to-green-500
                          origin-left
                          scale-x-0
                          transition-transform
                          duration-300
                          group-hover:scale-x-100
                        "
                      />
                    </Link>
                  </>
                )}

                {/* ADMIN */}

                {user?.role === "admin" && (
                  <>
                    <Link
                      to="/admin/users"
                      className="
                        group
                        relative
                        px-4
                        py-2.5
                        rounded-xl
                        text-[15px]
                        font-semibold
                        tracking-[-0.01em]
                        text-gray-600
                        transition-all
                        duration-300
                        hover:-translate-y-[1px]
                        hover:text-red-600
                        hover:bg-gradient-to-r
                        hover:from-red-50
                        hover:to-orange-50
                        hover:shadow-[0_5px_20px_rgba(239,68,68,0.10)]
                      "
                    >
                      Users

                      <span
                        className="
                          absolute
                          bottom-[5px]
                          left-4
                          right-4
                          h-[2px]
                          rounded-full
                          bg-gradient-to-r
                          from-red-400
                          to-orange-400
                          scale-x-0
                          origin-left
                          transition-transform
                          duration-300
                          group-hover:scale-x-100
                        "
                      />
                    </Link>

                    <Link
                      to="/admin/donations"
                      className="
                        group
                        relative
                        px-4
                        py-2.5
                        rounded-xl
                        text-[15px]
                        font-semibold
                        tracking-[-0.01em]
                        text-gray-600
                        transition-all
                        duration-300
                        hover:-translate-y-[1px]
                        hover:text-red-600
                        hover:bg-gradient-to-r
                        hover:from-red-50
                        hover:to-orange-50
                        hover:shadow-[0_5px_20px_rgba(239,68,68,0.10)]
                      "
                    >
                      Donations

                      <span
                        className="
                          absolute
                          bottom-[5px]
                          left-4
                          right-4
                          h-[2px]
                          rounded-full
                          bg-gradient-to-r
                          from-red-400
                          to-orange-400
                          scale-x-0
                          origin-left
                          transition-transform
                          duration-300
                          group-hover:scale-x-100
                        "
                      />
                    </Link>
                  </>
                )}

                {/* USER AREA */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    ml-3
                    pl-4
                    border-l
                    border-gray-200
                  "
                >

                  {/* USER INFO */}

                  <div className="hidden lg:block text-right">

                    <p className="text-[14px] font-bold text-gray-900">
                      {user?.name || "User"}
                    </p>

                    <p className="text-[10px] font-semibold text-gray-400 capitalize tracking-wide">
                      {user?.role}
                    </p>

                  </div>

                  {/* LOGOUT */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      group/logout
                      relative
                      isolate
                      overflow-hidden
                      px-5
                      py-2.5
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      text-red-600
                      text-[14px]
                      font-bold
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-white
                      hover:border-red-300
                      hover:shadow-[0_7px_22px_rgba(239,68,68,0.12)]
                    "
                  >

                    <span
                      className="
                        absolute
                        inset-0
                        -z-10
                        translate-x-full
                        bg-gradient-to-r
                        from-white
                        to-red-50
                        transition-transform
                        duration-400
                        group-hover/logout:translate-x-0
                      "
                    />

                    <span className="relative z-10">
                      Logout
                    </span>

                  </button>

                </div>

              </>
            )}

          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
              md:hidden
              w-11
              h-11
              rounded-xl
              bg-gray-50
              border
              border-gray-200
              flex
              items-center
              justify-center
              text-[20px]
              text-gray-700
              transition-all
              duration-300
              hover:bg-emerald-50
              hover:text-emerald-600
              hover:border-emerald-200
              hover:shadow-[0_5px_18px_rgba(16,185,129,0.12)]
            "
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <div
          className={`
            md:hidden
            overflow-hidden
            transition-all
            duration-500
            ease-out
            ${
              menuOpen
                ? "max-h-[700px] opacity-100 pb-5"
                : "max-h-0 opacity-0"
            }
          `}
        >

          <div className="border-t border-gray-100 pt-4 space-y-2">

            {!token ? (
              <>

                <Link
                  to="/"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className={mobileLinkClass}
                >
                  🏠 Home
                </Link>

                <Link
                  to="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className={mobileLinkClass}
                >
                  🔐 Login
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="
                    block
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-emerald-600
                    bg-gradient-to-r
                    from-emerald-600
                    to-green-600
                    text-white
                    text-[15px]
                    font-bold
                    transition-all
                    duration-300
                    hover:bg-white
                    hover:text-emerald-700
                    hover:border-emerald-500
                    hover:shadow-[0_7px_22px_rgba(16,185,129,0.16)]
                  "
                >
                  🚀 Register
                </Link>

              </>
            ) : (
              <>

                <Link
                  to={getDashboardPath()}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className={mobileLinkClass}
                >
                  📊 Dashboard
                </Link>

                {/* DONOR */}

                {user?.role === "donor" && (
                  <>
                    <Link
                      to="/donor/create-donation"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={mobileLinkClass}
                    >
                      🍱 Create Donation
                    </Link>

                    <Link
                      to="/donor/my-donations"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={mobileLinkClass}
                    >
                      📦 My Donations
                    </Link>
                  </>
                )}

                {/* NGO / VOLUNTEER */}

                {(user?.role === "ngo" ||
                  user?.role === "volunteer") && (
                  <>
                    <Link
                      to="/ngo/available-donations"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={mobileLinkClass}
                    >
                      🔎 Available Donations
                    </Link>

                    <Link
                      to="/ngo/my-claims"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={mobileLinkClass}
                    >
                      ❤️ My Claims
                    </Link>
                  </>
                )}

                {/* ADMIN */}

                {user?.role === "admin" && (
                  <>
                    <Link
                      to="/admin/users"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={mobileLinkClass}
                    >
                      👥 Manage Users
                    </Link>

                    <Link
                      to="/admin/donations"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={mobileLinkClass}
                    >
                      📦 Manage Donations
                    </Link>
                  </>
                )}

                {/* USER INFO */}

                <div className="border-t border-gray-100 mt-3 pt-4 px-1">

                  <div className="px-4">

                    <p className="text-[15px] font-bold text-gray-900">
                      {user?.name}
                    </p>

                    <p className="text-[11px] font-semibold text-gray-500 capitalize tracking-wide">
                      {user?.role}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full
                      mt-3
                      px-4
                      py-3
                      rounded-xl
                      bg-red-50
                      text-red-900
                      border
                      border-red-100
                      text-[15px]
                      font-bold
                      transition-all
                      duration-300
                      hover:bg-white
                      hover:border-red-500
                      hover:shadow-[0_7px_22px_rgba(239,68,68,0.12)]
                    "
                  >
                    Logout
                  </button>

                </div>

              </>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;