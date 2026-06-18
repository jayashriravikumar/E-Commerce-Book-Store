import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyOTP, removeErrors, removeSuccess } from "../features/products/user/userSlice";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Grab the email passed from the Register page
  const email = location.state?.email || "";

  const { error, isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    // If they landed here without an email, kick them back to register
    if (!email) {
      navigate("/register");
    }
    
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }

    if (isAuthenticated) {
      toast.success("Account Verified Successfully!");
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate, email]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }
    dispatch(verifyOTP({ email, otp }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submitHandler} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Verify Your Email</h2>
        <p className="text-center text-gray-600 text-sm">We sent a 6-digit code to <strong>{email}</strong></p>

        <input
          type="text"
          maxLength="6"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center tracking-[1em] text-lg font-semibold"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          {loading ? "Verifying..." : "Verify & Login"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;