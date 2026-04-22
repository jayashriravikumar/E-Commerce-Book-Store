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
               <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-slate-200
                pb-2">Categories</h3>
                <ul className="space-y-2">
                    {["All","Fiction","Non-Fiction","Self Help","Fantasy","Finance","Classic","Technology","Business",].map((cat)=>(
                        <li key={cat}>
                         <button onClick={() => handleCategory(cat)} className="text-gray-600 hover:text-blue-600 transition-colors
                         font-semibold">{cat}</button>
                        </li>
                    ))}
                </ul>
            </div>
            </aside>
            <section className="w-full md:w-3/4 bg-white p-4 rounded"> 
            <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 pb-2">Our Products</h3>
            <span className="text-gray-500 text-sm">{products?.length || 0} items found</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products && products.map((product) =><Product key={product._id} product={product}/>)}</div>
          
            </section>
            </div>
            {/* Pagination Section */}
            <div className="mt-12 flex justify-center">
              <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages}/>
            </div>
            </main>I
            <Footer />
        </div>
        </>
    );
};

export default Products;
