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
import Wishlist from "./pages/Wishlist";
import Policies from "./pages/Policies";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import CookieConsent from "./components/CookieConsent";
import CreateProduct from "./pages/CreateProduct";
import ProductManagement from "./pages/ProductManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InventoryManagement from "./pages/InventoryManagement";
import VerifyOTP from './User/VerifyOTP';
import ProtectedRoute from "./components/ProtectedRoute";
import ConfirmOrder from "./pages/ConfirmOrder";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Support from "./pages/Support";
import YourMessages from "./pages/YourMessages";   
import TicketDetails from "./pages/TicketDetails";
import AdminTickets from "./pages/AdminTickets";
import OrderManagement from "./pages/OrderManagement";
import ProductReviews from "./pages/ProductReviews";
import ReviewManagement from "./pages/ReviewManagement";
import AdminDashboard from "./pages/AdminDashboard";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
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
        <Route
            path="/admin/reviews"
            element={<ReviewManagement />}
          />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      <CookieConsent />
    </BrowserRouter>
  );
};

export default App;
