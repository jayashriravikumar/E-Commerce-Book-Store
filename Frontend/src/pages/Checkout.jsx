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
  const { cart, clearCart } = useContext(CartContext);
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

  const inputClassName =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

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

    const orderItems = cart
      .map((item) => ({
        bookId: item?._id || item?.bookId,
        qty: Number(item?.quantity) || 1,
        price: Number(item?.price) || 0,
      }))
      .filter((item) => item.bookId && item.qty > 0 && item.price >= 0);

    if (!orderItems.length || orderItems.length !== cart.length) {
      setFeedback({
        type: "error",
        message: "Some cart items are invalid. Please refresh your cart and try again.",
      });
      return;
    }

    const shippingAddress = {
      address: checkoutData.address.trim(),
      city: checkoutData.city.trim(),
      postalCode: checkoutData.postalCode.trim(),
    };

    const payload = {
      orderItems,
      shippingAddress,
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
      clearCart();

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e0f2fe_0%,_#f8fafc_45%,_#ecfeff_100%)] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 lg:mb-10">
          <p className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-800">
            Final step
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Review your information, confirm your shipping details, and place your order securely.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.85fr] lg:gap-8">
          <form
            className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-[0_20px_60px_-40px_rgba(2,132,199,0.65)] backdrop-blur-sm sm:p-8 lg:p-10"
            onSubmit={handlePlaceOrder}
            noValidate
          >
            <div className="space-y-8">
              <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-slate-900">Contact Information</h2>
                <p className="mt-1 text-sm text-slate-500">We will send your order confirmation to this email.</p>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Full name
                    <input
                      name="fullName"
                      value={checkoutData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={inputClassName}
                    />
                  </label>

                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Email address
                    <input
                      name="email"
                      value={checkoutData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className={inputClassName}
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-slate-900">Shipping Address</h2>
                <p className="mt-1 text-sm text-slate-500">Use the address where you want to receive your books.</p>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                    Street address
                    <input
                      name="address"
                      value={checkoutData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St"
                      className={inputClassName}
                    />
                  </label>

                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    City
                    <input
                      name="city"
                      value={checkoutData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className={inputClassName}
                    />
                  </label>

                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    ZIP / Postal code
                    <input
                      name="postalCode"
                      value={checkoutData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Postal code"
                      className={inputClassName}
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-slate-900">Payment Details</h2>
                <p className="mt-1 text-sm text-slate-500">Used only for checkout simulation in this project.</p>
                <div className="mt-5">
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Card number
                    <input
                      name="cardNumber"
                      value={checkoutData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className={inputClassName}
                    />
                  </label>
                </div>
              </section>
            </div>

            {feedback.message && (
              <p
                className={`mt-6 rounded-xl border px-4 py-3 text-sm font-medium ${
                  feedback.type === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {feedback.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="mt-6 w-full rounded-xl bg-cyan-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-700/25 transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Placing Order..." : `Place Order • ${formatPrice(totalPrice)}`}
            </button>

            {cart.length === 0 && (
              <p className="mt-3 text-sm text-amber-700">
                Your cart is empty. Add books before placing an order.
              </p>
            )}
          </form>

          <aside className="h-fit rounded-3xl border border-cyan-900/20 bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 p-6 text-slate-100 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.95)] lg:sticky lg:top-6 sm:p-7">
            <h3 className="text-xl font-semibold tracking-tight">Order Summary</h3>
            <p className="mt-1 text-sm text-cyan-100/80">{totalItems} item(s) in your cart</p>

            <div className="mt-5 space-y-3 max-h-72 overflow-auto pr-1">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between gap-3 rounded-xl border border-cyan-900/40 bg-white/5 p-3 text-sm">
                  <div>
                    <p className="font-medium text-slate-100">{item.title}</p>
                    <p className="text-cyan-100/70">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="font-medium text-slate-200">
                    {formatPrice((item.price || 0) * (item.quantity || 1))}
                  </p>
                </div>
              ))}
              {cart.length === 0 && <p className="text-sm text-cyan-100/70">No items yet.</p>}
            </div>

            <div className="mt-6 space-y-3 rounded-2xl border border-cyan-900/40 bg-white/5 p-4 text-sm">
              <div className="flex justify-between text-cyan-100/90">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-cyan-100/90">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t border-cyan-900/50 pt-3 text-base font-semibold text-white">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-cyan-800/50 bg-cyan-900/30 px-4 py-3 text-xs text-cyan-100/90">
              Secure checkout with authenticated API order placement.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}