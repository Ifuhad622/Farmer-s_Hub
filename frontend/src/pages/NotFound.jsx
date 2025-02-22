import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Page not found</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
