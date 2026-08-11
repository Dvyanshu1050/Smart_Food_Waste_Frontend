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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      dispatch(clearAuthError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    const result = await dispatch(
      login({
        email: formData.email,
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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* =========================
            HEADER
        ========================= */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your FoodWaste account
          </p>

        </div>

        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* LOGIN */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* =========================
            REGISTER
        ========================= */}

        <p className="text-center text-gray-500 mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;