import { Link } from "react-router-dom";

export default function Navbar({ cart }) {
  return (
    <div className="bg-black text-white">

      {/* Announcement bar */}
      <div className="bg-orange-600 text-center py-2 text-sm">
        Free shipping on orders over $35 | New arrivals every Tuesday
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between px-10 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold">📚 Folio</h1>

        {/* Search */}
        <input
          className="px-4 py-2 rounded bg-gray-800 w-96"
          placeholder="Search books, authors, genres..."
        />

        {/* Menu */}
        <div className="flex gap-6 items-center">

          <Link to="/">
            <p className="cursor-pointer hover:text-gray-300">Browse</p>
          </Link>

          {/* ✅ CART BUTTON */}
          <Link to="/cart">
            <p className="cursor-pointer hover:text-gray-300">
              🛒 Cart ({cart.length})
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}