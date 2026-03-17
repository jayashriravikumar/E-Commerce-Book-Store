import { useContext } from "react";
import { Link } from "react-router-dom";

import BookImage from "../components/BookImage";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/books";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

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
                        onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
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
                  <strong>{formatPrice(item.price * (item.quantity || 1))}</strong>
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
              <button className="checkout-btn">
                Buy Now
              </button>
            </Link>

            <Link to="/books" className="cart-summary-link">
              <button className="cart-summary-secondary">
                Add More Books
              </button>
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;
