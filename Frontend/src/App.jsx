import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import BookDetail from "./pages/BookDetail";

function App() {

  const [search, setSearch] = useState("");

  return (

    <BrowserRouter>

      <Navbar search={search} setSearch={setSearch} />

      <div className="page-container">

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

      </div>

      <Footer />

    </BrowserRouter>

  );

}

export default App;