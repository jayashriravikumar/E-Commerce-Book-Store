import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  // 1. Calculate Prices
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const couponInfo = JSON.parse(
  sessionStorage.getItem("couponInfo")
);

const discount = couponInfo?.discount || 0;
const discountAmount = couponInfo?.discountAmount || 0;

const discountedSubtotal = subtotal - discountAmount;

  // Apply your official Shipping Policy rules
  const shippingCharges =
  discountedSubtotal > 999 ? 0 : 49;
  
  // Standard 5% GST for books
  const tax = Math.round(discountedSubtotal * 0.05);
  
  const totalPrice = discountedSubtotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
  subtotal: discountedSubtotal,
  discount,
  discountAmount,
  shippingCharges,
  tax,
  totalPrice,
};
    // Save the final calculated math to sessionStorage so the Payment gateway can access it
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
    // Redirect to the upcoming payment page
    navigate("/payment");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-3 md:px-4 pt-6">

  <div className="flex justify-center items-center gap-2 mb-6">

    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
      ✓
    </div>

    <div className="w-12 h-1 bg-green-600"></div>

    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
      2
    </div>

    <div className="w-12 h-1 bg-gray-300"></div>

    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold">
      3
    </div>

  </div>

</div>
      <div className="max-w-6xl mx-auto px-3 md:px-4 py-6 md:py-10 min-h-screen">
       <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800"></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
          {/* Left Column: Shipping & Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Shipping Info Box */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Shipping Details</h2>
              <div className="space-y-2 text-gray-700">
                <p><b>Name:</b> {user?.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                <p><b>Address:</b> {address}</p>
              </div>
            </div>

            {/* Cart Items Box */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Your Cart Items</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
  key={item._id}
  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
>
                    <div className="flex items-center gap-3">
                      <img src={item.image?.[0]?.url} alt="book" className="w-14 h-18 md:w-16 md:h-20 object-cover rounded-lg" />
                      <Link to={`/product/${item._id}`} className="text-blue-600 font-semibold hover:underline">
                        {item.name || item.title}
                      </Link>
                    </div>
                    <p className="font-medium text-gray-700 text-sm md:text-base">
                      {item.quantity} x ₹{item.price} = 
                      <span className="font-bold ml-1">₹{item.quantity * item.price}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Math */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-24">
            <h2 className="text-xl font-bold mb-6 text-center border-b pb-4">Order Summary</h2>
            <div className="space-y-4 text-gray-700 border-b pb-4 mb-4">

                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Coupon ({discount}%):</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Estimate:</span>
                  <span className="font-medium">
                    ₹{shippingCharges}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span className="font-medium">
                    ₹{tax}
                  </span>
                </div>

              </div>
         
            <div className="flex justify-between text-xl font-bold text-gray-900 mb-8">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={proceedToPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 rounded-xl transition-all shadow-md active:scale-95"
            >
              Proceed to Payment
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmOrder;