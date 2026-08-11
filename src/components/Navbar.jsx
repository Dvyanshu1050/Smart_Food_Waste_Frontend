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

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    dispatch(logout());

    setMenuOpen(false);

    navigate("/login");
  };

  // =========================
  // DASHBOARD
  // =========================

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

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4">

        <div className="h-16 flex items-center justify-between">

          {/* =========================
              LOGO
          ========================= */}

          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-green-600"
          >
            FoodWaste
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================= */}

          <div className="hidden md:flex items-center gap-6">

            {!token ? (
              <>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-green-600 font-medium"
                >
                  Home
                </Link>

                <Link
                  to="/login"
                  className="text-gray-600 hover:text-green-600 font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* =========================
                    DASHBOARD
                ========================= */}

                <Link
                  to={getDashboardPath()}
                  className="text-gray-600 hover:text-green-600 font-medium"
                >
                  Dashboard
                </Link>

                {/* =========================
                    DONOR LINKS
                ========================= */}

                {user?.role === "donor" && (
                  <>
                    <Link
                      to="/donor/create-donation"
                      className="text-gray-600 hover:text-green-600 font-medium"
                    >
                      Create Donation
                    </Link>

                    <Link
                      to="/donor/my-donations"
                      className="text-gray-600 hover:text-green-600 font-medium"
                    >
                      My Donations
                    </Link>
                  </>
                )}

                {/* =========================
                    NGO / VOLUNTEER LINKS
                ========================= */}

                {(user?.role === "ngo" ||
                  user?.role === "volunteer") && (
                  <>
                    <Link
                      to="/ngo/available-donations"
                      className="text-gray-600 hover:text-green-600 font-medium"
                    >
                      Available Donations
                    </Link>

                    <Link
                      to="/ngo/my-claims"
                      className="text-gray-600 hover:text-green-600 font-medium"
                    >
                      My Claims
                    </Link>
                  </>
                )}

                {/* =========================
                    ADMIN LINKS
                ========================= */}

                {user?.role === "admin" && (
                  <>
                    <Link
                      to="/admin/users"
                      className="text-gray-600 hover:text-red-600 font-medium"
                    >
                      Users
                    </Link>

                    <Link
                      to="/admin/donations"
                      className="text-gray-600 hover:text-red-600 font-medium"
                    >
                      Donations
                    </Link>
                  </>
                )}

                {/* =========================
                    USER
                ========================= */}

                <div className="flex items-center gap-3 pl-4 border-l">

                  <div className="text-right">

                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name || "User"}
                    </p>

                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition"
                  >
                    Logout
                  </button>

                </div>

              </>
            )}

          </div>

          {/* =========================
              MOBILE BUTTON
          ========================= */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden text-gray-700 text-2xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* =========================
            MOBILE MENU
        ========================= */}

        {menuOpen && (
          <div className="md:hidden border-t py-4 space-y-2">

            {!token ? (
              <>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-50"
                >
                  Home
                </Link>

                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg bg-green-600 text-white"
                >
                  Register
                </Link>
              </>
            ) : (
              <>

                {/* DASHBOARD */}

                <Link
                  to={getDashboardPath()}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-50"
                >
                  Dashboard
                </Link>

                {/* DONOR */}

                {user?.role === "donor" && (
                  <>
                    <Link
                      to="/donor/create-donation"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="block px-4 py-3 rounded-lg hover:bg-gray-50"
                    >
                      Create Donation
                    </Link>

                    <Link
                      to="/donor/my-donations"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="block px-4 py-3 rounded-lg hover:bg-gray-50"
                    >
                      My Donations
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
                      className="block px-4 py-3 rounded-lg hover:bg-gray-50"
                    >
                      Available Donations
                    </Link>

                    <Link
                      to="/ngo/my-claims"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="block px-4 py-3 rounded-lg hover:bg-gray-50"
                    >
                      My Claims
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
                      className="block px-4 py-3 rounded-lg hover:bg-gray-50"
                    >
                      Manage Users
                    </Link>

                    <Link
                      to="/admin/donations"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="block px-4 py-3 rounded-lg hover:bg-gray-50"
                    >
                      Manage Donations
                    </Link>
                  </>
                )}

                {/* USER INFO */}

                <div className="border-t pt-4 mt-3 px-4">

                  <p className="font-semibold text-gray-900">
                    {user?.name}
                  </p>

                  <p className="text-sm text-gray-500 capitalize">
                    {user?.role}
                  </p>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full mt-3 bg-red-50 text-red-600 px-4 py-3 rounded-lg font-semibold hover:bg-red-100"
                  >
                    Logout
                  </button>

                </div>

              </>
            )}

          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;