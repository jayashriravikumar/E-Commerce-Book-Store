import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { getBooks } from "../services/api";

function Home() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await getBooks();
    setBooks(response.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book Store</h1>

      <div style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        {books.map((book) => (
          <BookCard
            key={book._id}
            id={book._id}
            title={book.title}
            price={book.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;