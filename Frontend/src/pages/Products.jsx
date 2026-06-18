
import React from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProduct,removeErrors } from "../features/products/productSlice";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useEffect } from "react";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import {useNavigate,useSearchParams } from "react-router-dom";
import { useState } from "react";

const Products = () => {
    const { products, productCount, loading, error , resultPerPage } =useSelector((state) => state.product);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [price, setPrice] = useState(1000);
    const [searchText, setSearchText] = useState("");
const [sortOption, setSortOption] = useState("Newest");
    const keyword = searchParams.get("keyword") || "";
    const pageFromURL = parseInt(searchParams.get("page"), 10) || 1; 
    const category = searchParams.get("category") || "";
    const [currentPage, setCurrentPage] = useState(pageFromURL);
    const totalPages = Math.ceil(productCount / (resultPerPage || 8));

    const handlePageChange =(pageNumber) => {
      if (pageNumber !== currentPage) {
        setCurrentPage(pageNumber);
        const newSearchParams = new URLSearchParams (location.search);
        if (pageNumber === 1) {
          newSearchParams.delete("page");
        } else {
          newSearchParams.set("page", pageNumber);
        }
        navigate(`?${newSearchParams.toString()}`);
      }
    };
   const handleCategory =(cat) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.delete("page");
    if(cat == "All"){
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category",cat)
    }
    console.log(newSearchParams.toString());
    navigate(`?${newSearchParams.toString()}`);
   };

   useEffect(() => {
    dispatch(getProduct({keyword,page: currentPage ,category}));
  }, [dispatch , keyword,currentPage,category ]);

  useEffect(() =>{
    if (error) {
      toast.error(error.message);
      dispatch(removeErrors());
    }
  },[dispatch,error]);
  let filteredProducts = [...products];

// Search Filter
filteredProducts = filteredProducts.filter((product) =>
  (product.name || product.title || "")
    .toLowerCase()
    .includes(searchText.toLowerCase())
);

// Price Filter
filteredProducts = filteredProducts.filter(
  (product) => product.price <= price
);

// Sorting
if (sortOption === "Price Low to High") {
  filteredProducts.sort((a, b) => a.price - b.price);
}

if (sortOption === "Price High to Low") {
  filteredProducts.sort((a, b) => b.price - a.price);
}

if (sortOption === "Highest Rated") {
  filteredProducts.sort(
    (a, b) => (b.ratings || 0) - (a.ratings || 0)
  );
}

    return loading ?(
        <Loader />
  ) : (

    <> 
      <div className="flex flex-col min-h-screen bg-gray-50">
        <PageTitle title={"Products | E-Commerce"} />
        <Navbar /> 
        <main className="grow container mx-auto px-4 py-8">
           <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/4">
  <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">

    <h2 className="text-2xl font-bold mb-6 border-b pb-3">
      Filters
    </h2>

    {/* Categories */}
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-3">
        Categories
      </h3>

      <ul className="space-y-2">
        {[
          "All",
          "Fiction",
          "Non-Fiction",
          "Self Help",
          "Fantasy",
          "Finance",
          "Classic",
          "Technology",
          "Business",
        ].map((cat) => (
          <li key={cat}>
            <button
              onClick={() => handleCategory(cat)}
              className="hover:text-blue-600 transition"
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Price */}
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-3">
        Price Range
      </h3>

      <input
        type="range"
        min="0"
        max="2000"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full"
      />

      <p className="mt-2 text-gray-600">
        ₹0 - ₹{price}
      </p>
    </div>

    {/* Stock */}
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-3">
        Availability
      </h3>

      <label className="flex items-center gap-2">
        <input type="checkbox" />
        In Stock
      </label>
    </div>

    {/* Rating */}
    <div>
      <h3 className="font-semibold text-lg mb-3">
        Customer Rating
      </h3>

      <button className="block w-full text-left p-2 rounded hover:bg-gray-100">
        ⭐⭐⭐⭐ & Above
      </button>

      <button className="block w-full text-left p-2 rounded hover:bg-gray-100">
        ⭐⭐⭐ & Above
      </button>
    </div>

  </div>
</aside>
            <section className="w-full md:w-3/4 bg-white p-4 rounded"> 
<div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-6">

  <span className="text-sm text-gray-600">
    {filteredProducts.length} results
  </span>

  <div className="flex gap-3">

    <input
      type="text"
      placeholder="Search books..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="border p-2 rounded"
    />

    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="border p-2 rounded"
    >
      <option>Newest</option>
      <option>Price Low to High</option>
      <option>Price High to Low</option>
      <option>Highest Rated</option>
    </select>

  </div>

</div>

<div className="flex justify-between items-center mb-6">
  <h3 className="text-xl font-semibold text-gray-800">
    Our Products
  </h3>

  <span className="text-gray-500 text-sm">
    {filteredProducts.length} items found
  </span>
</div>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts && filteredProducts.map((product) =><Product key={product._id} product={product}/>)}</div>
          
            </section>
            </div>
            {/* Pagination Section */}
            <div className="mt-12 flex justify-center">
              <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages}/>
            </div>
            </main>
            <Footer />
        </div>
        </>
    );
};

export default Products;
