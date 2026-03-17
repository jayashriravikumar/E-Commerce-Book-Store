import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

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

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

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
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
