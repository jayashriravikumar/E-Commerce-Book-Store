import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createOrder, clearOrderErrors } from "../features/orders/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error, success, loading } = useSelector((state) => state.order);

  // Retrieve the math we saved in ConfirmOrder.jsx
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearOrderErrors());
    }
    if (success) {
      dispatch(clearCart()); // Empty the cart!
      navigate("/order/success");
    }
  }, [dispatch, error, success, navigate]);

  const submitOrderHandler = (e) => {
    e.preventDefault();

    // Construct the exact object your backend expects
    const orderData = {
      shippingAddress: shippingInfo,
      orderItems: cartItems.map((item) => ({
        name: item.name || item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image?.[0]?.url,
        product: item._id, // This links to the Product ID
      })),
      itemPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
      paymentInfo: {
        id: "COD_" + Math.floor(Math.random() * 1000000), // Fake ID for now
        status: "Succeeded", // Fake status for COD
      },
    };

    dispatch(createOrder(orderData));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center border border-gray-100">
          <h2 className="text-2xl font-bold mb-4">Cash on Delivery</h2>
          <p className="text-gray-600 mb-8">You will pay <b>₹{orderInfo?.totalPrice}</b> when your books arrive.</p>
          
          <button
            onClick={submitOrderHandler}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
          >
            {loading ? "Processing Order..." : "Place Order Now"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;