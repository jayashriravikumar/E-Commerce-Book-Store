import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backTo = location.state?.from || "/admin/products";

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const createProduct = async (e) => {
    e.preventDefault();

    // Validation
  if (Number(price) <= 0) {
    toast.error("Price must be greater than 0");
    return;
  }

  if (Number(stock) < 0) {
    toast.error("Stock cannot be negative");
    return;
  }

  if (title.trim() === "") {
    toast.error("Book title is required");
    return;
  }

  if (author.trim() === "") {
    toast.error("Author name is required");
    return;
  }

  if (category.trim() === "") {
    toast.error("Please select a category");
    return;
  }

    try {
      setSubmitting(true);

      const productData = {
        name: title,
        author,
        price,
        stock,
        category,
        description,
        image: image ? [{ url: image, public_id: "manual" }] : [],
      };

      await axios.post(
        "/api/v1/admin/products/create",
        productData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Product created successfully!");
      navigate(backTo);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  const styles = {
    page: { padding: "20px", background: "#f4f6f9", minHeight: "100vh" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",marginBottom: "25px" },
    headerTitle: { color: "#222", margin: 0, fontSize: "24px" },
    backBtn: { background: "#1f2937", color: "white", border: "none", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" },
    card: { background: "white", borderRadius: "12px", boxShadow: "0 5px 20px rgba(0,0,0,0.08)", padding: "20px", maxWidth: "850px", width: "100%",margin: "0 auto"},
    form: { display: "flex", flexDirection: "column", gap: "20px" },
    formRow: { display: "grid",gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",gap: "20px"},
    formGroup: { display: "flex", flexDirection: "column", gap: "7px", flex: 1 },
    label: { fontWeight: "600", fontSize: "14px", color: "#374151" },
    input: { width: "100%",boxSizing: "border-box",padding: "11px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "15px", outline: "none", background: "#f9fafb", color: "#111" },
    textarea: { width: "100%",boxSizing: "border-box",padding: "11px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "15px", outline: "none", background: "#f9fafb", color: "#111", resize: "vertical" },
    previewLabel: { fontWeight: "600", fontSize: "14px", color: "#374151", margin: 0 },
    previewImg: { width: "120px",maxWidth:"100%", height: "170px", objectFit: "cover", borderRadius: "8px", border: "2px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginTop: "8px" },
    formActions: { display: "flex", justifyContent: "flex-end", gap: "12px",flexWrap: "wrap", marginTop: "10px" },
    cancelBtn: { flex:1,minWidth: "150px",background: "#e5e7eb", color: "#374151", border: "none", padding: "11px 22px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "15px" },
    submitBtn: {flex:1,minWidth: "180px", background: submitting ? "#a0d9b4" : "#2ecc71", color: "white", border: "none", padding: "11px 28px", borderRadius: "8px", cursor: submitting ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: "15px" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>➕ Create Product</h2>
        <button style={styles.backBtn} onClick={() => navigate(backTo)}>
          ← Back
        </button>
      </div>

      <div style={styles.card}>
        <form onSubmit={createProduct} style={styles.form}>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Book Title</label>
              <input type="text" placeholder="Enter book title" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Author</label>
              <input type="text" placeholder="Enter author name" value={author} onChange={(e) => setAuthor(e.target.value)} style={styles.input} required />
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Price (₹)</label>
              <input type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Stock</label>
              <input type="number" placeholder="Enter stock" value={stock} onChange={(e) => setStock(e.target.value)} style={styles.input} required />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Category</label>
              <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={styles.input}
  required
>
  <option value="">Select Category</option>
  <option>Fiction</option>
  <option>Non-Fiction</option>
  <option>Self Help</option>
  <option>Fantasy</option>
  <option>Finance</option>
  <option>Technology</option>
  <option>Business</option>
  <option>Classic</option>
</select>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea rows="4" placeholder="Enter book description" value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL</label>
            <input type="text" placeholder="Paste image URL here" value={image} onChange={(e) => setImage(e.target.value)} style={styles.input} />
          </div>

          {image && (
            <div>
              <p style={styles.previewLabel}>Preview:</p>
              <div
  style={{
    width: "150px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center",
  }}
>
  <img
    src={image}
    alt="Preview"
    style={{
      width: "100%",
      height: "200px",
      objectFit: "contain",
    }}
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
</div>
            </div>
          )}

          <div style={styles.formActions}>
            <button type="button" style={styles.cancelBtn} onClick={() => navigate(backTo)}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={submitting}>
              {submitting ? "Creating..." : "✅ Create Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateProduct;