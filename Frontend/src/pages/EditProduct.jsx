import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Fetch Product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/v1/product/${id}`);
      const product = res.data.product;

      setTitle(product.name || product.title || "");
      setAuthor(product.author || "");
      setPrice(product.price || "");
      setStock(product.stock || "");
      setCategory(product.category || "");
      setDescription(product.description || "");
      setImage(product.image?.[0]?.url || "");
    } catch (err) {
      console.log(err);
      toast.error("Failed to load product");
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Update Product
  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name: title,
        title: title,
        author,
        price,
        stock,
        category,
        description,
        image,
      };

      await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.log("Status:", err.response?.status);
      console.log("Data:", err.response?.data);
      toast.error(
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to update product"
      );
    }
  };

 const styles = {
  page: {
    padding: "20px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  gap: "12px",
    marginBottom: "25px",
  },
  headerTitle: {
    color: "#222",
    margin: 0,
    fontSize: "24px",
  },
  backBtn: {
    background: "#1f2937",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  card: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    padding: "20px",
    maxWidth: "850px",
    width: "100%",
  margin: "0 auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formRow: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "20px",
},
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    flex: 1,
  },
  label: {
    fontWeight: "600",
    color: "#374151",
  },
  input: {
  padding: "11px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  background: "#f9fafb",
  width: "100%",
  boxSizing: "border-box",
},
 textarea: {
  padding: "11px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  background: "#f9fafb",
  resize: "vertical",
  width: "100%",
  boxSizing: "border-box",
},
  preview: {
  width: "120px",
  maxWidth: "100%",
  height: "170px",
  objectFit: "contain",
  borderRadius: "8px",
  border: "2px solid #e5e7eb",
},
  actions: {
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  flexWrap: "wrap",
},
  cancelBtn: {
  background: "#e5e7eb",
  color: "#374151",
  border: "none",
  padding: "11px 22px",
  borderRadius: "8px",
  cursor: "pointer",
  flex: 1,
  minWidth: "150px",
},
  updateBtn: {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "11px 25px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  flex: 1,
  minWidth: "180px",
},
};

return (
  <div style={styles.page}>
    <div style={styles.header}>
      <h2 style={styles.headerTitle}>✏️ Edit Product</h2>

      <button
        style={styles.backBtn}
        onClick={() => navigate("/admin/products")}
      >
        ← Back
      </button>
    </div>

    <div style={styles.card}>
      <form onSubmit={updateProduct} style={styles.form}>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Book Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>

          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Image URL</label>

          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={styles.input}
          />
        </div>

        {image && (
          <img
            src={image}
            alt="Preview"
            style={styles.preview}
          />
        )}

        <div style={styles.actions}>
          <button
            type="button"
            style={styles.cancelBtn}
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={styles.updateBtn}
          >
            ✅ Update Product
          </button>
        </div>

      </form>
    </div>
  </div>
);
};

export default EditProduct;