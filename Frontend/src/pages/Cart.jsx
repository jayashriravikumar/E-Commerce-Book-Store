import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  saveForLater,
   moveToCart,
   removeSavedItem
} from "../features/cart/cartSlice";

const Cart = () => {
  const { cartItems, savedItems } = useSelector(
  (state) => state.cart
);

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
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 py-8">
     <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
  <h1 className="text-4xl font-bold text-gray-900">
    Shopping Cart
  </h1>

  <p className="mt-2 text-gray-500">
    Manage your selected books
  </p>
</div>
      

      {cartItems.length === 0 ? (
        <h2 className="text-xl text-gray-600">
          Your Cart is Empty
        </h2>
      ) : (
        <>
        <div className="grid lg:grid-cols-3 gap-8">
        
       
<div className="lg:col-span-2">
  {cartItems.map((item) => (
    <div
      key={item._id}
   className="
bg-white
border
rounded-xl
p-4
mb-4
flex
items-center
gap-4
shadow-sm
hover:shadow-lg
transition-all
duration-300
"
    >
      <img
        src={item.image?.[0]?.url}
        alt={item.name || item.title}
        className="w-28 h-40 object-contain bg-gray-50 rounded-xl p-2"
      />

     <div className="flex-1">

  <div className="flex justify-between items-start">

    <div>
      <h2 className="font-semibold text-lg">
        {item.name || item.title || "Book Title"}
      </h2>

      <p className="text-gray-500 text-sm">
        by {item.author || "Unknown Author"}
      </p>
    </div>

    <div className="flex items-center border rounded-lg overflow-hidden">
      <button
        onClick={() => dispatch(decreaseQuantity(item._id))}
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
      >
        -
      </button>

      <span className="px-4 font-semibold">
        {item.quantity}
      </span>

      <button
        onClick={() => dispatch(increaseQuantity(item._id))}
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
      >
        +
      </button>
    </div>

  </div>

  <div className="flex justify-between items-center mt-3">

    <div>
      <p className="text-orange-600 font-bold text-xl">
        ₹{item.price}
      </p>

      <p className="text-sm text-green-600">
        {item.stock} items available
      </p>
    </div>

    <div className="flex items-center gap-2">

  <button
    onClick={() => dispatch(saveForLater(item._id))}
   className="
px-4 py-2
bg-blue-600
text-white
rounded-lg
hover:bg-blue-700
transition
"
  >
    Save For Later
  </button>

  <button
    onClick={() => dispatch(removeFromCart(item._id))}
   className="
px-4 py-2
bg-red-600
text-white
rounded-lg
hover:bg-red-700
transition
"
  >
    Remove
  </button>

</div>

  </div>

</div>
    </div>
  ))}
</div>

<div className="lg:col-span-1">
 <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sticky top-24">

    <p className="text-sm text-gray-500 mb-4">
  Free delivery on eligible orders
</p>
<p className="text-green-600 text-sm font-medium mb-3">
✓ Secure Checkout
</p>

<p className="text-green-600 text-sm font-medium mb-4">
✓ Free Delivery
</p>

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
      onChange={(e) => setCouponCode(e.target.value)}
      className="w-full border p-2 rounded mb-2"
    />

    <button
      onClick={applyCoupon}
      className="w-full bg-green-600 text-white py-2 rounded mb-4"
    >
      Apply Coupon
    </button>

    <div className="space-y-3 mb-5">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{totalPrice.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>Discount</span>
        <span className="text-green-600">
          {discount}%
        </span>
      </div>

      <div className="flex justify-between">
        <span>Shipping</span>
        <span className="text-green-600">
          FREE
        </span>
      </div>

      <hr />

      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span className="text-blue-600">
          ₹{finalAmount.toFixed(2)}
        </span>
      </div>
    
</div>
    <button
      onClick={() => navigate("/order/confirm")}
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

   

  </div>


{savedItems.length > 0 && (

 <div className="mt-8">
<div className="bg-white rounded-xl border p-5 mb-4">
  <div className="flex justify-between items-center">

    <h2 className="text-2xl font-bold text-gray-900">
      Saved For Later
    </h2>

    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
      {savedItems.length} Books
    </span>

  </div>
</div>

    {savedItems.map((item) => (
     <div
  key={item._id}
  className="
  bg-white
  border
  rounded-xl
  p-4
  mb-4
  flex
  items-center
  gap-5
  shadow-sm
  hover:shadow-md
  transition
  "

>
       <img
  src={item.image?.[0]?.url}
  alt={item.name}
  className="
w-28
h-40
object-contain
bg-gray-50
rounded-lg
p-2
"
/>
<div className="flex-1 flex justify-between items-center">

        
  <div>
  <h3 className="font-semibold text-lg">
  {item.name || item.title || "Book Title"}
</h3>
  <p className="text-gray-500 text-sm">
    by {item.author || "Unknown"}
  </p>

  <p className="text-orange-600 text-xl font-bold mt-2">
    ₹{item.price}
  </p>
</div>
  <div className="flex gap-3">
  <button
    onClick={() => dispatch(moveToCart(item._id))}
 className="
bg-blue-500
hover:bg-blue-600
text-white
px-4
py-2
rounded-lg
font-medium
transition
"
  >
    Move To Cart
  </button>

  <button
    onClick={() => dispatch(removeSavedItem(item._id))}
  className="
bg-red-600
hover:bg-red-700
text-white
px-4
py-2
rounded-lg
font-medium
transition
"
  >
    Remove
  </button>
</div>
</div>
      </div>
    ))}
  </div>
)}
</>
        
      )}
    </div>
  </div>
  );
};

export default Cart;