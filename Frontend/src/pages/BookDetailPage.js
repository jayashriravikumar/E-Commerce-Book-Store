import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBookById } from '../services/bookService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getBookCoverUrl } from '../utils/imageService';
import { toast } from 'react-toastify';
import './BookDetailPage.css';

const StarRating = ({ rating }) => {
  const stars = Math.round(rating);
  return <span className="stars">{('★').repeat(stars)}{('☆').repeat(5 - stars)}</span>;
};

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getBookById(id)
      .then(data => setBook(data.book))
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart.');
      navigate('/login');
      return;
    }
    setAddingToCart(true);
    await addItem(book.id, quantity);
    setAddingToCart(false);
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.info('Please login to purchase.');
      navigate('/login');
      return;
    }
    setAddingToCart(true);
    const success = await addItem(book.id, quantity);
    setAddingToCart(false);
    if (success) navigate('/cart');
  };

  const handleImageError = (e) => {
    const imageConfig = getBookCoverUrl(book, 'large');
    if (fallbackIndex < imageConfig.fallbacks.length) {
      e.target.src = imageConfig.fallbacks[fallbackIndex];
      setFallbackIndex(fallbackIndex + 1);
    } else {
      e.target.src = imageConfig.placeholder;
    }
  };

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;
  if (!book) return (
    <div className="not-found">
      <p>📭 Book not found.</p>
      <Link to="/books" className="btn btn-primary">Back to Books</Link>
    </div>
  );

  const stockStatus = book.stock === 0 ? 'out' : book.stock < 5 ? 'low' : 'in';
  const imageConfig = getBookCoverUrl(book, 'large');

  return (
    <div className="book-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/books">Books</Link>
          <span>/</span>
          <span>{book.category}</span>
          <span>/</span>
          <span className="breadcrumb-current">{book.title}</span>
        </nav>

        <div className="book-detail-grid">
          {/* Left: Image */}
          <div className="book-detail-image-col">
            <div className="book-detail-image-wrap">
              <img
                src={imageConfig.primary}
                alt={book.title}
                className="book-detail-image"
                loading="lazy"
                decoding="async"
                width={imageConfig.width}
                height={imageConfig.height}
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="book-detail-info">
            <span className="badge badge-primary book-detail-category">{book.category}</span>
            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">by <strong>{book.author}</strong></p>

            {book.rating > 0 && (
              <div className="book-detail-rating">
                <StarRating rating={book.rating} />
                <span className="rating-value">{book.rating}</span>
                <span className="rating-count">({book.review_count?.toLocaleString()} reviews)</span>
              </div>
            )}

            <div className="book-detail-price">₹{parseFloat(book.price).toLocaleString('en-IN')}</div>

            {/* Stock status */}
            <div className={`stock-status stock-${stockStatus}`}>
              {stockStatus === 'out' && '❌ Out of Stock'}
              {stockStatus === 'low' && `⚠️ Only ${book.stock} copies left`}
              {stockStatus === 'in' && `✅ In Stock (${book.stock} available)`}
            </div>

            {/* Description */}
            {book.description && (
              <p className="book-description">{book.description}</p>
            )}

            {/* Book Meta */}
            <div className="book-meta-grid">
              {book.isbn && <div><span>ISBN</span><strong>{book.isbn}</strong></div>}
              {book.publisher && <div><span>Publisher</span><strong>{book.publisher}</strong></div>}
              {book.pages && <div><span>Pages</span><strong>{book.pages}</strong></div>}
            </div>

            {/* Quantity + Actions */}
            {book.stock > 0 && (
              <div className="book-actions">
                <div className="quantity-selector">
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >−</button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(q => Math.min(book.stock, q + 1))}
                    disabled={quantity >= book.stock}
                  >+</button>
                </div>

                <div className="action-buttons">
                  <button
                    className="btn btn-outline"
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleBuyNow}
                    disabled={addingToCart}
                  >
                    ⚡ Buy Now
                  </button>
                </div>
              </div>
            )}
            {book.stock === 0 && (
              <p className="out-of-stock-msg">This book is currently unavailable.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
