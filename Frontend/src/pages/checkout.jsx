import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../features/cart/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  // Pre-fill state if they already entered it before
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [stateName, setStateName] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "India");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert("Phone Number should be 10 digits");
      return;
    }

    // Save to Redux and LocalStorage
    dispatch(
      saveShippingInfo({ address, city, state: stateName, country, pinCode, phoneNo })
    );

    // Move to the next step
    navigate("/order/confirm");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Shipping Details
        </h1>

        <form onSubmit={shippingSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
          
          <textarea
            placeholder="Complete Address (House No, Street, Area)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="State"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="number"
            placeholder="Pin Code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            required
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="number"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95"
          >
            Continue to Order Review
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;