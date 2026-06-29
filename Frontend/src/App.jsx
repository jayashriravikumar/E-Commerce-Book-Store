import EditProduct from "./pages/EditProduct";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";

import Register from "./User/Register";
import Login from "./User/Login";
import Profile from "./User/Profile";
import UpdateProfile from "./User/UpdateProfile";
import UpdatePassword from "./User/UpdatePassword";
import VerifyOTP from "./User/VerifyOTP";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";

import Policies from "./pages/Policies";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";

import CreateProduct from "./pages/CreateProduct";
import ProductManagement from "./pages/ProductManagement";

import ConfirmOrder from "./pages/ConfirmOrder";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

import SystemMonitor from "./pages/SystemMonitor";
import Monitor from "./pages/Monitor";
import AdminAnalytics from "./pages/AdminAnalytics";

import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";

import CookieConsent from "./components/CookieConsent";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyOTP />} />

        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />

        <Route path="/policies" element={<Policies />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />

        <Route
          path="/admin/products"
          element={
            user && user.role === "admin" ? (
              <ProductManagement />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="/admin/product/new" element={<CreateProduct />} />
        <Route path="/admin/product/:id" element={<EditProduct />} />

        <Route path="/admin/analytics" element={<AdminAnalytics />} />

        <Route path="/system-monitor" element={<SystemMonitor />} />
        <Route path="/monitor" element={<Monitor />} />

        <Route path="/500" element={<ServerError />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <CookieConsent />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;