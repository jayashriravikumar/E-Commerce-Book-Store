import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { getUniqueBooks } from "../utils/books";

const CART_STORAGE_KEY = "bookstore-cart";

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    try {
      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
      return [];
    }
  });
  const [books, setBooks] = useState([]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(getUniqueBooks(Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  }, []);

  const addToCart = (book) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item._id === book._id);

      if (existingItem) {
        return currentCart.map((item) =>
          item._id === book._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...currentCart, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, qty) => {
    const nextQty = Math.max(1, Number(qty) || 1);

    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === id
          ? { ...item, quantity: nextQty }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        books,
        fetchBooks,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
