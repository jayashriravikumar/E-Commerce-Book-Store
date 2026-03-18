import { useContext, useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookImage from "../components/BookImage";
import { CartContext } from "../context/CartContext";

function Books({ search = "" }) {
  const { books = [], fetchBooks } = useContext(CartContext) || {};
  const [loading, setLoading] = useState(true);
  const [activeBookIndex, setActiveBookIndex] = useState(0);

  useEffect(() => {
    const loadBooks = async () => {
      if (typeof fetchBooks === "function") {
        await fetchBooks();
      }
      setLoading(false);
    };
    loadBooks();
  }, [fetchBooks]);

  const filteredBooks = (Array.isArray(books) ? books : []).filter((book) =>
    (book.title || "")
      .toLowerCase()
      .includes((search || "").toLowerCase())
  );

  useEffect(() => {
    if (filteredBooks.length <= 1) {
      setActiveBookIndex(0);
      return undefined;
    }

    const slider = setInterval(() => {
      setActiveBookIndex((current) => (current + 1) % filteredBooks.length);
    }, 2200);

    return () => clearInterval(slider);
  }, [filteredBooks.length]);

  const featuredBook = filteredBooks[activeBookIndex] || null;

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading books...</h2>;
  }

  if (filteredBooks.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No books found</h2>;
  }

  return (
    <div className="books-page">
      <section className="books-hero">
        <div>
          <p className="books-eyebrow">Books Collection</p>
          <h1>Find Your Next Read</h1>
          <p className="books-hero-copy">
            Explore bestselling titles, timeless classics, and fresh arrivals picked for every kind of reader.
          </p>
        </div>

        {featuredBook && (
          <div className="books-hero-showcase">
            <BookImage
              book={featuredBook}
              alt={featuredBook.title}
              className="books-hero-image"
            />
            <p className="books-hero-feature-label">Now Showing</p>
            <h3>{featuredBook.title}</h3>
            <p>{featuredBook.author}</p>
          </div>
        )}
      </section>

      <section className="books-grid books-list-grid">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </section>
    </div>
  );
}

export default Books;
