import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products");

      const reviewedProducts = data.products.filter(
        (product) => (product.numOfReviews || 0) > 0
      );

      setProducts(reviewedProducts);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading Review Management...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Review Management
        </h1>

        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            No products have reviews yet.
          </div>
        ) : (
          <div className="space-y-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold">
                    {product.name || product.title}
                  </h2>

                  <p className="text-gray-500">
                    {product.author}
                  </p>

                  <div className="mt-2 flex gap-6 text-sm">
                    <span>
                      ⭐ {product.ratings.toFixed(1)}
                    </span>

                    <span>
                      💬 {product.numOfReviews} Reviews
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate(`/product/${product._id}/reviews`)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  View Reviews
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;