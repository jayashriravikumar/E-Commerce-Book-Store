import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

import BookImage from "./BookImage";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/books";

function BookCard({ book }) {
  const { addToCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);
  const resetTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleAddToCart = () => {
    addToCart(book);
    setIsAdded(true);

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

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
        className={`cart-btn ${isAdded ? "cart-btn-added" : ""}`}
        onClick={handleAddToCart}
      >
        {isAdded ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

export default BookCard;
