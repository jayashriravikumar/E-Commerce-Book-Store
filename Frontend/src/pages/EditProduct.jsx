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

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h2>Edit Product</h2>

      <form onSubmit={updateProduct} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <textarea rows="5" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;