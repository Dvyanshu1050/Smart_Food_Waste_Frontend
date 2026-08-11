import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  toggleUserStatus,
} from "../../redux/slices/userSlice";

const ManageUsers = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  const handleToggleStatus = (id) => {
    dispatch(toggleUserStatus(id));
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <p className="text-red-600 font-medium">
            Administration
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
            Manage Users
          </h1>

          <p className="text-gray-500 mt-2">
            Manage donors, NGOs and volunteers.
          </p>

        </div>

        {/* User Count */}
        <div className="bg-white rounded-xl shadow-sm px-6 py-4 mb-6">

          <p className="text-gray-500 text-sm">
            Total Users
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-1">
            {users.length}
          </p>

        </div>

        {/* Users */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {users.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-6xl mb-5">
                👥
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                No Users Found
              </h2>

              <p className="text-gray-500 mt-2">
                Registered users will appear here.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

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
                      Status
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y">

                  {users.map((user) => (

                    <tr key={user.id}>

                      <td className="px-6 py-4 font-medium text-gray-900">
                        {user.name}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {user.role}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.isBlocked
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.isBlocked
                            ? "BLOCKED"
                            : "ACTIVE"}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              handleToggleStatus(user.id)
                            }
                            className="px-3 py-2 rounded-lg bg-orange-100 text-orange-700 text-sm font-medium hover:bg-orange-200"
                          >
                            {user.isBlocked
                              ? "Unblock"
                              : "Block"}
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(user.id)
                            }
                            className="px-3 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default ManageUsers;