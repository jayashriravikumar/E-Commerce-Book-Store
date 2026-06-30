import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
     <h1 className="text-9xl font-bold text-amber-600">
  404
</h1>

<p className="text-2xl font-semibold mt-4">
  Oops! This chapter doesn't exist.
</p>

<p className="text-gray-500 mt-2">
  The page you're looking for seems to have been misplaced between the shelves.
</p>
      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;