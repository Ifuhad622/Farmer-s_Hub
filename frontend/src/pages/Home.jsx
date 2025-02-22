import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Farmer’s Hub
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Your one-stop solution for weather forecasts, crop tips, market prices,
        community support, and more.
      </p>
      <Link
        to="/login"
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded transition duration-300"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Home;
