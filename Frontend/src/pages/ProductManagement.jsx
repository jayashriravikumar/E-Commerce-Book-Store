import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./ProductManagement.css";

const ProductManagement = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // -----------------------------
  // FETCH ACTIVE PRODUCTS
  // -----------------------------
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/api/v1/products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // FETCH DELETED PRODUCTS
  // -----------------------------
  const fetchDeletedProducts = async () => {
    try {
      const res = await axios.get("/api/v1/admin/products");
      const all = res.data.products || [];
      const deleted = all.filter((p) => p.isDeleted === true);

      const normalized = deleted.map((p) => ({
        ...p,
        image: p.image?.[0]?.url || p.coverImage?.[0]?.url
          ? [{ url: p.image?.[0]?.url || p.coverImage?.[0]?.url }]
          : [],
      }));

      setDeletedProducts(normalized);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchDeletedProducts();
  }, []);

  // -----------------------------
  // SEARCH FILTER
  // -----------------------------
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    const name = (product.name || product.title || "").toLowerCase();
    const author = (product.author || "").toLowerCase();
    const category = (product.category || "").toLowerCase();
    return (
      name.includes(query) ||
      author.includes(query) ||
      category.includes(query)
    );
  });

  // -----------------------------
  // DELETE PRODUCT
  // -----------------------------
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/v1/admin/product/${id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
      fetchDeletedProducts();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete product.");
    }
  };

  // -----------------------------
  // RESTORE PRODUCT
  // -----------------------------
  const restoreProduct = async (id) => {
    const confirmRestore = window.confirm(
      "Are you sure you want to restore this product?"
    );
    if (!confirmRestore) return;

    try {
      await axios.put(`/api/v1/admin/product/restore/${id}`);
      toast.success("Product restored successfully!");
      fetchProducts();
      fetchDeletedProducts();
    } catch (err) {
      console.log(err);
      toast.error("Failed to restore product.");
    }
  };

  const permanentDeleteProduct = async (id) => {
  const confirmDelete = window.confirm(
    "This product will be permanently deleted and cannot be recovered. Continue?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`/api/v1/admin/product/permanent/${id}`);

    toast.success("Product permanently deleted!");

    fetchDeletedProducts();
  } catch (err) {
    console.log(err);
    toast.error("Failed to permanently delete product.");
  }
};

  const getProductImage = (product) => {
    return product.image?.[0]?.url || "";
  };

  // -----------------------------
  // LOADING / ERROR UI
  // -----------------------------
  if (loading) {
    return <h3 style={{ padding: "20px" }}>Loading products...</h3>;
  }

  if (error) {
    return (
      <h3 style={{ padding: "20px", color: "red" }}>{error}</h3>
    );
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="product-management">

      <div className="header">
        <h2>📚 Product Management</h2>
        <div className="header-actions">
          <button
            className="deleted-toggle-btn"
            onClick={() => setShowDeleted(!showDeleted)}
          >
            {showDeleted ? "Hide Deleted" : `🗂 Deleted (${deletedProducts.length})`}
          </button>
          <button
            className="add-btn"
            onClick={() => navigate("/admin/product/new")}
          >
            + Add Product
          </button>
        </div>
      </div>

      <p className="count">
        Total Products: <strong>
          {searchQuery ? filteredProducts.length : products.length}
        </strong>
        {searchQuery && (
          <span style={{ color: "#888", fontSize: "14px", marginLeft: "10px" }}>
            (showing results for "{searchQuery}")
          </span>
        )}
      </p>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by name, author or category..."
          className="search-box"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ===== ACTIVE PRODUCTS TABLE ===== */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Author</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty">
                {searchQuery ? `No results for "${searchQuery}"` : "No products found"}
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => {
              const imageUrl = getProductImage(product);
              return (
                <tr key={product._id}>
                  <td>
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="book-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/70x90?text=No+Image";
                      }}
                    />
                  </td>
                  <td>{product.name || product.title}</td>
                  <td>{product.author}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <span className={product.stock > 0 ? "stock in-stock" : "stock out-stock"}>
                      {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}
                    </span>
                  </td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* ===== DELETED PRODUCTS TABLE ===== */}
      {showDeleted && (
        <div className="deleted-section">
          <h3 className="deleted-heading">🗂 Deleted Products</h3>
          <table className="product-table deleted-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Author</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deletedProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty">No deleted products</td>
                </tr>
              ) : (
                deletedProducts.map((product) => {
                  const imageUrl = getProductImage(product);
                  return (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="book-image deleted-image"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/70x90?text=No+Image";
                          }}
                        />
                      </td>
                      <td>{product.name || product.title}</td>
                      <td>{product.author}</td>
                      <td>₹{product.price}</td>
                      <td>
                        <span className="category-badge">{product.category}</span>
                      </td>
                      <td>
                        <button
                          className="restore-btn"
                          onClick={() => restoreProduct(product._id)}
                        >
                          ♻️ Restore
                        </button>
                        <button
                          className="permanent-delete-btn"
                          onClick={() => permanentDeleteProduct(product._id)}
                        >
                          ❌ Permanent Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default ProductManagement;