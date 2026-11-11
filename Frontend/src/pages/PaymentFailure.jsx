import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">

          <div className="text-6xl mb-4">❌</div>

          <h1 className="text-3xl font-bold text-red-600 mb-3">
            Payment Failed
          </h1>

          <p className="text-gray-600 mb-6">
            {state?.reason || "Your payment could not be completed."}
          </p>

          <button
            onClick={() => navigate("/payment")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="w-full bg-gray-200 py-3 rounded-lg"
          >
            Back to Cart
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaymentFailure;