import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    author: "",
    price: "",
    stock: "",
    category: "",
    description: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "/api/v1/admin/product/create",
        product,
        {
          withCredentials: true,
        }
      );

      alert("Product Added Successfully");

      navigate("/admin/products");

    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Book Name"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-3 w-full"
          rows="5"
          onChange={handleChange}
        />

        <button
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Add Product
        </button>

      </form>

    </div>
  );
};

export default AddProduct;