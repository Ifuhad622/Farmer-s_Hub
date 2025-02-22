import React from "react";

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500"></div>
      <p className="mt-4 text-xl text-blue-500">Loading...</p>
    </div>
  );
};

export default PageLoader;
