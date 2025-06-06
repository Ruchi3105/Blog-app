import { Link } from "react-router-dom";
import React from "react";
import { Brain } from "lucide-react"; // Symbolic of NeuraBlog

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/blogs/?cat=${category.name}`}
      className="group w-64 h-48 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition duration-300 p-5 flex flex-col justify-between hover:border-indigo-500"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <Brain className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold capitalize text-gray-800 group-hover:text-indigo-600 transition-colors">
          {category.name}
        </h2>
      </div>

      <p className="text-sm text-gray-500 mt-2 group-hover:text-gray-700">
        Discover insightful posts on <span className="font-medium">{category.name}</span>.
      </p>
    </Link>
  );
};

export default CategoryCard;
