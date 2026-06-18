import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems } = useSelector(
    (state) => state.cart
  );

  const [shipping, setShipping] = useState({
    fullName: "",
    phoneNo: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = 50;
  const totalPrice = itemsPrice + shippingPrice;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !shipping.fullName ||
      !shipping.phoneNo ||
      !shipping.address ||
      !shipping.city ||
      !shipping.state ||
      !shipping.pinCode
    ) {
      alert("Please fill all fields");
      return;
    }

    const orderData = {
      shippingAddress: {
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        country: "India",
        pinCode: shipping.pinCode,
        phoneNo: shipping.phoneNo,
      },

      orderItems: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image?.[0]?.url || "",
        product: item._id,
      })),

      paymentInfo: {
        id: "COD",
        status: "Pending",
      },

      itemPrice: itemsPrice,
      taxPrice: 0,
      shippingPrice,
      totalPrice,
    };

    try {
      const { data } = await axios.post(
        "/api/v1/order/new",
        orderData,
        {
          withCredentials: true,
        }
      );

      console.log(data);

      alert("Order Created Successfully");

      navigate("/");
    } catch (error) {
  console.log("FULL ERROR:", error);

  console.log("RESPONSE:", error.response);

  console.log("DATA:", error.response?.data);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Order Failed"
  );
}
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <form
          className="md:col-span-2 space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={shipping.fullName}
            onChange={(e) =>
              setShipping({
                ...shipping,
                fullName: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={shipping.phoneNo}
            onChange={(e) =>
              setShipping({
                ...shipping,
                phoneNo: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <textarea
            placeholder="Address"
            value={shipping.address}
            onChange={(e) =>
              setShipping({
                ...shipping,
                address: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="City"
            value={shipping.city}
            onChange={(e) =>
              setShipping({
                ...shipping,
                city: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="State"
            value={shipping.state}
            onChange={(e) =>
              setShipping({
                ...shipping,
                state: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Pincode"
            value={shipping.pinCode}
            onChange={(e) =>
              setShipping({
                ...shipping,
                pinCode: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Place Order
          </button>
        </form>

        <div className="bg-white border p-5 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between mb-2"
            >
              <span>
                {item.name} x {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{itemsPrice}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shippingPrice}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-3">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;