import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  
  const updatePasswordHandler = async () => {
  console.log("Button clicked");

  try {
    console.log("Sending request...");

    await axios.put(
      "http://localhost:3000/api/v1/password/update",
      {
        oldPassword,
        newPassword,
        confirmPassword,
      },
      {
        withCredentials: true,
      }
    );

    console.log("Request successful");
    toast.success("Password updated successfully");
    navigate("/profile");
  } catch (error) {
    console.log("Error:", error);
    console.log(error.response);

    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex justify-center items-center pt-20 px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-md border border-gray-100 p-8">

          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
            Update Password
          </h1>

          <div className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Old Password
              </label>

              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={updatePasswordHandler}
              className="w-full py-3 rounded-md bg-indigo-600 text-white font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]"
            >
              Change Password
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;