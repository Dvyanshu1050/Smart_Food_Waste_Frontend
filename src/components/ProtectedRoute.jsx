import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();

  const { token, user } = useSelector(
    (state) => state.auth
  );

  // =========================
  // NOT LOGGED IN
  // =========================

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // =========================
  // BLOCKED USER
  // =========================

  if (user.isBlocked) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // =========================
  // ROLE CHECK
  // =========================

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    // User ko uske own dashboard par bhejo

    if (user.role === "admin") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    if (
      user.role === "ngo" ||
      user.role === "volunteer"
    ) {
      return (
        <Navigate
          to="/ngo/dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/donor/dashboard"
        replace
      />
    );
  }

  // =========================
  // AUTHORIZED
  // =========================

  return <Outlet />;
};

export default ProtectedRoute;