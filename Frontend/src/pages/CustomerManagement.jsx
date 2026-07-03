import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

const CustomerManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [search, setSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/users");
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading Customers...
      </div>
    );
  }

  const filteredUsers = users.filter((user) => {
  return (
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );
});

const deleteUser = async () => {
  try {
    await axios.delete(`/api/v1/admin/user/${userToDelete._id}`);

    setShowDeleteModal(false);
    setUserToDelete(null);

    fetchUsers();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <PageTitle title="Customer Management" />

        <div className="max-w-7xl mx-auto">

          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Customer Management
            </h1>

            <p className="text-gray-600 mt-2">
              View and manage registered customers.
            </p>
          </div>

          <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-96 border rounded-lg px-4 py-2"
                />
                </div>

          {users.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              No customers found.
            </div>

            
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Role</th>
                    <th className="p-4 text-left">Verified</th>
                    <th className="p-4 text-left">Joined</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4">{user.name}</td>

                      <td className="p-4">{user.email}</td>

                      <td className="p-4">
                        {user.role}
                      </td>

                      <td className="p-4">
                        {user.isVerified ? "✅" : "❌"}
                      </td>

                      <td className="p-4">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">

                          <button
                                onClick={() => {
                                    setSelectedUser(user);
                                    setShowDetailsModal(true);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                                >
                                View
                                </button>

                          <button
                                onClick={() => {
                                    setUserToDelete(user);
                                    setShowDeleteModal(true);
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
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

        {showDetailsModal && selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

    <div className="bg-white rounded-xl shadow-xl w-[500px] p-6">

      <h2 className="text-2xl font-bold mb-6">
        Customer Details
      </h2>

      <div className="flex justify-center mb-6">
        <img
          src={selectedUser.avatar?.url}
          alt={selectedUser.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
      </div>

      <div className="space-y-3">

        <p><strong>Name:</strong> {selectedUser.name}</p>

        <p><strong>Email:</strong> {selectedUser.email}</p>

        <p><strong>Role:</strong> {selectedUser.role}</p>

        <p>
          <strong>Verified:</strong>{" "}
          {selectedUser.isVerified ? "Yes ✅" : "No ❌"}
        </p>

        <p>
          <strong>Joined:</strong>{" "}
          {new Date(selectedUser.createdAt).toLocaleDateString()}
        </p>

      </div>

      <div className="flex justify-end mt-6">

        <button
          onClick={() => {
            setShowDetailsModal(false);
            setSelectedUser(null);
          }}

          
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}

{showDeleteModal && userToDelete && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

    <div className="bg-white rounded-xl shadow-xl p-6 w-96">

      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Delete Customer
      </h2>

      <p className="mb-6">
        Are you sure you want to delete this customer?
      </p>

      <div className="bg-gray-100 rounded-lg p-3 mb-6">
        <p><strong>Name:</strong> {userToDelete.name}</p>
        <p><strong>Email:</strong> {userToDelete.email}</p>
      </div>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => {
            setShowDeleteModal(false);
            setUserToDelete(null);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={deleteUser}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>

  </div>
)}
      </div>

      <Footer />
    </>
  );
};

export default CustomerManagement;