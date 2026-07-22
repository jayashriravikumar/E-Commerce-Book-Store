import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

 const deleteAccount = async () => {
  if (!password) {
    alert("Please enter your password.");
    return;
  }

  const confirmDelete = window.confirm(
    "This action is permanent. Are you sure you want to delete your account?"
  );

  if (!confirmDelete) return;

  try {
    const { data } = await axios.delete("/api/v1/security/delete-account", {
  data: {
    password,
  },
});

    alert(data.message);

    localStorage.clear();

    navigate("/");

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Unable to delete account."
    );
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8 px-4">

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

          <h1 className="text-3xl font-bold text-red-600">
            Delete Account
          </h1>

          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-6">

            <h2 className="font-semibold text-red-700">
              Warning
            </h2>

            <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-2">
              <li>Your profile will be permanently deleted.</li>
              <li>Your order history will be removed.</li>
              <li>Your saved addresses will be deleted.</li>
              <li>Your wishlist and cart will be cleared.</li>
              <li>This action cannot be undone.</li>
            </ul>

          </div>

          <div className="mt-8">

            <label className="block font-semibold mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button
  onClick={deleteAccount}
  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
>
  Delete Account
</button>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default DeleteAccount;