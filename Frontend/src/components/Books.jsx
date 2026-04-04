import React ,{useState}from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Books = ({ book }) => {

  const [rating,setRating] =useState(book.ratings || 0);
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-slate-100">
      
      <Link to={`/book/${book.title}`}className="group block">
        
        <div className="h-56 overflow-hidden">
          <img 
            src={book.image[0].url} 
            alt={book.title} 
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{book.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
        </div>

      </Link>
      <div className="px-4 pb-4 space-y-2">
        <div className="flex items-center gap-2">
         <Rating value={rating} onRatingCharge={(r) => setRating(r)}/>
         <span className="text-xs text-gray-500 font-semibold">({book.num0fReviews}reviews)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-bold text-lg">₹{book.price}</span>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm
          hover:bg-blue-700 transition">Add to Cart</button>
        </div>
      </div>

    </div>
  );
};

export default Books;

