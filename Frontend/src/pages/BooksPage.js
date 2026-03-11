import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import HeroBanner from '../components/HeroBanner';
import { getBooks, getCategories } from '../services/bookService';
import './BooksPage.css';

const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'title', label: 'A–Z' },
];

const BooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const currentPage = parseInt(searchParams.get('page') || '1');
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const search = searchParams.get('search') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice });
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    getCategories().then(data => setCategories(data.categories || [])).catch(console.error);
  }, []);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page: currentPage, limit: 12 };
      if (category) params.category = category;
      if (sort) params.sort = sort;
      if (search) params.search = search;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const data = await getBooks(params);
      setBooks(data.books || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Fetch books error:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, category, sort, search, minPrice, maxPrice]);

  useEffect(() => {
    fetchBooks();
    window.scrollTo(0, 0);
  }, [fetchBooks]);

  const updateParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    p.set('page', '1');
    setSearchParams(p);
  };

  const applyPriceFilter = () => {
    const p = new URLSearchParams(searchParams);
    if (priceRange.min) p.set('minPrice', priceRange.min); else p.delete('minPrice');
    if (priceRange.max) p.set('maxPrice', priceRange.max); else p.delete('maxPrice');
    p.set('page', '1');
    setSearchParams(p);
    setFilterOpen(false);
  };

  const clearAllFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSearchParams({ page: '1' });
  };

  const hasFilters = category || sort || search || minPrice || maxPrice;

  return (
    <div className="books-page">
      <HeroBanner 
        title="Explore Our Collection" 
        subtitle="Browse thousands of books across all genres. Filter by category, price, or search for your favorite titles."
        height="small"
      />
      
      <div className="container">
        <div className="books-header">
          <div>
            <h1>All Books</h1>
            {search && <p className="search-results-info">Results for: <strong>"{search}"</strong></p>}
            <p className="books-count">{total} {total === 1 ? 'book' : 'books'} found</p>
          </div>
          <button className="btn btn-outline filter-toggle" onClick={() => setFilterOpen(!filterOpen)}>
            ⚙️ Filters {hasFilters ? '(active)' : ''}
          </button>
        </div>

        {/* Filter bar */}
        <div className={`filters-bar ${filterOpen ? 'open' : ''}`}>
          {/* Category filter */}
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <div className="filter-chips">
              <button
                className={`chip ${!category ? 'active' : ''}`}
                onClick={() => updateParam('category', '')}
              >All</button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`chip ${category === cat ? 'active' : ''}`}
                  onClick={() => updateParam('category', cat)}
                >{cat}</button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div className="filter-group">
            <label className="filter-label">Price Range</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min ₹"
                value={priceRange.min}
                min="0"
                onChange={e => setPriceRange(p => ({ ...p, min: e.target.value }))}
                className="form-input price-input"
              />
              <span>–</span>
              <input
                type="number"
                placeholder="Max ₹"
                value={priceRange.max}
                min="0"
                onChange={e => setPriceRange(p => ({ ...p, max: e.target.value }))}
                className="form-input price-input"
              />
              <button className="btn btn-primary btn-sm" onClick={applyPriceFilter}>Apply</button>
            </div>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              className="form-input sort-select"
              value={sort}
              onChange={e => updateParam('sort', e.target.value)}
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {hasFilters && (
            <button className="btn btn-ghost btn-sm clear-filters" onClick={clearAllFilters}>
              ✕ Clear Filters
            </button>
          )}
        </div>

        {/* Active filter tags */}
        {hasFilters && (
          <div className="active-filters">
            {category && <span className="filter-tag">{category} <button onClick={() => updateParam('category', '')}>×</button></span>}
            {search && <span className="filter-tag">Search: {search} <button onClick={() => updateParam('search', '')}>×</button></span>}
            {(minPrice || maxPrice) && <span className="filter-tag">₹{minPrice || '0'} – ₹{maxPrice || '∞'} <button onClick={() => { updateParam('minPrice', ''); updateParam('maxPrice', ''); }}>×</button></span>}
            {sort && <span className="filter-tag">{sortOptions.find(s => s.value === sort)?.label} <button onClick={() => updateParam('sort', '')}>×</button></span>}
          </div>
        )}

        {/* Books Grid */}
        {loading ? (
          <div className="loading-container"><div className="spinner" /></div>
        ) : books.length === 0 ? (
          <div className="no-books">
            <span className="no-books-icon">📭</span>
            <h3>No books found</h3>
            <p>Try adjusting your filters or search query.</p>
            <button className="btn btn-primary" onClick={clearAllFilters}>Clear Filters</button>
          </div>
        ) : (
          <div className="books-grid">
            {books.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="btn btn-outline page-btn"
              disabled={currentPage <= 1}
              onClick={() => updateParam('page', String(currentPage - 1))}
            >← Previous</button>

            <div className="page-numbers">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
                return (
                  <button
                    key={pageNum}
                    className={`btn page-number ${currentPage === pageNum ? 'active' : 'btn-ghost'}`}
                    onClick={() => updateParam('page', String(pageNum))}
                  >{pageNum}</button>
                );
              })}
            </div>

            <button
              className="btn btn-outline page-btn"
              disabled={currentPage >= totalPages}
              onClick={() => updateParam('page', String(currentPage + 1))}
            >Next →</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
