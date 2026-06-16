import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetail from "./pages/BookDetail";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";

function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-shell">
      <Navbar />

      <main className={isAuthPage ? "page-container login-page-layout" : "page-container"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/books"
            element={<Books />}
          />
          <Route
            path="/books/:id"
            element={<BookDetail />}
          />
          <Route
            path="/book"
            element={<BookDetail />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;