import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";
import CookieConsent from "./components/CookieConsent";
import { useSelector } from "react-redux";
import FAQ from "./pages/FAQ";
import AdminFAQ from "./pages/AdminFAQ";
import Shipping from "./pages/Shipping";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

const Register = lazy(() => import("./User/Register"));
const Login = lazy(() => import("./User/Login"));
const VerifyOTP = lazy(() => import("./User/VerifyOTP"));
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

const ConfirmOrder = lazy(() => import("./pages/ConfirmOrder"));
const Payment = lazy(() => import("./pages/Payment"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));

const Support = lazy(() => import("./pages/Support"));
const YourMessages = lazy(() => import("./pages/YourMessages"));
const TicketDetails = lazy(() => import("./pages/TicketDetails"));

const CreateProduct = lazy(() => import("./pages/CreateProduct"));
const ProductManagement = lazy(() => import("./pages/ProductManagement"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const InventoryManagement = lazy(() => import("./pages/InventoryManagement"));

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminAnalytics = lazy(() => import("./pages/AdminAnalytics"));
const AdminTickets = lazy(() => import("./pages/AdminTickets"));
const OrderManagement = lazy(() => import("./pages/OrderManagement"));
const ProductReviews = lazy(() => import("./pages/ProductReviews"));
const ReviewManagement = lazy(() => import("./pages/ReviewManagement"));
const CouponManagement = lazy(() => import("./pages/CouponManagement"));
const SalesReport = lazy(() => import("./pages/SalesReport"));
const CustomerManagement = lazy(() => import("./pages/CustomerManagement"));

const BackupDashboard = lazy(() => import("./pages/BackupDashboard"));
const BackupRecovery = lazy(() => import("./pages/BackupRecovery"));

const ServerError = lazy(() => import("./pages/ServerError"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <Routes>

          {/* Public Routes */}

          {/* Home */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />

          {/* Products */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/:id/reviews" element={<ProductReviews />} />

          {/* User */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyOTP />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Orders */}
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          {/* Support */}
          <Route path="/support" element={<Support />} />
          <Route path="/your-messages" element={<YourMessages />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />

          {/* Policies */}
          <Route path="/policies" element={<Policies />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />

          {/* Error Pages */}
          <Route path="/500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/faqs" element={<FAQ />} />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true} element={<AdminDashboard />} />
            }
          />
          <Route
  path="/admin/faqs"
  element={
    <ProtectedRoute
      adminOnly={true}
      element={<AdminFAQ />}
    />
  }
/>

          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute adminOnly={true} element={<AdminAnalytics />} />
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly={true} element={<ProductManagement />} />
            }
          />

          <Route
            path="/admin/products/create"
            element={
              <ProtectedRoute adminOnly={true} element={<CreateProduct />} />
            }
          />

          <Route
            path="/admin/products/edit/:id"
            element={
              <ProtectedRoute adminOnly={true} element={<EditProduct />} />
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly={true} element={<OrderManagement />} />
            }
          />

          <Route
            path="/admin/inventory"
            element={
              <ProtectedRoute adminOnly={true} element={<InventoryManagement />} />
            }
          />

          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute adminOnly={true} element={<ReviewManagement />} />
            }
          />

          <Route
            path="/admin/tickets"
            element={
              <ProtectedRoute adminOnly={true} element={<AdminTickets />} />
            }
          />

          <Route
            path="/admin/coupons"
            element={
              <ProtectedRoute adminOnly={true} element={<CouponManagement />} />
            }
          />

          <Route
            path="/admin/sales"
            element={
              <ProtectedRoute adminOnly={true} element={<SalesReport />} />
            }
          />

          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute adminOnly={true} element={<CustomerManagement />} />
            }
          />

          {/* Backup & Recovery */}
          <Route
            path="/admin/backup"
            element={
              <ProtectedRoute adminOnly={true} element={<BackupDashboard />} />
            }
          />

          <Route
            path="/admin/backup/recover"
            element={
              <ProtectedRoute adminOnly={true} element={<BackupRecovery />} />
            }
          />

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