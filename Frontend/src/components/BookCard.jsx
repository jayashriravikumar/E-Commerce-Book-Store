import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function BookCard({ id, title, price }) {

  const { addToCart } = useContext(CartContext);

  const book = { id, title, price };

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      borderRadius: "8px",
      width: "200px"
    }}>
      <h3>{title}</h3>
      <p>Price: ₹{price}</p>

      <button onClick={() => addToCart(book)}>
        Add to Cart
      </button>
    </div>
  );
}

export default BookCard;