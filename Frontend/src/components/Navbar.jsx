import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/products/user/userSlice";
import { Heart } from "lucide-react";

const Navbar = () => {
  const { t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const profileRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    }

    setSearchQuery("");
  };

  //cart count
  // Cart Count
  const { cartItems } = useSelector((state) => state.cart);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    navigate("/");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <ShoppingBag />
          <span>BookStore</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 ml-8">
          <Link
            className="text-gray-700 hover:text-blue-600 font-semibold"
            to="/"
          >
            {t("Home")}
          </Link>

          <Link
            className="text-gray-700 hover:text-blue-600 font-semibold"
            to="/products"
          >
            {t("Products")}
          </Link>

          <Link
            className="text-gray-700 hover:text-blue-600 font-semibold whitespace-nowrap"
            to="/about-us"
          >
            {t("AboutUs")}
          </Link>

          <Link
            className="text-gray-700 hover:text-blue-600 font-semibold whitespace-nowrap"
            to="/contact-us"
          >
            {t("ContactUs")}
          </Link>

          <Link
           className="text-gray-700 hover:text-blue-600 font-semibold whitespace-nowrap"
            to="/policies"
           
          >
            {t("Policies")}
          </Link>

          {/* ✅ Unified Help */}
          <Link
            className="text-gray-700 hover:text-blue-600 font-semibold whitespace-nowrap"
            to="/support"
          >
            {t("Help & Customer Service")}
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4">
            {/* Cart */}
            {/* Wishlist */}
          </div>
          <div className="relative">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              defaultValue={localStorage.getItem("language") || "en"}
              className="
      appearance-none
      bg-gray-50
      border border-gray-200
      rounded-xl
      pl-4 pr-10 py-2
      text-sm
      font-medium
      text-gray-700
      hover:bg-white
      hover:border-blue-500
      focus:ring-2
      focus:ring-blue-500
      focus:outline-none
      transition-all
      cursor-pointer
    "
            >
              <option value="en">🇺🇸 English</option>
              <option value="te">🇮🇳 తెలుగు</option>
              <option value="hi">🇮🇳 हिन्दी</option>
              <option value="ta">🇮🇳 தமிழ்</option>
            </select>

            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </span>
          </div>
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center border border-slate-300 rounded overflow-hidden"
          >
            <input
              type="text"
              placeholder={t("searchProduct")}
              className="px-4 py-2 text-sm w-64 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              type="submit"
              className="px-3 text-gray-500 hover:text-blue-600 transition"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/wishlist">
            <Heart size={24} />
          </Link>

          {/* Authentication */}
          {isAuthenticated ? (
            <div ref={profileRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <User size={18} />
                {user?.name || "Profile"}
              </button>

             {profileOpen && (
  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">

    {/* User Info */}
    <div className="px-4 py-4 bg-gray-50 border-b">
      <p className="font-semibold text-gray-800">
        {user?.name || "User"}
      </p>

      <p className="text-sm text-gray-500 break-words">
        {user?.email}
      </p>
    </div>

    <Link
      to="/profile"
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      onClick={() => setProfileOpen(false)}
    >
      👤 My Profile
    </Link>

    <Link
      to="/orders"
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
      onClick={() => setProfileOpen(false)}
    >
      📦 My Orders
    </Link>

    {user?.role === "admin" && (
      <>
        <div className="border-t" />

        <Link
          to="/admin/products"
          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-blue-600"
          onClick={() => setProfileOpen(false)}
        >
          👑 Product Management
        </Link>

        <Link
          to="/admin/inventory"
          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-blue-600"
          onClick={() => setProfileOpen(false)}
        >
          📦 Inventory Management
        </Link>

        <Link
          to="/admin/analytics"
          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-blue-600"
          onClick={() => setProfileOpen(false)}
        >
          📊 Analytics
        </Link>
      </>
    )}

    <div className="border-t" />

    <button
      type="button"
      onClick={() => setShowLogoutModal(true)}
      className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600"
    >
      🚪 Logout
    </button>

  </div>
             )}
</div>
) : (
            <Link
              to="/register"
              className="hidden sm:flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <User size={18} />
              Register
            </Link>
          )}

          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="flex flex-col p-4 gap-4">
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 font-semibold"
            to="/"
          >
            {t("Home")}
          </Link>

          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 font-semibold"
            to="/products"
          >
            {t("Products")}
          </Link>

          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 font-semibold"
            to="/about-us"
          >
            {t("AboutUs")}
          </Link>

          {/* ✅ Unified Help */}
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 font-semibold"
            to="/support"
          >
            Help & Customer Service
          </Link>
        </div>
      </div>

      {showLogoutModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-3">Confirm Logout</h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100"
              >
                No
              </button>

              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
