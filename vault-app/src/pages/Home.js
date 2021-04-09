import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl text-teal-700 text-center font-bold m-4 w-6/12 break-words">
        Find the best place to begin your business best prices and digital
        solutions
      </h2>
      <div className="border-2 w-9/12 border-teal-700 flex items-center justify-center">
        <input
          className="p-2 w-full placeholder-gray-600"
          type="text"
          placeholder="Search"
        />
        <button className="p-2 bg-teal-700 hover:bg-teal-900">
          <i class="fas fa-search text-white"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
