import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext } from "./CartContext";
import { getUniqueBooks } from "../utils/books";

const CART_STORAGE_KEY = "bookstore-cart";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

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
  const [booksLoading, setBooksLoading] = useState(false);
  const [booksError, setBooksError] = useState("");

  const booksById = useMemo(
    () => new Map((Array.isArray(books) ? books : []).map((book) => [book._id, book])),
    [books]
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const fetchBooks = useCallback(async () => {
    setBooksLoading(true);
    setBooksError("");

    try {
      const response = await axios.get(`${API_BASE_URL}/api/books`);
      setBooks(getUniqueBooks(Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
      setBooksError(
        error?.response?.data?.message ||
        "Unable to load books right now. Please try again in a moment."
      );
    } finally {
      setBooksLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    if (!books.length) {
      return;
    }

    // Keep cart details in sync with latest backend book data while preserving quantities.
    setCart((currentCart) =>
      currentCart.map((item) => {
        const latestBook = booksById.get(item._id);

        if (!latestBook) {
          return item;
        }

        return {
          ...latestBook,
          quantity: item.quantity || 1,
        };
      })
    );
  }, [books, booksById]);

  const addToCart = (book) => {
    const resolvedBook = booksById.get(book?._id) || book;

    if (!resolvedBook?._id) {
      return;
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item._id === resolvedBook._id);

      if (existingItem) {
        return currentCart.map((item) =>
          item._id === resolvedBook._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...currentCart, { ...resolvedBook, quantity: 1 }];
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
        booksLoading,
        booksError,
        fetchBooks,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
