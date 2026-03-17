import { Link } from "react-router-dom";

import BookStoreLogo from "./BookStoreLogo";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link to="/" className="site-footer-logo">
            <BookStoreLogo />
          </Link>
          <p className="site-footer-copy">
            A calmer online bookstore for readers who want thoughtful picks,
            clean browsing, and shelves worth revisiting.
          </p>
        </div>

        <div className="site-footer-column">
          <p className="site-footer-heading">Explore</p>
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className="site-footer-column">
          <p className="site-footer-heading">Categories</p>
          <Link to="/books">Self Growth</Link>
          <Link to="/books">Technology</Link>
          <Link to="/books">Business</Link>
          <Link to="/books">Fiction</Link>
        </div>

        <div className="site-footer-column">
          <p className="site-footer-heading">Contact</p>
          <a href="mailto:hello@bookstore.com">hello@bookstore.com</a>
          <a href="tel:+919876543210">+91 98765 43210</a>
          <span>Bengaluru, India</span>
          <span>Open daily, 9 AM - 8 PM</span>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>© 2026 BookStore. Curated Reading House.</p>
        <div className="site-footer-bottom-links">
          <Link to="/books">Browse Collection</Link>
          <Link to="/login">My Account</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
