import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { forgetPassword, removeErrors } from "../features/products/user/userSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { loading, message, error } = useSelector((state) => state.user);
  useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(removeErrors());
  }

  if (message) {
    toast.success(message);
  }
}, [dispatch, error, message]);

  const submitHandler = (e) => {
  e.preventDefault();

  if (!email) {
    return toast.error("Please enter your email");
  }

  dispatch(forgetPassword(email));
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter your registered email address and we'll send you a password
          reset link.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded-lg px-4 py-3 mb-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;