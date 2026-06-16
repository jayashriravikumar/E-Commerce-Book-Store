import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

import BookImage from "./BookImage";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/books";

function RatingStars({ value = 0, size = 14 }) {
  const full = Math.floor(Number(value) || 0);
  const half = (Number(value) - full) >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  const Star = ({ type }) => {
    const color = type === 'full' || type === 'half' ? '#F59E0B' : '#E5E7EB';
    if (type === 'half') {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-0.5">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#E5E7EB" />
            </linearGradient>
          </defs>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#halfGrad)" />
        </svg>
      );
    }

    return (
      <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-0.5">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={color} />
      </svg>
    );
  };

  return (
    <div className="rating-stars" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} type="full" />
      ))}
      {half === 1 && <Star key={`h`} type="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} type="empty" />
      ))}
    </div>
  );
}

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
        <div className="flex items-center gap-2 mt-1">
          <RatingStars value={book.ratings} size={14} />
          <span className="text-sm text-gray-500">{book.ratings ? book.ratings.toFixed(1) : "-"}</span>
        </div>
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
