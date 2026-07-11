import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { saveShippingInfo } from "../features/cart/cartSlice";


const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );

    navigate("/order/confirm");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto py-6 md:py-10 px-3 md:px-4 min-h-screen">
       <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8">

  {/* Checkout Progress */}
  <div className="flex justify-center items-center gap-2 mb-6">

    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
      1
    </div>

    <div className="w-12 h-1 bg-blue-600"></div>

    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold">
      2
    </div>

    <div className="w-12 h-1 bg-gray-200"></div>

    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold">
      3
    </div>

  </div>

  <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
    Shipping Details
  </h1>

  <form onSubmit={submitHandler} className="space-y-5">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <input
    type="text"
    placeholder="City"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    type="text"
    placeholder="State"
    value={state}
    onChange={(e) => setState(e.target.value)}
    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <input
    type="text"
    placeholder="Country"
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    type="text"
    placeholder="Pincode"
    value={pinCode}
    onChange={(e) => setPinCode(e.target.value)}
    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

</div>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
             className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition"
            >
              Continue
            </button>

          </form>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shipping;