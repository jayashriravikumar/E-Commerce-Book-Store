import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import BookCard from "../components/BookCard";
import HeroCarousel from "../components/HeroCarousel";
import { CartContext } from "../context/CartContext";

const categories = [
  {
    key: "Self Growth",
    title: "Self Growth",
    description: "Habits, mindset, focus, and personal transformation reads.",
    accent: "Reader Picks"
  },
  {
    key: "Technology",
    title: "Technology",
    description: "Programming, AI, software engineering, and modern digital skills.",
    accent: "Tech Shelf"
  },
  {
    key: "Business",
    title: "Business",
    description: "Leadership, money, strategy, and entrepreneurial learning.",
    accent: "Smart Work"
  },
  {
    key: "Fiction",
    title: "Fiction",
    description: "Immersive stories, memorable characters, and meaningful escapes.",
    accent: "Story Time"
  }
];

const FEATURED_BOOKS_COUNT = 8;

function Home() {
  const {
    books = [],
    booksLoading = false,
    booksError = ""
  } = useContext(CartContext) || {};

  const booksByCategory = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        books: books.filter((book) => book.category === category.key).slice(0, 4)
      })),
    [books]
  );

  return (
    <div className="home-page">
      <HeroCarousel />

      <section className="welcome-section">
        <p className="welcome-tag">BookStore</p>
        <h1>Books for learning, ambition, and better everyday reading</h1>
        <p>
          Discover standout titles across growth, technology, business, and fiction
          in a cleaner storefront experience.
        </p>

        <Link to="/books">
          <button className="browse-btn">
            Browse Books
          </button>
        </Link>
      </section>

      <section className="categories-section">
        <div className="section-heading">
          <p className="section-tag">Categories</p>
          <h2>Pick a shelf that fits what you want to read next</h2>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.title} className="category-card">
              <span className="category-accent">{category.accent}</span>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <Link to="/books" className="category-link">
                View Books
              </Link>
            </div>
          ))}
        </div>
      </section>

      {booksByCategory
        .filter((category) => category.books.length > 0)
        .map((category) => (
          <section key={category.key} className="featured-section">
            <div className="section-heading">
              <p className="section-tag">{category.accent}</p>
              <h2>{category.title} Books</h2>
            </div>

            <div className="books-grid">
              {category.books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          </section>
        ))}

      <section className="featured-section">
        <div className="section-heading">
          <p className="section-tag">Featured</p>
          <h2>Popular books readers are choosing right now</h2>
        </div>

        <div className="books-grid">
          {booksLoading ? (
            <p>Loading books...</p>
          ) : booksError ? (
            <p>{booksError}</p>
          ) : books.length > 0 ? (
            books.slice(0, FEATURED_BOOKS_COUNT).map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <p>No books available right now.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
