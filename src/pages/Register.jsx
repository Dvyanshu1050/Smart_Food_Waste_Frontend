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

  const {
    loading,
    error,
  } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

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

    // Required fields
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.role
    ) {
      return;
    }

    // Password validation
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

    // =================================================
    // REGISTRATION SUCCESS
    // =================================================

    if (register.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-10">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join the Smart Food Waste Platform
          </p>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            ⚠️ {error}
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

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
            />

            <p className="mt-1 text-xs text-gray-500">
              Password must be at least 6 characters.
            </p>

          </div>

          {/* ROLE */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Register As
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
            >

              <option value="donor">
                Donor
              </option>

              <option value="ngo">
                NGO
              </option>

              <option value="volunteer">
                Volunteer
              </option>

            </select>

          </div>

          {/* INFO */}

          {(formData.role === "ngo" ||
            formData.role === "volunteer") && (
            <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-3">

              <p className="text-sm font-semibold text-orange-700">
                Admin Verification Required
              </p>

              <p className="mt-1 text-xs leading-5 text-orange-600">
                Your account will be reviewed by
                an administrator before you can
                log in.
              </p>

            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* =================================================
            LOGIN
        ================================================= */}

        <p className="mt-6 text-center text-sm text-gray-500">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-green-600 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;