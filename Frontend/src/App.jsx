import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import CookieConsent from "./components/CookieConsent";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Products = lazy(() => import("./pages/Products"));
const Register = lazy(() => import("./User/Register"));
const Login = lazy(() => import("./User/Login"));
const Profile = lazy(() => import("./User/Profile"));
const UpdateProfile = lazy(() => import("./User/UpdateProfile"));
const UpdatePassword = lazy(() => import("./User/UpdatePassword"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Policies = lazy(() => import("./pages/Policies"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const CreateProduct = lazy(() => import("./pages/CreateProduct"));
const ProductManagement = lazy(() => import("./pages/ProductManagement"));
const InventoryManagement = lazy(() => import("./pages/InventoryManagement"));
const VerifyOTP = lazy(() => import("./User/VerifyOTP"));
const ForgotPassword = lazy(() => import("./User/ForgotPassword"));
const ResetPassword = lazy(() => import("./User/ResetPassword"));
const ConfirmOrder = lazy(() => import("./pages/ConfirmOrder"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Checkout = lazy(() => import("./pages/Checkout"));
const PaymentFailure = lazy(() => import("./pages/PaymentFailure"));
const Payment = lazy(() => import("./pages/Payment"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Support = lazy(() => import("./pages/Support"));
const YourMessages = lazy(() => import("./pages/YourMessages"));
const TicketDetails = lazy(() => import("./pages/TicketDetails"));
const AdminTickets = lazy(() => import("./pages/AdminTickets"));
const OrderManagement = lazy(() => import("./pages/OrderManagement"));
const ProductReviews = lazy(() => import("./pages/ProductReviews"));
const ReviewManagement = lazy(() => import("./pages/ReviewManagement"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const CouponManagement = lazy(() => import("./pages/CouponManagement"));
const SalesReport = lazy(() => import("./pages/SalesReport"));
const AdminAnalytics = lazy(() => import("./pages/AdminAnalytics"));
const CustomerManagement = lazy(() => import("./pages/CustomerManagement"));



const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-lg font-semibold animate-pulse">
              Loading...
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forget" element={<ForgotPassword />} />
          <Route
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/failure" element={<PaymentFailure />} />
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
          <Route path="/admin/orders" element={<OrderManagement />} />

       <Route
          path="/admin/inventory"
          element={
            <ProtectedRoute
              adminOnly={true}
              element={<InventoryManagement />}
            />
          }
        />
        
          <Route path="/verify-email" element={<VerifyOTP />} />
          <Route path="/product/:id/reviews" element={<ProductReviews />} />
          <Route path="/admin/reviews" element={<ReviewManagement />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/coupons" element={<CouponManagement />} />
          <Route path="/admin/sales" element={<SalesReport />} />
          <Route path="/admin/customers" element={<CustomerManagement />} />
        </Routes>
      </Suspense>

      <CookieConsent />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;
