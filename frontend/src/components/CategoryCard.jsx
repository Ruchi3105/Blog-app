import { Link } from "react-router-dom";
import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white border text-black rounded-xl shadow-lg p-6 flex flex-col items-center justify-center w-60 h-40 transition-transform transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-3 capitalize">{category.name}</h2>
      <Link
        className="bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-1 px-4 rounded-lg shadow-md transition-all cursor-pointer w-20"
        to={`/blogs/?cat=${category.name}`}
      >
        Explore
      </Link>
    </div>
  );
};

export default CategoryCard;
