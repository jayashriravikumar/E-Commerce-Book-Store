import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add book to cart
  const addToCart = (book) => {

    const exists = cart.find(item => item._id === book._id);

    if (exists) {
      return; // prevent duplicate items
    }

    setCart([...cart, book]);
  };

  // Remove book
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  // Clear cart (useful after checkout)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}