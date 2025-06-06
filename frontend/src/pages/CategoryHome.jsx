import React, { useContext, useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import axios from "axios";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryHome = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories`);
      setCategories(res.data);
    };
    fetchCategory();
  }, []);
  return (
    <div className="min-h-screen bg-ingido-100 overflow-x-hidden w-screen">
      <div className="flex flex-col justify-center items-center pt-20 px-4 sm:px-8 md:px-16 max-w-screen-xl mx-auto mb-8">

        {/* Hero/Header Section */}
        <section className="text-center mb-8 mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Explore <span className="text-indigo-600">Categories</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Dive into diverse topics curated by creators. Click on any category to discover blogs written on that theme.
          </p>
        </section>


        {categories.length > 0 ? (
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((c, i) => (
                <CategoryCard key={i} category={c} />
              ))}
            </div>
          </div>
        ) : (
          <p className="mx-10">No categories exist for now. Add new categories.</p>
        )}

        <Link
          className="fixed bottom-10 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-indigo-700 transition"
          to="/add-category"
        >
          <Plus size={30} />
        </Link>
      </div>
    </div>
  );
};

export default CategoryHome;
