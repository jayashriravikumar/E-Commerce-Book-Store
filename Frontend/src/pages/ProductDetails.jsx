
import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
 import Rating from "../components/Rating";
import {Minus, PackageCheck, Plus, ShoppingCart, Heart} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
  import { useParams } from "react-router-dom";
import { getProductDetails,removeErrors }from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import axios from "axios";



const ProductDetails = () =>{
  const { loading,error,product} =useSelector((state) => state.product);
  
  const {id} =useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});

  const nextImage = () => {
  if (!product?.image?.length) return;

  setSelectedImage((prev) =>
    prev === product.image.length - 1 ? 0 : prev + 1
  );
};

const previousImage = () => {
  if (!product?.image?.length) return;

  setSelectedImage((prev) =>
    prev === 0 ? product.image.length - 1 : prev - 1
  );
};

const handleMouseMove = (e) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;

  setZoomStyle({
    transformOrigin: `${x}% ${y}%`,
    transform: "scale(2)",
  });
};

const handleMouseLeave = () => {
  setZoomStyle({
    transform: "scale(1)",
    transformOrigin: "center",
  });
};

  const dispatch =useDispatch();
  const increaseQuantity = () => {
  if (quantity < product?.stock) {
    setQuantity(quantity + 1);
  }
};
const [reviewRating, setReviewRating] = useState(5);
const [comment, setComment] = useState("");
const decreaseQuantity = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};
  const handleAddToCart = () => {
  dispatch(addToCart({...product, quantity}));
};
const addWishlist = async () => {
  try {
    const { data } = await axios.post(
      `/api/v1/wishlist/add/${product._id}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (data.success) {
      toast.success("Added to Wishlist");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Failed to add wishlist"
    );
  }
};

  useEffect(() =>{
    if (id) {
      dispatch(getProductDetails(id));
    }
  },[dispatch,id]);

  useEffect(() =>{
    if (error) {
      toast.error(error.message);
      dispatch(removeErrors());
    }
  },[dispatch,error]);
 

  const originalPrice = Math.round(product?.price * 1.25);
  const discountPercentage = Math.round(
  ((originalPrice - product?.price) / originalPrice) * 100
  ); 
  const submitReview = async () => {
  try {
    const { data } = await axios.put(
      "/api/v1/review",
      {
        rating: reviewRating,
        comment,
        productId: product._id,
      },
      {
        withCredentials: true,
      }
    );

    if (data.success) {
      toast.success("Review submitted successfully");
      dispatch(getProductDetails(id));
      setComment("");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to submit review"
    );
  }
};
const rating = product?.ratings || 0;  return (
    <div className="min-h-screen bg-gray-50"> 
    <PageTitle title={`${product?.name} | Details`}/>
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Product Section */}

      <div className="grid grid-cols-1 md:grid-cols-2
      gap-12 bg-white p-8">
        
       {/* Image Gallery */}

<div className="flex gap-5">

  {/* Left Thumbnails */}

  <div className="flex flex-col gap-3">

    {product?.image?.map((img, index) => (

     <img
  key={index}
  src={img.url}
  alt={`thumbnail-${index}`}
  onMouseEnter={() => setSelectedImage(index)}
  onClick={() => setSelectedImage(index)}
        className={`
          w-16
          h-20
          object-cover
          rounded-lg
          cursor-pointer
          border-2
          transition-all

          ${
            selectedImage === index
              ? "border-blue-600 shadow-lg scale-105"
              : "border-gray-300 hover:border-blue-400"
          }
        `}
      />

    ))}

  </div>

  {/* Main Image */}

  <div className="flex-1">

    <div className="aspect-square border rounded-xl overflow-hidden bg-white">

      <img
        src={
          product?.image?.[selectedImage]?.url ||
          "https://via.placeholder.com/400x600?text=No+Image"
        }
        alt={product?.name}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={zoomStyle}
        className="w-full h-full object-contain transition-all duration-200 hover:scale-105 duration-300 ease-in-out"
      />

    </div>

  </div>

</div>
        {/* Product Info */}
        <div className='flex flex-col'>
         <h3 className="text-3xl font-bold text-gray-900 mb-2">
  {product?.title || product?.name}
</h3>
          <p className='text-lg text-gray-600 mb-3'>
          by {product?.author}
          </p>
          
          <div className='flex items-center gap-4
          mb-4'>
            <Rating value={rating} disabled={true}/>
            <span className='text-sm text-gray-500 font-medium'>
              {product?.numOfReviews || 0} Reviews
            </span>
          </div>
          <div className='mb-6 flex items-baseline gap-3'>
             <span className='text-4xl font-semibold text-amber-600'>
  ₹{product?.price}
</span>
            <span className='text-lg text-gray-400
            line-through'>₹{originalPrice}</span>

            <span className='text-sm font-bold
            text-green-600 bg-green-50 px-2 py-1
            rounded'>{discountPercentage}% OFF</span>
          </div>
            <p className='text-gray-600 leading-relaxed mb-8 text-lg'>
  {product?.description}
          </p>
          <div className='borded-t border-gray-100 pt-8
          mb-8'></div>
          <div className='flex items-center gap-2 mb-6'>
            <PackageCheck className='text-green-600 w-5
            h-5'/>
   <span className='font-semibold text-green-700 text-sm'>
  IN STOCK ({product?.stock} Available)
</span>
          </div>
          <div className='flex flex-wrap items-center
          gap-4'>
            <div className='flex items-center border-2
            border-gray-100 rounded-xl bg-white
            overflow-hidden'>
            <button
  onClick={decreaseQuantity}
  className='p-4 hover:bg-gray-50 hover:text-amber-600 transition-colors'
>
  <Minus size={18}/>
</button>

<span className='px-4 font-semibold'>
  {quantity}
</span>

<button
  onClick={increaseQuantity}
  className='p-4 hover:bg-gray-50 hover:text-amber-600 transition-colors'
>
  <Plus size={18}/>
</button>
            </div>
            <div className="flex gap-3 w-full">

  <button
    onClick={addWishlist}
    className="bg-red-500 hover:bg-red-600
    text-white px-4 rounded-xl"
  >
    <Heart size={22} />
  </button>

  <button
    onClick={handleAddToCart}
    className="flex-1 bg-blue-600
    hover:bg-blue-700 text-white font-bold py-3
    px-8 rounded-xl flex items-center
    justify-center gap-3 transition-all
    shadow-xl shadow-blue-100 active:scale-95"
  >
    <ShoppingCart />
    Add to Cart
  </button>

</div>
          </div>
        </div>
        </div>
        </main>
        <div className="max-w-7xl mx-auto px-4 pb-10">

  <div className="bg-white p-6 rounded-lg shadow-sm">

    <h2 className="text-2xl font-bold mb-4">
      Customer Reviews
    </h2>
<div className="bg-gradient-to-r from-amber-50 to-yellow-50 border rounded-xl p-5 mb-6">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-lg font-bold">
        Overall Rating
      </h3>

      <div className="flex items-center gap-2 mt-2">
        <Rating
          value={product?.ratings || 0}
          disabled={true}
        />

        <span className="font-bold text-xl">
          {product?.ratings?.toFixed(1) || 0}
        </span>
      </div>

      <p className="text-gray-500 text-sm mt-1">
        Based on {product?.numOfReviews || 0} reviews
      </p>
    </div>

    <div className="text-right">
      <p className="text-green-600 font-bold text-lg">
        ★ Trusted Reviews
      </p>
    </div>
  </div>
</div>

   <div className="mb-6">

  <label className="block mb-3 font-semibold text-gray-700">
    Your Rating
  </label>

  <Rating
    value={reviewRating}
    onRatingChange={(value) => setReviewRating(value)}
  />

</div>

    <textarea
      rows="4"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write your review..."
      className="w-full border border-gray-300 p-4 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <button
      onClick={submitReview}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition shadow-md"
    >
      Submit Review
    </button>

    <hr className="my-6" />

    {product?.reviews?.length > 0 ? (
  <div className="space-y-4">
    {product.reviews.map((review) => (
      <div
        key={review._id}
        className="bg-gray-50 border rounded-xl p-5 hover:shadow-md transition"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-lg">
            {review.name}
          </h4>

          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
            Verified Purchase
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Rating
            value={review.rating}
            disabled={true}
            showValue={false}
          />

          <span className="text-amber-600 font-semibold">
            {review.rating}/5
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed">
          {review.comment}
        </p>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-10">
    <p className="text-gray-500">
      No reviews yet. Be the first to review this book.
    </p>
  </div>
)}

  </div>

</div>
        <Footer />
        </div>
   );

  };

  export default ProductDetails;
