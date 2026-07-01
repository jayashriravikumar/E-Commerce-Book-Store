import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductReviews = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
  try {
    console.log("Product ID:", id);

    const res = await axios.get(`/api/v1/product/${id}`);

    console.log("API Response:", res.data);

    setProduct(res.data.product);
    setLoading(false);
  } catch (err) {
    console.log("ERROR:", err);
    console.log("Response:", err.response);

    setLoading(false);
  }
};

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <h2>Loading reviews...</h2>;

  if (!product) return <h2>Product not found</h2>;

  const deleteReview = async (reviewId) => {
  console.log("Deleting review:", reviewId);

  try {
    const res = await axios.delete("/api/v1/admin/reviews", {
      data: {
        productId: product._id,
        reviewId,
      },
      withCredentials: true,
    });

    console.log("Delete response:", res.data);

    fetchProduct();
  } catch (error) {
    console.log("Delete error:", error);
    console.log("Delete response:", error.response);
    alert("Failed to delete review");
  }
};

return (
  <div className="min-h-screen bg-gray-100 py-10">
    <div className="max-w-4xl mx-auto">

      {/* Product Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {product.title || product.name}
        </h1>

        <p className="text-gray-500 mt-1">
          by {product.author}
        </p>

        <div className="flex items-center gap-6 mt-5">
          <div>
            <p className="text-yellow-500 text-xl">
              ⭐ {product.ratings.toFixed(1)} / 5
            </p>
          </div>

          <div>
            <p className="text-gray-600">
              {product.numOfReviews} Review
              {product.numOfReviews !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-5">
        {product.reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            No reviews available.
          </div>
        ) : (
          product.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                {review.name}
              </h2>

              <p className="text-xs text-gray-500">
                ID: {review._id}
              </p>

                <span className="text-yellow-500 font-semibold">
                  ⭐ {review.rating}/5
                </span>
              </div>

              <p className="text-gray-600 mt-4">
                {review.comment}
              </p>

                    <button
          onClick={() => {
            console.log("Delete button clicked");
            deleteReview(review._id);
          }}
          className="
            mt-5
            bg-red-600
            hover:bg-red-700
            text-white
            px-4
            py-2
            rounded-lg
            transition
          "
        >
          🗑 Delete Review
        </button>
            </div>
          ))
        )}
      </div>

    </div>
  </div>
);
};

export default ProductReviews;