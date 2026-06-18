import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discountAmount = (totalPrice * discount) / 100;
  const finalAmount = totalPrice - discountAmount;

  const applyCoupon = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/coupon/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: couponCode,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setDiscount(data.discount);
        alert(`Coupon Applied! ${data.discount}% OFF`);
      } else {
        alert("Invalid Coupon");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to apply coupon");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <h2 className="text-xl text-gray-600">
          Your Cart is Empty
        </h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border-b py-4"
            >
              <img
                src={item.image?.[0]?.url}
                alt={item.name || item.title}
                className="w-24 h-32 object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-lg">
                  {item.name || item.title}
                </h2>

                <p className="text-blue-600 font-bold">
                  ₹{item.price}
                </p>

                <p className="text-sm text-gray-600">
                  Subtotal: ₹{item.price * item.quantity}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch(decreaseQuantity(item._id))
                  }
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                >
                  -
                </button>

                <span className="font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    dispatch(increaseQuantity(item._id))
                  }
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                >
                  +
                </button>
              </div>

              <button
                onClick={() =>
                  dispatch(removeFromCart(item._id))
                }
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 border-t pt-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Order Summary
              </h2>

              <p className="mb-2">
                Total Books: {cartItems.length}
              </p>

              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) =>
                  setCouponCode(e.target.value)
                }
                className="w-full border p-2 rounded mb-2"
              />

              <button
                onClick={applyCoupon}
                className="w-full bg-green-600 text-white py-2 rounded mb-4"
              >
                Apply Coupon
              </button>

              <p>
                Original Amount: ₹
                {totalPrice.toFixed(2)}
              </p>

              <p>
                Discount: {discount}%
              </p>

              <p className="text-xl font-bold text-green-600 mt-2">
                Final Amount: ₹
                {finalAmount.toFixed(2)}
              </p>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => dispatch(clearCart())}
                className="w-full mt-2 bg-black text-white py-3 rounded hover:bg-gray-800"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;