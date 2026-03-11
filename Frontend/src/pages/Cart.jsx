import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {

  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (

    <div className="cart-page">

      <h1>Shopping Cart</h1>

      {cart.length === 0 && (
        <p className="empty-cart">Your cart is empty</p>
      )}

      {cart.map(item => (
        <div key={item._id} className="cart-item">

          <div>
            <h3>{item.title}</h3>
            <p>₹{item.price}</p>
          </div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>

        </div>
      ))}

      {cart.length > 0 && (
        <div className="cart-summary">

          <h2>Total: ₹{total}</h2>

          <Link to="/checkout">
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </Link>

        </div>
      )}

    </div>

  );

}

export default Cart;