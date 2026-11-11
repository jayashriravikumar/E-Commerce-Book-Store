import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../features/cart/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    fullName: "",
    phoneNo: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
  });
  const handleChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({
        fullName: shippingData.fullName,
        address: shippingData.address,
        city: shippingData.city,
        state: shippingData.state,
        country: shippingData.country,
        pinCode: shippingData.pinCode,
        phoneNo: shippingData.phoneNo,
      }),
    );

    navigate("/order/confirm");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={shippingData.fullName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="phoneNo"
            placeholder="Phone Number"
            value={shippingData.phoneNo}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={shippingData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          ></textarea>

          <input
            type="text"
            name="city"
            value={shippingData.city}
            onChange={(e) => {
              console.log(e.target.value);
              setShippingData({
                ...shippingData,
                city: e.target.value,
              });
            }}
            className="w-full border p-3 rounded"
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shippingData.state}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingData.country}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="pinCode"
            placeholder="Pincode"
            value={shippingData.pinCode}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Continue
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
