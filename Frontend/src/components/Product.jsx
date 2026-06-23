import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector(
    (state) => state.cart
  );

  const isInCart = cartItems.some(
    (item) => item._id === product._id
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
console.log("Product Images:", product.image);
  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      overflow-hidden
      flex
      flex-col
      h-full
    "
    >
      <Link
        to={`/product/${product._id}`}
        className="block"
      >
<div className="h-80 bg-white flex items-center justify-center p-6">       <img
            src={
              product?.image?.[0]?.url ||
              product?.coverImage?.[0]?.url ||
              "https://via.placeholder.com/300x400"
            }
            alt={product?.name}
           className="h-full object-contain"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-bold text-xl text-gray-900 line-clamp-1 hover:text-blue-600">
            {product?.name || product.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mt-1 h-5 overflow-hidden">
          {product?.author}
        </p>

        <p className="text-gray-600 text-sm mt-3 line-clamp-2 h-10">
          {product?.description}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Rating
            value={product?.ratings || 0}
            disabled={true}
            showValue={false}
          />

          <span className="text-xs text-gray-500">
            ({product?.numOfReviews || 0})
          </span>
        </div>

        <div className="mt-auto pt-5">
          <div className="flex flex-col gap-3">
           <span className="text-3xl font-bold text-blue-600">
  ₹{product?.price}
</span>

{product?.stock > 10 ? (
  <p className="text-green-600 text-sm font-medium">
     In Stock
  </p>
) : product?.stock > 0 ? (
  <p className="text-orange-500 text-sm font-medium">
     Only {product.stock} left
  </p>
) : (
  <p className="text-red-600 text-sm font-medium">
     Out of Stock
  </p>
)}

            <button
              onClick={handleAddToCart}
              disabled={isInCart || product?.stock === 0}
              className={`
                h-11
                min-w-[120px]
                rounded-xl
                font-semibold
                transition
              ${
  product?.stock === 0
    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
    : isInCart
    ? "bg-green-100 text-green-700"
    : "bg-blue-600 hover:bg-blue-700 text-white"
}
              `}
            >
              {
  product?.stock === 0
    ? "Out of Stock"
    : isInCart
    ? " Added"
    : "Add to Cart"
}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;