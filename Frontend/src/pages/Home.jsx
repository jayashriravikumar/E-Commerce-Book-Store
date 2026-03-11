import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BookCard from "../components/BookCard";
import HeroCarousel from "../components/HeroCarousel";

function Home() {

  const [books, setBooks] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:5000/api/books")
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <div>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Welcome Section */}
      <div className="welcome-section">

        <h1>📚 Welcome to BookStore</h1>

        <p>Discover amazing books for learning and inspiration</p>

        <Link to="/books">
          <button className="browse-btn">
            Browse Books
          </button>
        </Link>

      </div>

      {/* Featured Books */}
      <div className="featured-section">

        <h2>Featured Books</h2>

        <div className="books-grid">

          {books.length > 0 ? (
            books.slice(0, 4).map(book => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <p>Loading books...</p>
          )}

        </div>

      </div>

    </div>
  );

}

export default Home;