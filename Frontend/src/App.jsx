import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import BookDetail from "./pages/BookDetail";

function AppLayout() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app-shell">
      <Navbar search={search} setSearch={setSearch} />

      <main className={isLoginPage ? "page-container login-page-layout" : "page-container"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/books"
            element={<Books search={search} />}
          />
          <Route
            path="/books/:id"
            element={<BookDetail />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
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
