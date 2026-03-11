import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { getFeaturedBooks } from '../services/bookService';
import './HomePage.css';

const categories = [
  { name: 'Fiction', icon: '📖', color: '#dbeafe' },
  { name: 'Non-Fiction', icon: '🎓', color: '#d1fae5' },
  { name: 'Fantasy', icon: '🧙', color: '#ede9fe' },
  { name: 'Science Fiction', icon: '🚀', color: '#fce7f3' },
  { name: 'Self-Help', icon: '💡', color: '#fef3c7' },
  { name: 'Mystery', icon: '🔍', color: '#fee2e2' },
  { name: 'Finance', icon: '💰', color: '#ecfdf5' },
];

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFeaturedBooks()
      .then(data => setBooks(data.books || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/books?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="homepage">
      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Your Next
              <span className="hero-highlight"> Favourite Book</span>
            </h1>
            <p className="hero-subtitle">
              Explore thousands of books across every genre. From bestsellers to hidden gems — your next great read is just a click away.
            </p>
            <form className="hero-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="hero-search-input"
              />
              <button type="submit" className="btn btn-secondary hero-search-btn">
                🔍 Search
              </button>
            </form>
            <div className="hero-stats">
              <div className="stat"><strong>10,000+</strong><span>Books</span></div>
              <div className="stat"><strong>500+</strong><span>Authors</span></div>
              <div className="stat"><strong>50,000+</strong><span>Readers</span></div>
            </div>
          </div>
          <div className="hero-image" aria-hidden="true">
            <div className="book-stack">
              <span>📚</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <Link to="/books" className="see-all-link">See all books →</Link>
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/categories/${encodeURIComponent(cat.name)}`}
                className="category-card"
                style={{ background: cat.color }}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>⭐ Popular Books</h2>
            <Link to="/books" className="see-all-link">View all →</Link>
          </div>
          {loading ? (
            <div className="loading-container"><div className="spinner" /></div>
          ) : (
            <div className="books-grid">
              {books.map((book) => <BookCard key={book._id || book.id} book={book} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-text">
              <h2>Ready to Start Reading?</h2>
              <p>Register today and get free shipping on your first order!</p>
            </div>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-secondary">Create Account</Link>
              <Link to="/books" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                Browse Books
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
