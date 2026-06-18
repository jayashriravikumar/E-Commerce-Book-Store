import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  Heart,
  ShoppingCart,
  Trash2,
} from "lucide-react";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/wishlist",
        {
          withCredentials: true,
        }
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeWishlist = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/wishlist/remove/${id}`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Removed from Wishlist");
        fetchWishlist();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to remove item"
      );
    }
  };

  const moveToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to Cart");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">
            ❤️ My Wishlist
          </h1>

          <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
            {products.length} Items
          </span>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
            <div className="text-7xl mb-6">❤️</div>

            <h2 className="text-3xl font-bold text-gray-800">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Save books you love and purchase them later.
            </p>

            <Link
              to="/products"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="overflow-hidden">
                    <img
                      src={
                        product.image?.[0]?.url ||
                        "https://via.placeholder.com/300x400"
                      }
                      alt={product.name}
                      className="h-72 w-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart
                      size={16}
                      className="text-red-500 fill-red-500"
                    />

                    <span className="text-xs font-semibold text-red-500">
                      Saved Item
                    </span>
                  </div>

                  <Link to={`/product/${product._id}`}>
                    <h3 className="font-bold text-lg text-gray-800 hover:text-blue-600 transition">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-sm mt-1">
                    by {product.author}
                  </p>

                  <div className="mt-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={() => moveToCart(product)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <ShoppingCart size={18} />
                      Add To Cart
                    </button>

                    <button
                      onClick={() =>
                        removeWishlist(product._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-xl transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </>
  );
};

export default Wishlist;