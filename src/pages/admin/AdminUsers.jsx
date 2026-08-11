import { useEffect } from "react";
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
    users,
    loading,
    error,
  } = useSelector((state) => state.admin);

  // =====================================================
  // FETCH USERS + SOCKET LISTENERS
  // =====================================================

  useEffect(() => {
    // Initial users fetch
    dispatch(fetchAdminUsers());

    // =================================================
    // NEW USER REGISTERED
    // =================================================

    const handleUserRegistered = (user) => {
      console.log(
        "🟢 New user registered:",
        user
      );

      dispatch(addUser(user));
    };

    // =================================================
    // VERIFICATION UPDATED
    // =================================================

    const handleVerificationUpdated = (
      updatedUser
    ) => {
      console.log(
        "🔄 Verification updated:",
        updatedUser
      );

      dispatch(updateUser(updatedUser));
    };

    // =================================================
    // BLOCK STATUS UPDATED
    // =================================================

    const handleBlockStatusChanged = (
      updatedUser
    ) => {
      console.log(
        "🔄 Block status changed:",
        updatedUser
      );

      dispatch(updateUser(updatedUser));
    };

    // =================================================
    // USER DELETED
    // =================================================

    const handleUserDeleted = (data) => {
      console.log(
        "🗑️ User deleted:",
        data
      );

      dispatch(removeUser(data._id));
    };

    // =================================================
    // SOCKET LISTENERS
    // =================================================

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

    // =================================================
    // CLEANUP
    // =================================================

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
  // BLOCK / UNBLOCK
  // =====================================================

  const handleToggleBlock = async (userId) => {
    await dispatch(
      toggleUserBlock(userId)
    );
  };

  // =====================================================
  // APPROVE USER
  // =====================================================

  const handleApprove = async (userId) => {
    await dispatch(
      approveUserVerification(userId)
    );
  };

  // =====================================================
  // REJECT USER
  // =====================================================

  const handleReject = async (userId) => {
    await dispatch(
      rejectUserVerification(userId)
    );
  };

  // =====================================================
  // ROLE STYLES
  // =====================================================

  const roleStyles = {
    admin: "bg-red-100 text-red-700",
    donor: "bg-green-100 text-green-700",
    ngo: "bg-blue-100 text-blue-700",
    volunteer:
      "bg-orange-100 text-orange-700",
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">

        <p className="text-red-600 font-medium">
          Administration
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
          Manage Users
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage all registered users.
        </p>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        {/* TOTAL */}

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Total Users
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-1">
            {loading
              ? "..."
              : users.length}
          </p>

        </div>

        {/* DONORS */}

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Donors
          </p>

          <p className="text-2xl font-bold text-green-600 mt-1">
            {loading
              ? "..."
              : users.filter(
                  (user) =>
                    user.role === "donor"
                ).length}
          </p>

        </div>

        {/* NGOS */}

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            NGOs
          </p>

          <p className="text-2xl font-bold text-blue-600 mt-1">
            {loading
              ? "..."
              : users.filter(
                  (user) =>
                    user.role === "ngo"
                ).length}
          </p>

        </div>

        {/* VOLUNTEERS */}

        <div className="bg-white rounded-xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Volunteers
          </p>

          <p className="text-2xl font-bold text-orange-500 mt-1">
            {loading
              ? "..."
              : users.filter(
                  (user) =>
                    user.role === "volunteer"
                ).length}
          </p>

        </div>

      </div>

      {/* =================================================
          USERS TABLE
      ================================================= */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {loading ? (

          <div className="p-12 text-center">

            <div className="text-5xl mb-4">
              ⏳
            </div>

            <p className="text-gray-500">
              Loading users...
            </p>

          </div>

        ) : users.length === 0 ? (

          <div className="p-12 text-center">

            <div className="text-6xl mb-5">
              👥
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No Users Found
            </h2>

            <p className="text-gray-500 mt-2">
              No users have registered yet.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              {/* =================================================
                  TABLE HEADER
              ================================================= */}

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Name
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Role
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Verification
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Joined
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Action
                  </th>

                </tr>

              </thead>

              {/* =================================================
                  TABLE BODY
              ================================================= */}

              <tbody className="divide-y">

                {users.map((user) => (

                  <tr
                    key={user._id}
                    className="hover:bg-gray-50"
                  >

                    {/* NAME */}

                    <td className="px-6 py-5">

                      <p className="font-semibold text-gray-900">
                        {user.name}
                      </p>

                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-5">

                      <p className="text-gray-700">
                        {user.email}
                      </p>

                    </td>

                    {/* ROLE */}

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          roleStyles[user.role] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>

                    </td>

                    {/* =================================================
                        VERIFICATION
                    ================================================= */}

                    <td className="px-6 py-5">

                      {user.role === "admin" ||
                      user.role === "donor" ? (

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Verified
                        </span>

                      ) : user.verificationStatus ===
                        "VERIFIED" ? (

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Verified
                        </span>

                      ) : user.verificationStatus ===
                        "REJECTED" ? (

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          Rejected
                        </span>

                      ) : (

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          Pending
                        </span>

                      )}

                    </td>

                    {/* =================================================
                        BLOCK STATUS
                    ================================================= */}

                    <td className="px-6 py-5">

                      {user.isBlocked ? (

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          Blocked
                        </span>

                      ) : (

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Active
                        </span>

                      )}

                    </td>

                    {/* JOINED */}

                    <td className="px-6 py-5">

                      <p className="text-sm text-gray-600">

                        {user.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString()
                          : "N/A"}

                      </p>

                    </td>

                    {/* =================================================
                        ACTION
                    ================================================= */}

                    <td className="px-6 py-5">

                      {user.role === "admin" ? (

                        <span className="text-sm text-gray-400">
                          Not Available
                        </span>

                      ) : (

                        <div className="flex flex-wrap gap-2">

                          {/* APPROVE / REJECT */}

                          {(user.role === "ngo" ||
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
                                disabled={loading}
                                className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-100 text-green-700 hover:bg-green-200 transition disabled:opacity-50"
                              >
                                Approve
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleReject(
                                    user._id
                                  )
                                }
                                disabled={loading}
                                className="px-4 py-2 rounded-lg text-sm font-semibold bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition disabled:opacity-50"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {/* BLOCK / UNBLOCK */}

                          <button
                            type="button"
                            onClick={() =>
                              handleToggleBlock(
                                user._id
                              )
                            }
                            disabled={loading}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
                              user.isBlocked
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            }`}
                          >
                            {user.isBlocked
                              ? "Unblock"
                              : "Block"}
                          </button>

                        </div>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminUsers;