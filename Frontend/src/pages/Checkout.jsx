import { useContext, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { formatPrice } from "../utils/books";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const TOKEN_STORAGE_KEY = "bookstore-auth-token";
const TOKEN_SESSION_KEY = "bookstore-auth-session-token";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
  });

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cart]
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCheckoutData((current) => ({ ...current, [name]: value }));
  };

  const getAuthToken = () =>
    localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_SESSION_KEY) || "";

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    if (!cart.length) {
      setFeedback({ type: "error", message: "Your cart is empty. Add books before checking out." });
      return;
    }

    if (!checkoutData.fullName.trim() || !checkoutData.email.trim()) {
      setFeedback({ type: "error", message: "Please provide your name and email." });
      return;
    }

    if (!checkoutData.address.trim() || !checkoutData.city.trim() || !checkoutData.postalCode.trim()) {
      setFeedback({ type: "error", message: "Please provide a complete shipping address." });
      return;
    }

    const token = getAuthToken();

    if (!token) {
      setFeedback({
        type: "error",
        message: "Please login to place your order.",
      });
      navigate("/login", { state: { message: "Please login to place your order." } });
      return;
    }

    const payload = {
      customer: {
        name: checkoutData.fullName.trim(),
        email: checkoutData.email.trim().toLowerCase(),
      },
      orderItems: cart.map((item) => ({
        bookId: item._id,
        title: item.title,
        qty: item.quantity || 1,
        price: item.price,
      })),
      shippingAddress: {
        address: checkoutData.address.trim(),
        city: checkoutData.city.trim(),
        postalCode: checkoutData.postalCode.trim(),
      },
      payment: {
        method: "card",
        cardLast4: checkoutData.cardNumber.replace(/\s+/g, "").slice(-4),
      },
      totalPrice,
    };

    try {
      setIsSubmitting(true);

      const { data } = await axios.post(`${API_BASE_URL}/api/orders`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (!data?.success || !data?.order?._id) {
        throw new Error("Unexpected server response");
      }

      localStorage.setItem(
        "bookstore-last-order",
        JSON.stringify({
          orderId: data.order._id,
          totalPrice,
          placedAt: new Date().toISOString(),
        })
      );

      setFeedback({ type: "success", message: "Order placed successfully." });
      setCart([]);

      navigate(`/order-confirmation/${data.order._id}`, {
        state: {
          orderId: data.order._id,
          totalPrice,
          message: data?.message || "Order placed successfully",
        },
      });
    } catch (error) {
      const status = error?.response?.status;
      const backendMessage = error?.response?.data?.message;

      if (status === 401) {
        logout();
        setFeedback({
          type: "error",
          message: backendMessage || "Your session is invalid or expired. Please login again.",
        });
        navigate("/login", {
          state: {
            message: backendMessage || "Your session has expired. Please login again.",
          },
        });
        return;
      }

      setFeedback({
        type: "error",
        message:
          backendMessage ||
          "We could not place your order right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8 flex flex-wrap gap-3 items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Secure Checkout</h1>
            <p className="text-slate-600 mt-1">Complete your order in one final step.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8"
            onSubmit={handlePlaceOrder}
            noValidate
          >
            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      name="fullName"
                      value={checkoutData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full border p-3 rounded-lg border-slate-300"
                    />
                  </div>

                  <div>
                    <input
                      name="email"
                      value={checkoutData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full border p-3 rounded-lg border-slate-300"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <input
                      name="address"
                      value={checkoutData.address}
                      onChange={handleInputChange}
                      placeholder="Street Address"
                      className="w-full border p-3 rounded-lg border-slate-300"
                    />
                  </div>

                  <div>
                    <input
                      name="city"
                      value={checkoutData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full border p-3 rounded-lg border-slate-300"
                    />
                  </div>

                  <div>
                    <input
                      name="postalCode"
                      value={checkoutData.postalCode}
                      onChange={handleInputChange}
                      placeholder="ZIP Code"
                      className="w-full border p-3 rounded-lg border-slate-300"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Payment Details</h2>
                <div>
                  <input
                    name="cardNumber"
                    value={checkoutData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Card Number"
                    className="w-full border p-3 rounded-lg border-slate-300"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">Card is used for UI simulation only. No real charge is made.</p>
              </section>
            </div>

            {feedback.message && (
              <p
                className={`mt-6 rounded-lg px-3 py-2 text-sm ${
                  feedback.type === "error"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                {feedback.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="mt-6 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Placing Order..." : `Place Order • ${formatPrice(totalPrice)}`}
            </button>

            {cart.length === 0 && (
              <p className="mt-3 text-sm text-amber-700">
                Your cart is empty. Add books before placing an order.
              </p>
            )}
          </form>

          <aside className="bg-slate-900 text-slate-100 rounded-2xl p-6 h-fit lg:sticky lg:top-6">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            <p className="text-slate-300 text-sm mt-1">{totalItems} item(s) in your cart</p>

            <div className="mt-5 space-y-3 max-h-64 overflow-auto pr-1">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between gap-3 text-sm border-b border-slate-700 pb-2">
                  <div>
                    <p className="font-medium text-slate-100">{item.title}</p>
                    <p className="text-slate-400">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="text-slate-200">
                    {formatPrice((item.price || 0) * (item.quantity || 1))}
                  </p>
                </div>
              ))}
              {cart.length === 0 && <p className="text-slate-400 text-sm">No items yet.</p>}
            </div>

            <div className="mt-5 space-y-2 text-sm border-t border-slate-700 pt-4">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-white pt-1">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-300 border border-slate-700">
              Encrypted checkout simulation with authenticated order API submission.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}