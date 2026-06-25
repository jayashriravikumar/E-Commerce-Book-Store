import React from "react";
import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-8xl font-bold text-red-600">
        500
      </h1>

      <h2 className="text-3xl font-semibold mt-4">
        Internal Server Error
      </h2>

      <p className="text-gray-500 mt-2">
        Something went wrong on our server.
      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ServerError;