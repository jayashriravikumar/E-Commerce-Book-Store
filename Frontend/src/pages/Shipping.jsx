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

      <div className="max-w-3xl mx-auto py-10 px-4 min-h-screen">
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-8 text-center">
            Shipping Details
          </h1>

          <form onSubmit={submitHandler} className="space-y-5">

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="text"
              placeholder="Pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
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