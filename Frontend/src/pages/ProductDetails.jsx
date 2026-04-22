
import React, { useEffect } from 'react';
import PageTitle from "../components/PageTitle";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
 import Rating from "../components/Rating";
import {Minus, PackageCheck,Plus,ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
  import { useParams } from "react-router-dom";
import { getProductDetails,removeErrors }from "../features/products/productSlice";
import toast from "react-hot-toast";


const ProductDetails = () =>{
  const { loading,error,product} =useSelector((state) => state.product);
  const {id} =useParams();

  const dispatch =useDispatch();

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
 

   return (
    <div className="min-h-screen bg-gray-50"> 
    <PageTitle title= {`${product?.name} | Details `}/>
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Product Section */}

      <div className="grid grid-cols-1 md:grid-cols-2
      gap-12 bg-white p-8">
        {/* Image Gallery */}
        <div>
          <div className='aspect-square overflow-hidden rounded-xl'>
            <img src={product?.image[0].url} alt={product?.name}
            className='w-full h-full object-cover
            transition-transform hover:scale-105
            duration-700'
            title={product?.name} />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex flex-col'>
          <h3 className='text-3xl font-semibold
          text-gray-900 mb-2'>{product?.name}</h3>
          
          <div className='flex items-center gap-4
          mb-4'>
            <Rating value={3} disabled={true}/>
            <span className='text-sm text-gray-500
            font-medium'>5 verified Reviews</span>
          </div>
          <div className='mb-6 flex items-baseline gap-3'>
            <span className='text-4xl font-semibold
            text-amber-600'>₹1500</span>
            <span className='text-lg text-gray-400
            line-through'>₹1900</span>
            <span className='text-sm font-bold
            text-green-600 bg-green-50 px-2 py-1
            rounded'>15% OFF</span>
          </div>
          <p className='text-gray-600 leading-relaxed
          mb-8 text-lg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Autem omnis ullam quisquam nesciunt magnam alias at beatae
              delectus perferendis explicabo! Ex ad ea tenetur distinctio 
              culpa libero deserunt ipsum dolorum.
          </p>
          <div className='borded-t border-gray-100 pt-8
          mb-8'></div>
          <div className='flex items-center gap-2 mb-6'>
            <PackageCheck className='text-green-600 w-5
            h-5'/>
            <span className='font-semibold
            text-green-700 text-sm'>IN STOCK (5 Available)</span>
          </div>
          <div className='flex flex-wrap items-center
          gap-4'>
            <div className='flex items-center border-2
            border-gray-100 rounded-xl bg-white
            overflow-hidden'>
             <button className='p-4 hover:bg-gray-50
             hover:text-amber-600 transition-colors'>
              <Minus size={18}/>
             </button>
             <span>1</span>
             <button className='p-4 hover:bg-gray-50
             hover:text-amber-600 transition-colors'>
              <Plus />
             </button>
            </div>
            <button className="flex-1 bg-blue-600
            hover:bg-blue-700 text-white font-bold py-3
            px-8 rounded-xl flex items-center
            justify-center gap-3 transition-all
            shadow-xl shadow-blue-100 active:scale-95">
              <ShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
        </div>
        </main>
        <Footer />
        </div>
   );

  };

  export default ProductDetails;
       