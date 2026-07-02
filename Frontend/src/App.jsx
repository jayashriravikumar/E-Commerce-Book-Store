import { BrowserRouter, Routes, Route } from 
'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Products from './pages/Products';
import Register from './User/Register';
import Login from './User/Login';
import Profile from './User/Profile';
import UpdateProfile from './User/UpdateProfile';
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Policies from "./pages/Policies";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import CookieConsent from "./components/CookieConsent";
import ProtectedRoute from './components/ProtectedRoute';
import BackupRecovery from "./pages/BackupRecovery";
import BackupDashboard from "./pages/BackupDashboard";
import AdminLayout from "./components/AdminLayout";
import AdminProducts from "./pages/admin/AdminProducts";
import EditProduct from "./pages/admin/EditProduct";
import AddProduct from "./pages/admin/AddProduct";




const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="/profile/update" element={<UpdateProfile />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/wishlist" element={<Wishlist />} />
         <Route path="/policies" element={<Policies />} />
         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/admin" element={<AdminLayout />}>

  <Route
    path="dashboard"
    element={<BackupDashboard />}
  />

  <Route
    path="backup"
    element={<BackupRecovery />}
  />

  <Route
    path="products"
    element={<AdminProducts />}
  />

  <Route
    path="add-product"
    element={<AddProduct />}
  />

  <Route
    path="edit-product/:id"
    element={<EditProduct />}
  />

</Route>

</Routes>
 
                <CookieConsent />
              </BrowserRouter>
              
            );
          };

export default App;
