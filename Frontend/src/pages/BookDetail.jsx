import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import BookImage from "../components/BookImage";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/books";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function BookDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [book, setBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadBookDetail = async () => {
      setLoading(true);
      setError("");
      setCartMessage("");
      setShowFullDescription(false);

      try {
        const [bookResponse, booksResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/books/${id}`),
          axios.get(`${API_BASE_URL}/api/books`)
        ]);

        if (!isMounted) {
          return;
        }

        const allBooks = Array.isArray(booksResponse.data) ? booksResponse.data : [];

        setBook(bookResponse.data || null);
        setBooks(allBooks);
      } catch (err) {
        console.error(err);

        if (!isMounted) {
          return;
        }

        setBook(null);
        setBooks([]);
        setError(
          err?.response?.data?.message ||
          "Failed to load book details. Please try again."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBookDetail();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const relatedBooks = useMemo(() => {
    if (!book) {
      return [];
    }

    if (book.relatedProducts?.length) {
      return book.relatedProducts;
    }

    return books
      .filter((item) => item._id !== book._id)
      .slice(0, 4);
  }, [book, books]);

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "40px" }}>Loading book details...</h2>;
  }

  if (error || !book) {
    return <h2 style={{ textAlign: "center", padding: "40px", color: "red" }}>{error || "Book not found"}</h2>;
  }

  const packageContains = book.packageContains?.length
    ? book.packageContains
    : ["1 Book", "Protective packaging"];
  const descriptionText = book.description || "This book blends practical knowledge and enjoyable reading in a clear, reader-friendly format.";
  const shortDescriptionText = descriptionText.length > 220
    ? `${descriptionText.slice(0, 220).trim()}...`
    : descriptionText;
  const productFacts = [
    { label: "Author", value: book.author },
    { label: "Format", value: "Paperback" },
    { label: "Language", value: "English" },
    { label: "Dimensions", value: book.productDimensions || "21 cm x 14 cm x 3 cm" }
  ];

  const handleAddToCart = () => {
    addToCart(book);
    setCartMessage("Added to cart");
  };

  return (
    <div className="book-detail-page">
      <section className="book-detail-hero">
        <div className="book-detail-gallery">
          <div className="book-detail-image-card">
            <BookImage
              book={book}
              alt={book.title}
              className="book-detail-image"
            />
          </div>
        </div>

        <div className="book-detail-content">
          <p className="book-detail-tag">Visit the BookStore Store</p>
          <h1>{book.title}</h1>
          <p className="book-detail-author">by {book.author}</p>
          <div className="book-detail-divider" />
          <p className="book-detail-price">{formatPrice(book.price)}</p>
          <p className="book-detail-tax">Inclusive of all taxes</p>

          <div className="book-detail-facts">
            {productFacts.map((fact) => (
              <div key={fact.label} className="book-detail-fact">
                <span className="book-detail-fact-label">{fact.label}</span>
                <span>{fact.value}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="book-buy-box">
          <p className="book-buy-price">{formatPrice(book.price)}</p>
          <p className="book-buy-stock">In stock</p>
          <p className="book-buy-delivery">Free delivery by BookStore on eligible orders.</p>

          <button
            className="book-buy-cart"
            onClick={handleAddToCart}
          >
            {cartMessage || "Add to Cart"}
          </button>

          <button className="book-buy-now" type="button">
            Buy Now
          </button>

          {cartMessage && (
            <p className="book-buy-confirmation">{cartMessage}</p>
          )}
        </aside>
      </section>

      <section className="book-detail-grid">
        <div className="book-detail-panel book-detail-panel-wide">
          <h2>Description</h2>
          <p>{showFullDescription ? descriptionText : shortDescriptionText}</p>
          {descriptionText.length > 220 && (
            <button
              type="button"
              className="description-toggle"
              onClick={() => setShowFullDescription((value) => !value)}
            >
              {showFullDescription ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        <div className="book-detail-panel">
          <h2>Product Details</h2>
          <p>{book.howToUse || "Start with one chapter at a time, take notes on key takeaways, and revisit important sections whenever needed."}</p>
          <h3 className="book-detail-subheading">Package Contains</h3>
          <ul className="book-detail-list">
            {packageContains.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="related-products">
        <div className="related-products-header">
          <h2>Related Products</h2>
          <p>Explore more books you may also like.</p>
        </div>

        <div className="books-grid">
          {relatedBooks.map((item) => (
            <div key={item._id || item.title} className="book-card">
              <Link
                to={item._id ? `/books/${item._id}` : "#"}
                className="book-card-link"
              >
                <BookImage
                  book={item}
                  alt={item.title}
                  className="book-img"
                />
                <h3>{item.title}</h3>
                <p>{item.author}</p>
                <p className="book-card-price">{formatPrice(item.price)}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BookDetail;
