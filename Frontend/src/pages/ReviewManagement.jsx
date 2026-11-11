import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
  const filteredProducts = products.filter((product) =>
  (product.name || product.title || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading Review Management...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 md:py-10 px-3 md:px-0">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Review Management
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">Products Reviewed</p>
    <h2 className="text-3xl font-bold mt-2">
      {products.length}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">Total Reviews</p>
    <h2 className="text-3xl font-bold mt-2">
      {products.reduce(
        (sum, p) => sum + (p.numOfReviews || 0),
        0
      )}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">Average Rating</p>
    <h2 className="text-3xl font-bold mt-2">
      {(
        products.reduce(
          (sum, p) => sum + (p.ratings || 0),
          0
        ) / (products.length || 1)
      ).toFixed(1)}
    </h2>
  </div>

  <div className="bg-white rounded-xl shadow p-5">
    <p className="text-gray-500 text-sm">5★ Books</p>
    <h2 className="text-3xl font-bold mt-2">
      {
        products.filter(
          p => (p.ratings || 0) >= 4.5
        ).length
      }
    </h2>
  </div>

</div>
<input
  type="text"
  placeholder="Search books..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="
w-full
mb-5
border
rounded-xl
p-3
text-sm
md:text-base
"
/>

        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            No products have reviews yet.
          </div>
        ) : (
          <div className="space-y-5">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="
bg-white
rounded-xl
shadow-md
p-4
md:p-6
flex
flex-col
md:flex-row
justify-between
md:items-center
gap-4
hover:shadow-lg
transition
"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">

  <img
    src={product.image?.[0]?.url}
    alt={product.name}
    className="
w-24
h-32
md:w-20
md:h-28
object-contain
border
rounded-lg
bg-white
p-1
"
  />

  
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-center sm:text-left">
                    {product.name || product.title}
                  </h2>

                  <p className="text-gray-500 text-center sm:text-left">
                    {product.author}
                  </p>

                  <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2 text-sm">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
  ⭐ {(product.ratings || 0).toFixed(1)}
</span>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
  💬 {product.numOfReviews} Reviews
</span>
                  </div>
                </div>
                </div>

                <button
                  onClick={() =>
                    navigate(`/product/${product._id}/reviews`)
                  }
                  className="
w-full
md:w-auto
bg-blue-600
hover:bg-blue-700
text-white
px-6
py-3
rounded-lg
font-semibold
transition
"
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