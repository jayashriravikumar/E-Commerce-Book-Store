import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function BookCard({ book }) {

  const { addToCart } = useContext(CartContext);

  return (

    <div className="book-card">

      <Link
        to={`/books/${book._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >

        <img
          src={book.coverImage || "https://via.placeholder.com/200"}
          alt={book.title}
          className="book-img"
        />

        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>₹{book.price}</p>

      </Link>

      <button
        className="cart-btn"
        onClick={() => addToCart(book)}
      >
        Add to Cart
      </button>

    </div>

  );

}

export default BookCard;