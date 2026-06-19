import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetOrderSuccess } from "../features/orders/orderSlice";
import Navbar from "../components/Navbar";

const OrderSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset the success state so they can place more orders in the future
    dispatch(resetOrderSuccess());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="h-[80vh] flex flex-col items-center justify-center bg-gray-50">
        <CheckCircle size={100} className="text-green-500 mb-6 drop-shadow-md" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-600 mb-8">Thank you for shopping with BookStore. We are preparing your books.</p>
        
        <Link
          to="/orders"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all"
        >
          View My Orders
        </Link>
      </div>
    </>
  );
};

export default OrderSuccess;