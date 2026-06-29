import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Register from "./User/Register";
import Login from "./User/Login";
import Profile from "./User/Profile";
import UpdateProfile from "./User/UpdateProfile";
import UpdatePassword from "./User/UpdatePassword";


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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InventoryManagement from "./pages/InventoryManagement";

import ProtectedRoute from "./components/ProtectedRoute";
import VerifyOTP from "./User/VerifyOTP";
import ConfirmOrder from "./pages/ConfirmOrder";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Support from "./pages/Support";
import YourMessages from "./pages/YourMessages";   
import TicketDetails from "./pages/TicketDetails";
import AdminTickets from "./pages/AdminTickets";
import AdminAnalytics from "./pages/AdminAnalytics";

import CookieConsent from "./components/CookieConsent";
import { useSelector } from "react-redux";





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
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      
        <Route path="/support" element={<Support />} />
        <Route path="/your-messages" element={<YourMessages />} />   
        <Route path="/ticket/:id" element={<TicketDetails />} />
        <Route path="/admin/tickets" element={<AdminTickets />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route
          path="/admin/inventory"
          element={
            user && user.role === "admin" ? (
              <InventoryManagement />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/verify-email" element={<VerifyOTP />} />
      </Routes>

      <CookieConsent />
    </BrowserRouter>
  );
};

export default App;
