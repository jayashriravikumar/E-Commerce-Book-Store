import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import BookImage from "../components/BookImage";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/books";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Cart() {
  const { cart, removeFromCart, updateQuantity, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch latest book data for cart items from backend
  useEffect(() => {
    const fetchCartBookData = async () => {
      if (cart.length === 0) return;

      setLoading(true);
      setError(null);

      try {
        const bookIds = cart.map((item) => item._id);

        const responses = await Promise.all(
          bookIds.map((id) =>
            axios.get(`${API_BASE_URL}/books/${id}`)
          )
        );

        const updatedCart = cart.map((item) => {
          const freshBook = responses.find(
            (res) => res.data._id === item._id
          )?.data;
          return freshBook ? { ...item, ...freshBook } : item;
        });

        setCart(updatedCart);
      } catch (err) {
        setError("Failed to fetch book details. Please try again.");
        console.error("Error fetching cart book data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartBookData();
  }, []); // Runs once on mount

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (loading) {
    return (
      <div className="cart-page">
        <p className="cart-loading">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div>
          <h1>Shopping Cart</h1>
          <p>Review your selected books and continue to buy them.</p>
        </div>
        <Link to="/books" className="cart-secondary-link">
          Continue Shopping
        </Link>
      </div>

      {error && <p className="cart-error">{error}</p>}

      {cart.length === 0 && (
        <p className="empty-cart">Your cart is empty</p>
      )}

      {cart.length > 0 && (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image-wrap">
                  <BookImage
                    book={item}
                    alt={item.title}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="cart-item-author">{item.author}</p>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>

                  <div className="cart-item-actions">
                    <label className="cart-qty">
                      <span>Qty</span>
                      <select
                        value={item.quantity || 1}
                        onChange={(e) =>
                          updateQuantity(item._id, Number(e.target.value))
                        }
                      >
                        {[1, 2, 3, 4, 5].map((qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>
                    </label>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  <span>Subtotal</span>
                  <strong>
                    {formatPrice(item.price * (item.quantity || 1))}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary-card">
            <h2>Order Summary</h2>
            <p className="cart-summary-line">
              <span>Items</span>
              <span>{totalItems}</span>
            </p>
            <p className="cart-summary-line">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </p>

            <Link to="/checkout" className="cart-summary-link">
              <button className="checkout-btn">Buy Now</button>
            </Link>

            <Link to="/books" className="cart-summary-link">
              <button className="cart-summary-secondary">Add More Books</button>
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;