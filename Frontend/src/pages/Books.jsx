import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { getUniqueBooks } from "../utils/books";
import fallbackBooks from "../data/fallbackBooks";

function Books({ search = "" }) {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        setBooks(getUniqueBooks(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setBooks(getUniqueBooks(fallbackBooks));
        setError("");
        setLoading(false);
      });

  }, []);

  const filteredBooks = books.filter((book) =>
    (book.title || "")
      .toLowerCase()
      .includes((search || "").toLowerCase())
  );

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading books...</h2>;
  }

  if (error) {
    return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;
  }

  if (filteredBooks.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No books found</h2>;
  }

  return (
    <div className="books-page">
      <section className="books-hero">
        <div>
          <p className="books-eyebrow">Curated Collection</p>
          <h1>Explore Our Book Collection</h1>
          <p className="books-hero-copy">
            Discover handpicked reads with strong visuals, clear pricing, and
            a cleaner shopping experience.
          </p>
        </div>
      </section>

      <div className="books-grid">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Books;
