import { Link } from "react-router-dom";
import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white text-black rounded-sm shadow-lg p-6 flex flex-col items-center justify-center w-60 h-40 transition-transform transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-3 capitalize">{category.name}</h2>
      <Link
        className="bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-1 px-2.5 rounded-sm shadow-md transition-all cursor-pointer"
        to={`/blogs/?cat=${category.name}`}
      >
        Find Articles
      </Link>
    </div>
  );
};

export default CategoryCard;
