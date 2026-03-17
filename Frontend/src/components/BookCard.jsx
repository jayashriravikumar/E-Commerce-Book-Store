import { Link } from "react-router-dom";
import { useContext } from "react";

import BookImage from "./BookImage";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/books";

function BookCard({ book }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="book-card">
      <Link
        to={`/books/${book._id}`}
        className="book-card-link"
      >
        <BookImage
          book={book}
          alt={book.title}
          className="book-img"
        />

        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p className="book-card-price">{formatPrice(book.price)}</p>
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
