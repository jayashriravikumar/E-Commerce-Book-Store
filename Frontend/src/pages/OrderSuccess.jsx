import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetOrderSuccess } from "../features/orders/orderSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset the success state so they can place more orders in the future
    dispatch(resetOrderSuccess());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-4 py-8">

  <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 max-w-lg w-full text-center">

    <CheckCircle
      size={90}
      className="mx-auto text-green-500 mb-5"
    />

    <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3">
      Order Placed Successfully!
    </h1>

    <p className="text-gray-600 text-sm md:text-lg mb-6">
      Thank you for shopping with BookStore. We are preparing your books.
    </p>

   

    

    <div className="flex flex-col sm:flex-row gap-3">

      <Link
        to="/orders"
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-center"
      >
        View My Orders
      </Link>

      <Link
        to="/products"
        className="flex-1 border border-gray-300 hover:bg-gray-100 font-bold py-3 rounded-xl transition text-center"
      >
        Continue Shopping
      </Link>

    </div>

  </div>

</div>

<Footer />
    </>
  );
};

export default OrderSuccess;