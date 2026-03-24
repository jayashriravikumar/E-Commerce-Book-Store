import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home cart={cart} setCart={setCart} />}
        />

        <Route
          path="/book"
          element={<BookDetail />}
        />

        <Route
          path="/cart"
          element={<Cart cart={cart} />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;