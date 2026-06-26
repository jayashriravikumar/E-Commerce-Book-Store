import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { createOrder, clearOrderErrors } from "../features/orders/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error, success, loading } = useSelector((state) => state.order);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (!orderInfo) return <Navigate to="/cart" replace />
  

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearOrderErrors());
    }
    if (success) {
      dispatch(clearCart());
      navigate("/order/success");
    }
  }, [dispatch, error, success, navigate]);

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load payment gateway. Check your internet.");
      return;
    }
  }
    const handleUPIPayment = async () => {
  const scriptLoaded = await loadRazorpayScript();
  if (!scriptLoaded) {
    toast.error("Failed to load payment gateway.");
    return;
  }
    try {
      // 1. Create Razorpay order on your backend
      const { data } = await axios.post(
        "/api/v1/payment/razorpay",
  { amount: orderInfo.totalPrice },
  { withCredentials: true }
);

      // 2. Open Razorpay checkout popup
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "BookStore",
        description: "Book Purchase",
        order_id: data.order.id,

        handler: async function (response) {
          // 3. Verify the payment on your backend
          try {
            const verifyRes = await axios.post(
              "/api/v1/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              // 4. Place the actual order in your DB
              const orderData = {
                shippingAddress: shippingInfo,
                orderItems: cartItems.map((item) => ({
                  name: item.name || item.title,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image?.[0]?.url,
                  product: item._id,
                })),
                itemPrice: orderInfo.subtotal,
                taxPrice: orderInfo.tax,
                shippingPrice: orderInfo.shippingCharges,
                totalPrice: orderInfo.totalPrice,
                paymentInfo: {
                  id: verifyRes.data.paymentId,
                  status: "Succeeded",
                },
              };
              dispatch(createOrder(orderData));
            }
          } catch (err) {
            toast.error("Payment verification failed. Contact support.");
          }
        },

        prefill: {
          name: shippingInfo.name || "",
          contact: shippingInfo.phoneNo || "",
        },
        theme: { color: "#2563EB" },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        toast.error("Payment failed: " + response.error.description);
      });

      rzp.open();

    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not initiate payment.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center border border-gray-100">
          <h2 className="text-2xl font-bold mb-2">Complete Your Payment</h2>
          <p className="text-gray-600 mb-6">
            Total Amount: <b>₹{orderInfo?.totalPrice}</b>
          </p>

          <button
            onClick={handleRazorpayPayment}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 mb-3"
          >
            {loading ? "Processing..." : "Pay with Razorpay"}
          </button>
          <button
            onClick={handleUPIPayment}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
         >
           {loading ? "Processing..." : "Pay via UPI"}
          </button>
       
        </div>
      </div>
      <Footer />
    </>
  );
};


export default Payment;