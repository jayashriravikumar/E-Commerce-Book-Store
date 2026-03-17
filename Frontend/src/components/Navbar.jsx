import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

import BookStoreLogo from "./BookStoreLogo";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar({ search, setSearch }) {
  const { cart } = useContext(CartContext);
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const totalCartItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedSearch = search.trim();

    if (location.pathname !== "/books") {
      navigate("/books");
    }

    setSearch(trimmedSearch);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <header className="navbar">
      <div className="nav-wrapper">
        <Link to="/" className="logo">
          <BookStoreLogo />
        </Link>

        <form
          className="search-container"
          onSubmit={handleSearchSubmit}
          role="search"
        >
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search books"
          />

          {search && (
            <button
              type="button"
              className="search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              x
            </button>
          )}

          <button type="submit" className="search-submit">
            Search
          </button>
        </form>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/orders">Orders</Link>
          {isAuthenticated ? (
            <>
              <span className="nav-user">Hi, {user?.name?.split(" ")[0] || "Reader"}</span>
              <button
                type="button"
                className="nav-auth-btn"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}

          <Link to="/cart" className="cart-icon">
            Cart
            <span className="cart-count">{totalCartItems}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
