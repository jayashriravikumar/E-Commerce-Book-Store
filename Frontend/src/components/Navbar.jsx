import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar({ search, setSearch }) {

  const { cart } = useContext(CartContext);

  return (

    <header className="navbar">

      <div className="nav-wrapper">

        {/* Logo */}
        <Link to="/" className="logo">
          📚 BookStore
        </Link>

        {/* Search */}
        <div className="search-container">

          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <button>
            🔍
          </button>

        </div>

        {/* Navigation Links */}
        <nav className="nav-links">

          <Link to="/">Home</Link>

          <Link to="/books">Books</Link>

          <Link to="/orders">Orders</Link>

          <Link to="/login">Login</Link>

          <Link to="/cart" className="cart-icon">
            🛒
            <span className="cart-count">{cart.length}</span>
          </Link>

        </nav>

      </div>

    </header>

  );
}

export default Navbar;