import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      background: "#222",
      color: "white",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2>📚 Book Store</h2>

      <Link to="/cart" style={{ color: "white" }}>
        Cart
      </Link>
    </nav>
  );
}

export default Navbar;