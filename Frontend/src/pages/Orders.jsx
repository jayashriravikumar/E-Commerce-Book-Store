import { useContext, useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { formatPrice } from "../utils/books";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const TOKEN_STORAGE_KEY = "bookstore-auth-token";
const TOKEN_SESSION_KEY = "bookstore-auth-session-token";

function Orders() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    searchId: "",
    sortBy: "newest",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem(TOKEN_STORAGE_KEY) ||
          sessionStorage.getItem(TOKEN_SESSION_KEY);

        if (!token) {
          setError("Please login to view your orders.");
          navigate("/login", {
            state: { message: "Please login to view your orders." },
          });
          return;
        }

        const { data } = await axios.get(`${API_BASE_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (data?.success && Array.isArray(data?.orders)) {
          setOrders(data.orders);
        } else {
          setError("Failed to load orders. Please try again later.");
        }
      } catch (err) {
        const status = err?.response?.status;
        const backendMessage = err?.response?.data?.message;

        if (status === 401) {
          logout();
          setError("Your session has expired. Please login again.");
          navigate("/login", {
            state: {
              message: backendMessage || "Your session has expired. Please login again.",
            },
          });
          return;
        }

        setError(
          backendMessage ||
            "Could not load your orders. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user, navigate, logout]);

  // Apply filters and sorting
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Filter by search ID
    if (filters.searchId.trim()) {
      const searchTerm = filters.searchId.toLowerCase();
      result = result.filter((order) =>
        order._id.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by price range
    if (filters.minPrice) {
      result = result.filter(
        (order) => Number(order.totalPrice) >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      result = result.filter(
        (order) => Number(order.totalPrice) <= Number(filters.maxPrice)
      );
    }

    // Sort
    if (filters.sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortBy === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filters.sortBy === "high-to-low") {
      result.sort((a, b) => Number(b.totalPrice) - Number(a.totalPrice));
    } else if (filters.sortBy === "low-to-high") {
      result.sort((a, b) => Number(a.totalPrice) - Number(b.totalPrice));
    }

    return result;
  }, [orders, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      searchId: "",
      sortBy: "newest",
      minPrice: "",
      maxPrice: "",
    });
  };

  if (loading) {
    return (
      <section className="p-10 bg-gray-100 min-h-screen">
        <div className="bg-white shadow rounded-lg p-8 max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-gray-600">Track your order history here.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!error && orders.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
                  >
                    Reset
                  </button>
                </div>

                {/* Search by Order ID */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Search Order ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter order ID"
                    value={filters.searchId}
                    onChange={(e) => handleFilterChange("searchId", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="low-to-high">Price: Low to High</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      min="0"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="lg:col-span-3">
              {!filteredOrders.length && (
                <div className="bg-white shadow rounded-lg p-8 text-center">
                  <p className="text-gray-600 mb-4">No orders match your filters.</p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {filteredOrders.length > 0 && (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 mb-4">
                    Showing {filteredOrders.length} of {orders.length} orders
                  </div>
                  {filteredOrders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-600">Order ID</p>
                          <p className="text-gray-900 font-mono text-sm">{order._id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-600">Total</p>
                          <p className="text-lg font-bold text-indigo-600">
                            {formatPrice(Number(order.totalPrice) || 0)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-600">
                            Items: {order.orderItems?.length || 0}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      {order.shippingAddress && (
                        <div className="text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                          <p className="font-semibold">Shipping Address:</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.postalCode}
                          </p>
                        </div>
                      )}

                      <Link
                        to={`/order-confirmation/${order._id}`}
                        state={{
                          orderId: order._id,
                          totalPrice: Number(order.totalPrice) || 0,
                        }}
                        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {!orders.length && !error && (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-700 mb-4">You haven't placed any orders yet.</p>
            <Link
              to="/books"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Browse Books
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;
