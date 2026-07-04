import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/products"
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;

const inStock = products.filter(
  (product) => product.stock > 0
).length;

const outOfStock = products.filter(
  (product) => product.stock === 0
).length;

const totalCategories = new Set(
  products.map((product) => product.category)
).size;
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/v1/admin/product/${id}`,
        {
          withCredentials: true,
        }
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

 const filteredProducts = products.filter((product) => {
  const searchValue = (search ?? "").toLowerCase();

  const title = String(product.title ?? "").toLowerCase();
  const author = String(product.author ?? "").toLowerCase();
  const category = String(product.category ?? "").toLowerCase();

  return (
    title.includes(searchValue) ||
    author.includes(searchValue) ||
    category.includes(searchValue)
  );
});

  return (
    <div className="p-8">

     <div className="flex justify-between items-center mb-6">

  <h1 className="text-4xl font-bold">
    📚 Book Inventory Management
  </h1>

  <button
    onClick={() => navigate("/admin/add-product")}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
  >
    + Add Product
  </button>

</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

  <div className="bg-blue-600 text-white rounded-xl p-5 shadow">
    <h2>Total Books</h2>
    <p className="text-3xl font-bold">
      {totalProducts}
    </p>
  </div>

  <div className="bg-green-600 text-white rounded-xl p-5 shadow">
    <h2>In Stock</h2>
    <p className="text-3xl font-bold">
      {inStock}
    </p>
  </div>

  <div className="bg-red-600 text-white rounded-xl p-5 shadow">
    <h2>Out of Stock</h2>
    <p className="text-3xl font-bold">
      {outOfStock}
    </p>
  </div>

  <div className="bg-purple-600 text-white rounded-xl p-5 shadow">
    <h2>Categories</h2>
    <p className="text-3xl font-bold">
      {totalCategories}
    </p>
  </div>

</div>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-3 w-full mb-6"
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-full">

<thead className="bg-gray-100">

<tr>

<th className="p-4 text-left">Cover</th>

<th className="p-4 text-left">
Product Title
</th>

<th className="p-4 text-left">
Author
</th>

<th className="p-4 text-left">
Category
</th>

<th className="p-4 text-center">
Price
</th>

<th className="p-4 text-center">
Stock
</th>

<th className="p-4 text-center">
Status
</th>

<th className="p-4 text-center">
Actions
</th>

</tr>

</thead>

          <tbody>

            {filteredProducts.map((product) => (
                <tr
  key={product._id}
  className="border-b hover:bg-gray-50"
>

  {/* Cover */}
  <td className="p-4">
    <img
      src={
        product.image?.[0]?.url ||
        "https://via.placeholder.com/60x80"
      }
      alt={product.title || product.name}
      className="w-16 h-20 object-cover rounded"
    />
  </td>

  {/* Product Title */}
  <td className="p-4 font-semibold">
    {product.title || product.name}
  </td>

  {/* Author */}
  <td className="p-4">
    {product.author || (
      <span className="text-gray-400 italic">
        Not Available
      </span>
    )}
  </td>

  {/* Category */}
  <td className="p-4">
    {product.category}
  </td>

  {/* Price */}
  <td className="p-4 text-center font-semibold">
    ₹{product.price}
  </td>

  {/* Stock */}
  <td className="p-4 text-center">
    {product.stock}
  </td>

  {/* Status */}
  <td className="p-4 text-center">
    {product.stock > 10 ? (
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
        In Stock
      </span>
    ) : product.stock > 0 ? (
      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
        Low Stock
      </span>
    ) : (
      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
        Out of Stock
      </span>
    )}
  </td>

  {/* Actions */}
  <td className="p-4 text-center space-x-2">

    <button
      onClick={() =>
        navigate(`/admin/edit-product/${product._id}`)
      }
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      Edit
    </button>

    <button
      onClick={() =>
        deleteProduct(product._id)
      }
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
    >
      Delete
    </button>

  </td>

</tr>

             

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminProducts;