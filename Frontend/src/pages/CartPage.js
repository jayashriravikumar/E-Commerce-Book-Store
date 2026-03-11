import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getBookCoverUrl } from '../utils/imageService';
import { toast } from 'react-toastify';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, cartLoading, removeItem, addItem, clearAllItems, totalItems } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) {
      removeItem(item.id);
      return;
    }
    if (newQty > item.stock) {
      toast.warning(`Only ${item.stock} in stock.`);
      return;
    }
    addItem(item.book_id, newQty);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const subtotal = cartItems.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0);
  const shipping = subtotal > 25 ? 0 : 4.99;
  const grandTotal = subtotal + shipping;

  if (cartLoading) return <div className="loading-container"><div className="spinner" /></div>;

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart <span className="cart-count">({totalItems} items)</span></h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-cart-icon">??</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any books yet.</p>
            <Link to="/books" className="btn btn-primary">Browse Books</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-col">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <Link to={`/books/${item.book_id}`} className="cart-item-image">
                    <img
                      src={item.image_url || getBookCoverUrl({ title: item.title }, 'small').placeholder}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      width="80"
                      height="110"
                      onError={(e) => { 
                        const config = getBookCoverUrl({ title: item.title }, 'small');
                        e.target.src = e.target.src === item.image_url ? config.fallbacks[0] : config.placeholder;
                      }}
                    />
                  </Link>

                  <div className="cart-item-details">
                    <Link to={`/books/${item.book_id}`} className="cart-item-title">{item.title}</Link>
                    <p className="cart-item-author">by {item.author}</p>
                    <p className="cart-item-unit-price">₹{parseFloat(item.price).toLocaleString('en-IN')} each</p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => handleQuantityChange(item, -1)}>-</button>
                      <span className="qty-display">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => handleQuantityChange(item, 1)} disabled={item.quantity >= item.stock}>+</button>
                    </div>
                    <p className="cart-item-subtotal">₹{(parseFloat(item.price) * item.quantity).toLocaleString('en-IN')}</p>
                    <button className="remove-btn" onClick={() => removeItem(item.id)} title="Remove item">Remove</button>
                  </div>
                </div>
              ))}

              <button className="btn btn-ghost clear-cart-btn" onClick={clearAllItems}>
                Clear All Items
              </button>
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-success' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="free-shipping-hint">
                  Add ₹{(2000 - subtotal).toLocaleString('en-IN')} more for free shipping!
                </p>
              )}
              <div className="summary-divider" />
              <div className="summary-total">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <button
                className="btn btn-primary checkout-btn"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Continue to Checkout
              </button>

              <div className="secure-badge">Secure payment powered by Stripe</div>

              <Link to="/books" className="btn btn-ghost continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
