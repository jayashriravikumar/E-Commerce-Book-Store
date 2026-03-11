import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

function Books({ search = "" }) {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load books");
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
    <div className="books-grid">
      {filteredBooks.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}

export default Books;